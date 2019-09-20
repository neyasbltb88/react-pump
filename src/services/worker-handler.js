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
            

            let typeHandler = this.handlers[type];
            if(typeHandler) typeHandler(data);

        } catch(err) { console.log(err) }
    }
}