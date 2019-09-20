import React, { Component } from 'react';
import { workerHandler, positionWatcher } from '../../services'

import './pumped.css';

export default class Pumped extends Component{

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumped:close': (data) => {
            if(window.name === data) window.close();
        },
        'pumped:closeAll': () => {
            window.close();
        },
        'pumped:plugged': (data) => {
            if(window.name === data) this.onChangePlug(true);
        },
        'pumped:unplugged': (data) => {
            if(window.name === data) this.onChangePlug(false);
        }
    });

    state = {
        lastTitle: '',
        position: {},
        plagged: false,
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