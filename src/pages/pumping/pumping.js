import React, { Component, Fragment } from 'react';
import { randomName } from '../../services'

import Btn from '../../components/btn'

import './pumping.css';

export default class Pumping extends Component {

    state = {
        lastTitle: '',
        pumpeds: {}
    }

    openPumped() {
        let name = randomName();
        let pumped = window.open('/pumped', name, 'resizable');

        this.setState(state => {
            let { oldPumpeds } = state;
            let newPumpeds = {
                ...oldPumpeds,
                [name]: pumped
            }

            return {
                pumpeds: newPumpeds
            }
        })
    }

    closeAllPumpeds = () => {
        const { pumpeds } = this.state;
        
        for (const pumped in pumpeds) {
            pumpeds[pumped].close();
        }
    }

    componentDidMount() {
        let lastTitle = document.title;
        document.title = 'Насос';

        this.setState({
            lastTitle
        });

        this.openPumped();

        // window.onbeforeunload = () => this.closeAllPumpeds();
        window.addEventListener('beforeunload', this.closeAllPumpeds);
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;
    }
    
    render() {
        return (
            <Fragment>
                <div>Pumping</div>
                <Btn onClick={this.closeAllPumpeds} label="Закрыть шарики"></Btn>
            </Fragment>
        )
    }
}