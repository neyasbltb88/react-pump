import React from 'react'
import { workerHandler } from '../services';

const workerHandlerMaker = (handlers = {}) => {
    let worker = new SharedWorker('./services/worker.js');
    return new workerHandler(worker, handlers);
}

const withMessageHandler = (Comp) => {
    return (props) => {
        return <Comp messageHandler={workerHandlerMaker} {...props}/>
    }
}

export default withMessageHandler;