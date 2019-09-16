import React, { Component } from 'react';
import './pumped.css';

export default class Pumped extends Component{

    state = {
        lastTitle: '',
        name: ''
    }

    componentDidMount() {
        let lastTitle = document.title;
        document.title = 'Шарик';

        this.setState({
            lastTitle,
            name: window.name
        });
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;
    }

    render() {
        return (
            <div>Pumped</div>
        )
    }
}