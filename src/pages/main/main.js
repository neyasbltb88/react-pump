import React, { Component } from 'react';
import { randomName } from '../../services'
import './main.css';

import Btn from '../../components/btn';

export default class Main extends Component {

    state = {
        pumping: null,
        opened: false,
        ready: false
    };

    componentDidMount() {
        window.main_state = this.state;
        console.log('main_state', this.state);
    }

    componentDidUpdate() {
        window.main_state = this.state;
        console.log('main_state', this.state);
    }

    onPumpingClose = () => {
        console.log('Закрыт насос');

        this.setState({
            pumping: null,
            opened: false,
            ready: false
        });
    }

    onClick = () => {
        let pumping = window.open('/pumping', randomName(), 'resizable');
        // pumping.onbeforeunload = () => this.onPumpingClose();

        pumping.addEventListener('beforeunload', this.onPumpingClose);

        this.setState({
            pumping,
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