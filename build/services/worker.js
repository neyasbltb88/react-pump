let ports = new Set();
let Pumping = null;
let Pumpeds = new Map();
let positions = new Map();

class MessageHandler {
    constructor(handlers) {
        this.handlers = handlers;
    }

    messageToAll = (type, data, target) => {
        ports.forEach(port => {        
            port.postMessage(JSON.stringify({ type, data, target }));
        });
    }

    handler = (e) => {
        try {
            let { target } = e;
            let { type, data } = JSON.parse(e.data);
            this.messageToAll(type, data);

            let typeHandler = this.handlers[type];
            if(typeHandler) typeHandler(data, target);

            // После получения каждого сообщения показывает количество активных портов
            // this.messageToAll('ports', [...ports]);

        } catch(err) { this.messageToAll('worker:error', err); }
    }
}

const messageHandler = new MessageHandler({
    // data - undefined, target - порт воркера
    'pumping:connected': (data, target) => {
        Pumping = target;
    },
    // data - undefined, target - порт воркера
    'pumping:disconnected': (data, target) => {
        messageHandler.messageToAll('ports.delete', ports.delete(target));
        Pumping = null;
    },
    // data - имя окна, target - порт воркера
    'pumped:connected': (data, target) => {
        Pumpeds.set(data, target);
        messageHandler.messageToAll('Pumpeds: ', [...Pumpeds.keys()]);
    },
    // data - имя окна, target - порт воркера
    'pumped:disconnected': (data, target) => {
        ports.delete(target);
        Pumpeds.delete(data);
        // messageHandler.messageToAll('ports.delete', ports.delete(target));
        // messageHandler.messageToAll('Pumpeds.delete: ', Pumpeds.delete(data));
        messageHandler.messageToAll('Pumpeds: ', [...Pumpeds.keys()]);
    }
});

self.addEventListener('connect', e => {
    ports.add(e.source);
    e.source.addEventListener('message', messageHandler.handler);
    e.source.start();
}, false);