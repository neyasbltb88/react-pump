import React, { Component } from 'react';
import { randomName, workerHandler, positionWatcher } from '../../services'

import Btn from '../../components/btn'

import './pumping.css';

// pumping_state.Pumpeds.forEach((pump, key) => console.log(key, pump))

export default class Pumping extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'position:update': (data) => this.onChangePumped(data),
        'pumped:disconnected': (data) => this.onChangePumped(data, true),
    });

    posWatcher = null;

    state = {
        lastTitle: '',
        Pumping: {},
        Pumpeds: new Map(),
        Plugged: new Set(),
    }

    collisionCalc(Pumpeds, Plugged) {
        let { Pumping } = this.state;
        // console.log(Pumping, Pumpeds);

        Pumpeds.forEach((pumped, name) => {
            let vertical = false;
            let horizontal = false;

            if(Pumping.top <= pumped.bottom && Pumping.bottom >= pumped.top) { vertical = true; }
            if(Pumping.right >= pumped.left && Pumping.left <= pumped.right) { horizontal = true; }

            if(vertical && horizontal) {
                console.log('---Collision--- ', name);
                
                Plugged.add(name);
            } else {
                Plugged.delete(name);
            }
        });

        return Plugged;
    }

    onChangePumped(data, del = false) {
        let { target, position } = data;

        if(target !== 'Pumping') {
            let Pumpeds = new Map([...this.state.Pumpeds]);
            let Plugged = new Set([...this.state.Plugged]);
            if(del) {
                Pumpeds.delete(data);
                Plugged.delete(data);
            } else {
                Pumpeds.set(target, position);
            }

            Plugged = this.collisionCalc(Pumpeds, Plugged);

            this.setState({
                Pumpeds,
                Plugged
            });
        }
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
        let Plugged = new Set([...this.state.Plugged]);
        // Plugged = this.collisionCalc(Pumpeds, Plugged);
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

        return (
            <div className="Pumping">
                <div>Pumping</div>
                <hr/>

                <div className="row">
                    <div className="col">{posiSpans}</div>
                    <div className="col">
                        Plugged
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