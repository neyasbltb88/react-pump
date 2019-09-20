import React, { Component } from 'react';
import { randomName, workerHandler, positionWatcher } from '../../services'

import Btn from '../../components/btn'

import './pumping.css';

export default class Pumping extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'position:update': (data) => this.onPositionUpdate(data),
        'pumped:disconnected': (data) => this.onDisconnectedPumped(data),
    });

    posWatcher = null;

    state = {
        lastTitle: '',
        Pumping: {}, // Положение насоса
        Pumpeds: new Map(), // Список шариков с их положениями
        Plugged: new Set(), // Коллекция подключенных шариков
    }

    // Подключает шарик к насосу
    onPlug(name) {
        this.setState(state => {
            let Plugged = new Set([...state.Plugged]);

            // Если шарик еще не был подключен, подключаем и ведомляем
            if(!Plugged.has(name)) {
                Plugged.add(name);
                this.messageHandler.message('pumped:plugged', name);
            } 
            
            return { Plugged };
        });
    }

    // Отключает шарик от насоса
    onUnplug(name) {
        this.setState(state => {
            let Plugged = new Set([...state.Plugged]);

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
                this.onPlug(name);
            } else {
                this.onUnplug(name);
            }
        });

        // Сохраним изменения положений
        this.setState({
            Pumping,
            Pumpeds
        });
    }

    // Обрабатывает дисконнект шарика
    onDisconnectedPumped(data) {
        let Pumpeds = new Map([...this.state.Pumpeds]);
        Pumpeds.delete(data);
        this.onUnplug(data);

        this.setState({
            Pumpeds
        });
    }

    // Обрабатывает изменение размеров/позиций насоса и шариков
    onPositionUpdate(data) {
        let { target, position } = data;
        this.collisionCalc(target, position);
    }

    // Открывает новый шарик
    openPumped = () => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        setTimeout(() => {
            let name = randomName();
            window.open(`${DEPLOY_FOLDER}/pumped`, name, 'resizable');
        }, 100);
    }

    // Обрабатывает изменение положения насоса
    onPosition(position) {
        this.messageHandler.message('position:update', {target: 'Pumping', position});

        this.setState({
            Pumping: position
        });
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

    componentDidMount() {
        window.pumping_state = this.state;

        let lastTitle = document.title;
        document.title = 'Насос';

        this.setState({
            lastTitle
        });

        // this.openPumped();

        window.addEventListener('beforeunload', this.onClose);
        this.messageHandler.message('pumping:connected');

        this.posWatcher = new positionWatcher(pos => this.onPosition(pos));
    }

    componentDidUpdate() {
        window.pumping_state = this.state;
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;

        this.posWatcher && this.posWatcher.stop();
    }
    
    render() {
        const { Pumping, Plugged } = this.state;
        let posiSpans = Object.keys(Pumping).map(pos => <div key={pos}>{ pos }: { Pumping[pos] }</div>);
        let plugged = [...Plugged].map(plug => <div key={plug}>{ plug }</div>);
        let pluggedCnt = Plugged.size ? <span className="text-primary">({ Plugged.size })</span> : null;

        return (
            <div className="Pumping">
                <div>Pumping</div>
                <hr/>

                <div className="row">
                    <div className="col">{posiSpans}</div>
                    <div className="col">
                        Plugged { pluggedCnt }
                        <hr/>
                        { plugged }
                    </div>
                </div>

                <br />
                <Btn onClick={this.closeAllPumpeds} label="Закрыть шарики"></Btn>
                <br />
                <br />
                <Btn onClick={this.openPumped} label="Открыть шарик"></Btn>
            </div>
        )
    }
}