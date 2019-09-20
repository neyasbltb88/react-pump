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
        'pumped:plugged': (data) => {
            let { target, side } = data;
            if(window.name === target) this.onChangePlug(true, side);
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
        side: ''
    }

    onPumpDown(delta) {
        let ratio = 5;
        let step = delta / ratio;
        let move = -step / 2;
        
        window.resizeBy(step, step);
        window.moveBy(move, move);
    }

    onChangePlug(value, side = '') {
        this.setState({
            plagged: value,
            side
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
        const { position, plagged, side } = this.state;
        let posiSpans = Object.keys(position).map(pos => <div key={pos}>{ pos }: { position[pos] }</div>);
        let pluggedMark = plagged ? <span className="text-primary">(Plugged)</span> : null;
        let sidesContent = {
            'left': '<-',
            'right': '->'
        };
        let sideConnect = (side !== '') ? <div className={`connect-${side} text-primary`}>{ sidesContent[side] }</div> : null;

        return (
            <div className="Pumped">
                <div className="header">Pumped: {window.name} { pluggedMark }
                { sideConnect }
                </div>
                <hr/>
                {posiSpans}
            </div>
        )
    }
}