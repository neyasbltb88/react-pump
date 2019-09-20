import React, { Component } from 'react';
import { workerHandler, positionWatcher } from '../../services'

import './pumped.css';

export default class Pumped extends Component{

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumped:close': (data) => {
            if(window.name === data) {
                window.close();
            }
        },
        'pumped:closeAll': () => {
            window.close();
        }
    });

    state = {
        lastTitle: '',
        position: {}
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

        new positionWatcher(pos => this.onPosition(pos));

        this.setState({
            lastTitle
        });
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;
    }

    render() {
        const { position } = this.state;
        let posiSpans = Object.keys(position).map(pos => <div key={pos}>{ pos }: { position[pos] }</div>)

        return (
            <div className="Pumped">
                <div>Pumped: {window.name}</div>
                {posiSpans}
            </div>
        )
    }
}