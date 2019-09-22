import React, { Component } from 'react';
import { randomName, workerHandler } from '../../services'
import './main.css';

import Btn from '../../components/btn';

export default class Main extends Component {

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumping:connected': () => {
            this.onChangePumpingConnected(true);
        },
        'pumping:disconnected': () => {
            this.onChangePumpingConnected(false);
        },
        'status:pumping': (data) => {
            this.onChangePumpingConnected(data);
        }
    });

    state = {
        opened: false,
    };

    componentDidMount() {
        window.main_state = this.state;
        window.messageHandler = this.messageHandler;

        this.messageHandler.message('checkStatus:pumping');
    }

    componentDidUpdate() {
        window.main_state = this.state;
    }

    onChangePumpingConnected(value) {
        this.setState({
            opened: value
        });
    }

    onClick = () => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        let pumpingWidth = 300;
        let pumpingHeight = 550;
        let screenWidth = window.screen.availWidth || window.screen.width;
        let screenHeight = window.screen.availHeight || window.screen.height;

        let pumpingLeft = (screenWidth / 2 ) - (pumpingWidth / 2);
        let pumpingTop = (screenHeight / 2 ) - (pumpingHeight / 2);

        let pumpingParams = `resizable,width=${pumpingWidth},height=${pumpingHeight},left=${pumpingLeft},top=${pumpingTop},location=no,status=no,scrollbars=no,toolbar=no,menubar=no`;

        window.open(`${DEPLOY_FOLDER}/pumping`, randomName(), pumpingParams);

        this.setState({
            opened: true
        });
    }


    render() {
        const { opened } = this.state;
        let label = opened ? 'Насос запущен' : 'Запустить насос';

        return (
            <div className="Main">
                <Btn onClick={this.onClick} label={ label } disabled={ opened } />
            </div>
        )
    }
}