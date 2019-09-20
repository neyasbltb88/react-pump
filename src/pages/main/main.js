import React, { Component } from 'react';
import { randomName, workerHandler } from '../../services'
import './main.css';

import Btn from '../../components/btn';

export default class Main extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumping:connected': () => {
            this.onPumpingOpen()
        },
        'pumping:disconnected': () => {
            this.onPumpingClose()
        }
    });

    state = {
        opened: false,
        ready: false,
    };

    componentDidMount() {
        window.main_state = this.state;
        window.messageHandler = this.messageHandler;
    }

    componentDidUpdate() {
        window.main_state = this.state;
    }

    onPumpingOpen = () => {
        // console.log('Насос открыт');
        this.setState({
            opened: true
        });
    }

    onPumpingClose = () => {
        // console.log('Насос закрыт');
        this.setState({
            opened: false,
            ready: false
        });
    }

    onClick = () => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';
        window.open(`${DEPLOY_FOLDER}/pumping`, randomName(), 'resizable');

        this.setState({
            opened: true
        });
    }


    render() {
        const { opened } = this.state;
        return (
            <div className="Main">
                <Btn onClick={this.onClick} label="Запустить насос" disabled={opened}/>
            </div>
        )
    }
}