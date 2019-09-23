import React, { Component } from 'react';
import { positionWatcher } from '../services'

const withPositionWatcher = (Comp) => {
    return class withPositionWatcher extends Component {

        state = {
            position: {},
        }

        messageHandler = this.props.messageHandler();

        // Обработчик изменения положения/размеров
        onPosition(position) {
            this.setState({ position });
            this.messageHandler.message('position:update', { target: window.name, position });
        }

        componentDidMount() {
            this.posWatcher = new positionWatcher(pos => this.onPosition(pos));
        }

        componentWillUnmount() {
            this.posWatcher && this.posWatcher.stop();
        }

        render() {
            const { position } = this.state;

            return <Comp position={position} {...this.props}/>
        }
    }
}

export default withPositionWatcher;