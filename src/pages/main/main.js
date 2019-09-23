import React, { Component } from 'react';
import { buildWindowParams } from '../../services';

import Btn from '../../components/btn';

import './main.css';

export default class Main extends Component {

    messageHandler = this.props.messageHandler({
        'pumping:connected': () => this.onChangePumpingConnected(true),
        'pumping:disconnected': () => this.onChangePumpingConnected(false),
        'status:pumping': (data) => this.onChangePumpingConnected(data)
    });

    state = {
        opened: false,
    };

    componentDidMount() {
        this.messageHandler.message('checkStatus:pumping');
    }

    onChangePumpingConnected(value) {
        this.setState({ opened: value });
    }

    onClick = () => {
        const { REACT_APP_DEPLOY_FOLDER } = process.env;
        const DEPLOY_FOLDER = REACT_APP_DEPLOY_FOLDER ? '/' + REACT_APP_DEPLOY_FOLDER : '';

        let pumpingWidth = 300;
        let pumpingHeight = 550;
        let pumpingParams = buildWindowParams({
                                width: pumpingWidth,
                                height: pumpingHeight,
                                left: ((window.screen.availWidth || window.screen.width) / 2 ) - (pumpingWidth / 2),
                                top: ((window.screen.availHeight || window.screen.height) / 2 ) - (pumpingHeight / 2),
                            });

        window.open(`${DEPLOY_FOLDER}/pumping`, 'Pumping', pumpingParams);
        this.setState({ opened: true });
    }

    render() {
        const { open } = this.state
        let label = open ? 'Насос запущен' : 'Запустить насос';

        return (
            <div className="Main">
                <Btn onClick={this.onClick} label={label} disabled={open} />
            </div>
        )
    }
}