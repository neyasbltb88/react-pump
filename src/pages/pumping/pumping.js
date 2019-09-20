import React, { Component } from 'react';
import { randomName, workerHandler, positionWatcher } from '../../services'

import Btn from '../../components/btn'

import './pumping.css';

export default class Pumping extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'position:update': (data) => {
            let { target, position } = data;

            if(target !== 'Pumping') {
                let Pumpeds = this.state.Pumpeds;
                this.setState({
                    Pumpeds,
                    target: position
                })
            }
        }
    });

    state = {
        lastTitle: '',
        Pumping: {},
        Pumpeds: {}
    }

    openPumped = () => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        setTimeout(() => {
            let name = randomName();
            window.open(`${DEPLOY_FOLDER}/pumped`, name, 'resizable');
        }, 100);
    }

    onPosition(position) {
        this.messageHandler.message('position:update', {target: 'Pumping', position});
        this.setState({
            Pumping: position
        });
    }

    onClose = () => {
        this.closeAllPumpeds();

        this.messageHandler.message('pumping:disconnected');
    }

    closeAllPumpeds = () => {
        this.messageHandler.message('pumped:closeAll');
    }

    componentDidMount() {
        let lastTitle = document.title;
        document.title = 'Насос';

        this.setState({
            lastTitle
        });

        this.openPumped();

        window.addEventListener('beforeunload', this.onClose);
        this.messageHandler.message('pumping:connected');

        new positionWatcher(pos => this.onPosition(pos));
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;
    }
    
    render() {
        const { Pumping } = this.state;
        let posiSpans = Object.keys(Pumping).map(pos => <div key={pos}>{ pos }: { Pumping[pos] }</div>)

        return (
            <div className="Pumping">
                <div>Pumping</div>
                {posiSpans}
                <br />
                <Btn onClick={this.closeAllPumpeds} label="Закрыть шарики"></Btn>
                <br />
                <br />
                <Btn onClick={this.openPumped} label="Открыть шарик"></Btn>
            </div>
        )
    }
}