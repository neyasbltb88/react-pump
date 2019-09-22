import React, { Component, createRef } from 'react';
import './btn.css';

export default class Btn extends Component {
    constructor(props) {
        super(props);
        this.btn = React.createRef();
    }

    componentDidMount() {
        if(this.props.color) {
            this.btn.current.style.setProperty('--primary', this.props.color);
        }
    }
    
    render() {
        const { onClick, label, disabled, dense, children } = this.props;
        let content = children ? children : label;
        let title = (children && label) ? label : '';

        return <button ref={this.btn} className={`${dense ? 'Btn-dense' : 'Btn'}`} onClick={onClick} disabled={disabled} title={title}>{content}</button>
    }
    
}