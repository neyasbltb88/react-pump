export default class workerHandler {
    constructor(worker, handlers) {
        this.worker = worker;
        this.handlers = handlers;

        this.worker.port.addEventListener('message', this.handler, false);
        this.worker.port.start();
    }

    message = (type, data) => {
        this.worker.port.postMessage(JSON.stringify({ type, data }));
    }

    handler = (e) => {
        try {
            let { type, data } = JSON.parse(e.data);
            if(type !== 'position:update') {
                // console.log(type, data);
            }

            if(type === 'worker:error') {
                console.log('%c%s', 'color: #272822;background-color: #F92672;padding: 2px 10px;', type, data);
                alert(`${type} - ${data}`);
            }

            let typeHandler = this.handlers[type];
            if(typeHandler) {
                // console.log(type, data);
                typeHandler(data);
            }
        } catch(err) { console.log(err) }
    }
}