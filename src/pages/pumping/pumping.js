import React, { Component } from 'react';
import { rand, randomName, workerHandler, positionWatcher } from '../../services'

import Btn from '../../components/btn';
import PumpHandle from '../../components/pump-handle';

import './pumping.css';

export default class Pumping extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'position:update': (data) => this.onPositionUpdate(data),
        'pumped:disconnected': (data) => this.onDisconnectedPumped(data),
        'pumped:connected': () => {
            window.focus();
            this.messageHandler.message('checkStatus:pumpeds');
        },
        'status:pumpeds': (data) => this.autoOpenPumpeds(data),
    });

    state = {
        lastTitle: '',
        pumpedSize: 300,
        autoOpen: true,
        lastPumpHeight: null,
        connectedSide: {
            left: false,
            right: false
        },
        pumpRatio: 10,
        Pumping: {}, // Положение насоса
        Pumpeds: new Map(), // Список шариков с их положениями
        Plugged: new Map(), // Коллекция подключенных шариков
    }

    // Подключает шарик к насосу
    onPlug(name, side) {
        side = ( side === 'left' ) ? 'right' : 'left';

        this.setState(state => {
            let Plugged = new Map([...state.Plugged]);

            // Если шарик еще не был подключен, подключаем и ведомляем
            if(!Plugged.has(name) || Plugged.get(name) !== side) {
                Plugged.set(name, side);
                this.messageHandler.message('pumped:plugged', {
                    target: name,
                    side
                });
            } 
            
            return { Plugged };
        });
    }

    // Отключает шарик от насоса
    onUnplug(name) {
        this.setState(state => {
            let Plugged = new Map([...state.Plugged]);

            // Если delete вернет true, значит шарик был подключен, 
            // а теперь отключился, значит уведомляем
            if(Plugged.delete(name)) {
                this.messageHandler.message('pumped:unplugged', name);
            } 
            
            return { Plugged };
        });
    }

    // Рассчитывает столкновения(подключения) насоса и шариков
    collisionCalc(target, position) {
        let Pumping = null;
        let Pumpeds = new Map([...this.state.Pumpeds]);
        let sides = {
            left: false,
            right: false
        }

        // Если изменилось положение насоса
        if(target === 'Pumping') {
            // Запомним новое положение насоса
            Pumping = position;

        // Если изменилось положение шарика
        } else {
            // Получим положение насоса
            Pumping = {...this.state.Pumping};
            // Обновим изменившееся положение шарика
            Pumpeds.set(target, position);
        }

        // Сверяем положение насоса с шариками
        Pumpeds.forEach((pumped, name) => {
            let vertical = false;
            let horizontal = false;

            if(Pumping.top <= pumped.bottom && Pumping.bottom >= pumped.top) { vertical = true; }
            if(Pumping.left <= pumped.right && Pumping.right >= pumped.left) { horizontal = true; }

            if(vertical && horizontal) {
                let pumpingCenter = ((Pumping.right - Pumping.left) / 2) + Pumping.left;
                let pumpedCenter = ((pumped.right - pumped.left) / 2) + pumped.left;

                let side = ( (pumpingCenter - pumpedCenter) > 0 ) ? 'left' : 'right';
                sides[side] = true;
                this.onPlug(name, side);
            } else {
                this.onUnplug(name);
            }
        });

        // Сохраним изменения положений
        this.setState({
            connectedSide: sides,
            Pumping,
            Pumpeds
        });
    }

    // Обрабатывает дисконнект шарика
    onDisconnectedPumped(data) {
        let Pumpeds = new Map([...this.state.Pumpeds]);
        let { Pumping } = this.state;

        Pumpeds.delete(data);

        this.setState({
            Pumpeds
        });

        this.onUnplug(data);
        this.collisionCalc('Pumping', Pumping);
    }

    // Обрабатывает изменение размеров/позиций насоса и шариков
    onPositionUpdate(data) {
        let { target, position } = data;
        this.collisionCalc(target, position);
    }

    // Обрабатывает закрытие окна насоса
    onClose = () => {
        this.closeAllPumpeds();

        this.messageHandler.message('pumping:disconnected');
    }

    // Отправляет команду закрытия всех шариков
    closeAllPumpeds = () => {
        this.messageHandler.message('pumped:closeAll');
    }

    // Открывает новый шарик
    openPumped = (params) => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        let { pumpedSize } = this.state;
        let screenWidth = window.screen.availWidth || window.screen.width;
        let screenHeight = window.screen.availHeight || window.screen.height;

        let w = screenWidth - pumpedSize;
        let h = screenHeight - pumpedSize;

        let winParams = params ? params : `resizable,width=${pumpedSize},height=${pumpedSize},left=${rand(0, w)},top=${rand(0, h)}`;

        setTimeout(() => {
            let name = randomName();
            window.open(`${DEPLOY_FOLDER}/pumped`, name, winParams);
        }, 0);
    }

    // Автоматически открывает 2 шарика слева и справа от насоса
    autoOpenPumpeds(openedCnt) {
        if(!this.state.autoOpen) return;

        let { top, right, bottom, left } = this.state.Pumping;
        let { pumpedSize } = this.state;

        let pumpedParams = [
            `resizable,width=${pumpedSize},height=${pumpedSize},left=${left - pumpedSize + 15},top=${top + (bottom / 2) - (pumpedSize / 2)}`,
            `resizable,width=${pumpedSize},height=${pumpedSize},left=${right - 15},top=${top + (bottom / 2) - (pumpedSize / 2)}`
        ];

        if(pumpedParams[openedCnt]) {
            this.openPumped(pumpedParams[openedCnt]);
        } else {
            this.setState({
                autoOpen: false
            });
        }
    }

    // Обработчик накачивания
    onPump(position) {
        let { lastPumpHeight, pumpRatio } = this.state;
        let height = position.bottom - position.top;

        // Проверка на null для того, чтобы не сработало само после старта
        if(lastPumpHeight !== null && lastPumpHeight !== height) {
            let msg = (lastPumpHeight < height) ? 'pump:up' : 'pump:down';
            let delta = Math.abs(lastPumpHeight - height);

            // Оповещаем о накачивании, передаем величину накачки и коэффициент
            this.messageHandler.message(msg, {
                delta,
                ratio: pumpRatio
            });
        }
        
        return height;
    }

    // Обрабатывает изменение положения насоса
    onPosition(position) {
        this.messageHandler.message('position:update', {target: 'Pumping', position});

        let lastPumpHeight = this.onPump(position);

        this.setState({
            lastPumpHeight,
            Pumping: position
        });
    }

    // Изменяет высоту окна по команде перетаскивания ручки насоса
    handleResize = (delta) => {
        window.resizeBy(0, delta);
        window.moveBy(0, -delta);
    }

    componentDidMount() {
        window.pumping_state = this.state;

        let lastTitle = document.title;
        document.title = 'Насос';

        this.setState({
            lastTitle
        });

        window.addEventListener('beforeunload', this.onClose);
        this.messageHandler.message('pumping:connected');

        this.posWatcher = new positionWatcher(pos => this.onPosition(pos));

        // Запрос количества открытых шариков
        this.messageHandler.message('checkStatus:pumpeds');
    }

    componentDidUpdate() {
        window.pumping_state = this.state;
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;
        this.posWatcher && this.posWatcher.stop();
    }
    
    render() {
        let { connectedSide } = this.state;
        let connecters = Object.keys(connectedSide).map(side => {
            return connectedSide[side] ? 
                <img key={side} src={`./img/pump-tube-${side}.svg`} alt={`pump-tube-${side}`} className={`pump-tube pump-tube-${side}-svg`} draggable="false"/> : null;
        });

        return (
            <div className="Pumping">
                <div className="btn-section">
                    <Btn onClick={() => this.openPumped()} label="Добавить шарик" dense>
                        <img src="./img/balloon-plus.svg" alt="balloon-plus" className="balloon-plus-svg" draggable="false" height="20"/>
                    </Btn>
                    <Btn onClick={() => this.closeAllPumpeds()} label="Убрать все шарики" color="#e91e63" dense>
                        <img src="./img/balloon-close.svg" alt="balloon-close" className="balloon-close-svg" draggable="false" height="20"/>
                    </Btn>
                </div>

                <div className="pump">
                    <PumpHandle handleResize={this.handleResize}/>
                    <div className="pump-plunger">
                        <img src="./img/pump-plunger.svg" alt="pump-plunger" className="pump-plunger-svg" draggable="false"/>
                    </div>
                    <div className="pump-body">
                        <img src="./img/pump-body.svg" alt="pump-body" className="pump-body-svg" draggable="false"/>
                        {connecters}
                    </div>
                </div>
            </div>
        )
    }
}