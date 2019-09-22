import React, { Component } from 'react';
// import { throttle } from '../../services';

import './pump-handle.css';

export default class PumpHandle extends Component {

    lastDragPosition = null;

    componentDidMount() {
        // this.onMouseMove = throttle(this.onMouseMove, 50);
    }

    onMouseDown = (e) => {
        this.lastDragPosition = e.screenY;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp, { once: true });
    }

    onMouseMove = (e) => {
        let delta = this.lastDragPosition - e.screenY;
        this.props.handleResize(delta);
        this.lastDragPosition = e.screenY;
    }

    onMouseUp = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    render() {
        return(
            <div className="PumpHandle">
                <img onMouseDown={this.onMouseDown} src="./img/pump-handle.svg" alt="pump-handle" className="pump-handle-svg" draggable="false"/>
            </div>
        )
    }
}