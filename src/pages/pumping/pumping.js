import React, { Component } from 'react';
import { rand, randomName, buildWindowParams } from '../../services';

import Btn from '../../components/btn';
import PumpHandle from '../../components/pump-handle';

import './pumping.css';

export default class Pumping extends Component {

    messageHandler = this.props.messageHandler({
        'position:update': (data) => (data.target === 'Pumping') && this.onPump(data.position),
        'pumped:connected': () => this.messageHandler.message('checkStatus:pumpeds'),
        'status:pumpeds': (data) => this.autoOpenPumpeds(data),
    });

    state = {
        lastTitle: '',
        pumpedSize: 300,
        autoOpen: true,
        pumpRatio: 10, // Делитель размеров надувания шариков
        Pumping: null, // Положение насоса
    }

    // Обрабатывает закрытие окна насоса
    onClose = () => {
        this.closeAllPumpeds();
        this.messageHandler.message('pumping:disconnected');
    }

    // Отправляет команду закрытия всех шариков
    closeAllPumpeds = () => this.messageHandler.message('pumped:closeAll');

    // Открывает новый шарик
    openPumped = (params = {}) => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        let { pumpedSize } = this.state;
        let winParams = buildWindowParams({
                            width: pumpedSize,
                            height: pumpedSize,
                            left: rand(0, (window.screen.availWidth || window.screen.width) - pumpedSize),
                            top: rand(0, (window.screen.availHeight || window.screen.height) - pumpedSize),
                            ...params
                        });

        window.open(`${DEPLOY_FOLDER}/pumped`, randomName(), winParams);
    }

    // Автоматически открывает 2 шарика слева и справа от насоса
    autoOpenPumpeds(openedCnt) {
        if(!this.state.autoOpen) return;

        let { top, right, bottom, left } = this.props.position;
        let { pumpedSize } = this.state;

        let pumpedParams = [
            { left: left - pumpedSize + 15, top: top + (bottom / 2) - (pumpedSize / 2) }, 
            { left: right - 15, top: top + (bottom / 2) - (pumpedSize / 2) }
        ];

        let params = pumpedParams[openedCnt];
        if(params) {
            this.openPumped(params);
        } else {
            this.setState({ autoOpen: false });
        }
    }

    // Обработчик накачивания
    onPump(position) {
        let { Pumping, pumpRatio } = this.state;
        let lastPumpHeight = Pumping.bottom - Pumping.top;
        let height = position.bottom - position.top;
        let delta = lastPumpHeight - height;

        if(delta !== 0) {
            let msg = (delta < 0) ? 'pump:up' : 'pump:down';

            // Оповещаем о накачивании, передаем величину накачки и коэффициент
            this.messageHandler.message(msg, {
                delta: Math.abs(delta),
                ratio: pumpRatio
            });
        }
        
        this.setState({ Pumping: {...position} });
    }

    // Изменяет высоту окна по команде перетаскивания ручки насоса
    handleResize = (delta) => {
        window.resizeBy(0, delta);
        window.moveBy(0, -delta);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onClose);
        
        // Оповещаем об открытии насоса
        this.messageHandler.message('pumping:connected');

        // Запрос количества открытых шариков
        this.messageHandler.message('checkStatus:pumpeds');

        let lastTitle = document.title;
        document.title = 'Насос';
        this.setState({ lastTitle });
    }

    componentDidUpdate() {
        if(!this.state.Pumping) {
            this.setState({ Pumping: this.props.position });
        }
    }

    componentWillUnmount() { 
        document.title = this.state.lastTitle; 
    }
    
    render() {
        let { connectedSide, Pumpeds } = this.props;
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
                    <Btn onClick={() => this.closeAllPumpeds()} label="Убрать все шарики" color="#e91e63" disabled={!Pumpeds.size} dense className="closeAllPumpeds">
                        <img src="./img/balloon-close.svg" alt="balloon-close" className="balloon-close-svg" draggable="false" height="20"/>
                        ({Pumpeds.size})
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