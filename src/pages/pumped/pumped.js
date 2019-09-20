import React, { Component } from 'react';
import { workerHandler, positionWatcher } from '../../services'

import './pumped.css';

export default class Pumped extends Component{

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumped:close': (name) => {
            if(window.name === name) window.close();
        },
        'pumped:closeAll': () => {
            window.close();
        },
        'pumped:plugged': (name) => {
            if(window.name === name) this.onChangePlug(true);
        },
        'pumped:unplugged': (name) => {
            if(window.name === name) this.onChangePlug(false);
        },
        'pump:down': (delta) => {
            if(this.state.plagged) this.onPumpDown(delta);
        }
    });

    state = {
        lastTitle: '',
        position: {},
        plagged: false,
    }

    onPumpDown(delta) {
        let ratio = 5;
        let step = delta / ratio;
        let move = -step / 2;
        
        window.resizeBy(step, step);
        window.moveBy(move, move);
    }

    onChangePlug(value) {
        this.setState({
            plagged: value
        });
    }

    onPosition(position) {
        this.messageHandler.message('position:update', {target: window.name, position});
        this.setState({
            position
        })
    }

    onClose = () => {
        this.messageHandler.message('pumped:disconnected', window.name);
    }

    componentDidMount() {
        let lastTitle = document.title;
        document.title = 'Шарик';

        window.addEventListener('beforeunload', this.onClose);

        this.messageHandler.message('pumped:connected', window.name);

        this.posWatcher = new positionWatcher(pos => this.onPosition(pos));

        this.setState({
            lastTitle
        });
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;

        this.posWatcher && this.posWatcher.stop();
    }

    render() {
        const { position, plagged } = this.state;
        let posiSpans = Object.keys(position).map(pos => <div key={pos}>{ pos }: { position[pos] }</div>);
        let pluggedMark = plagged ? <span className="text-primary">(Plugged)</span> : null;

        return (
            <div className="Pumped">
                <div>Pumped: {window.name} { pluggedMark }</div>
                <hr/>
                {posiSpans}
            </div>
        )
    }
}