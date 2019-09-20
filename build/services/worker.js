let ports = new Set();
let Pumping = null;
let Pumpeds = new Map();

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
        ports.delete(target);
        Pumping = null;
    },
    // Команда, отвечающая, запущен ли насос
    'checkStatus:pumping': () => {
        messageHandler.messageToAll('status:pumping', (Pumping !== null));
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
        messageHandler.messageToAll('Pumpeds: ', [...Pumpeds.keys()]);
    },
    // Команда, отвечающая количеством запущенных шариков
    'checkStatus:pumpeds': () => {
        messageHandler.messageToAll('status:pumpeds', Pumpeds.size);
    }
    
});


this.addEventListener('connect', e => {
    ports.add(e.source);
    e.source.addEventListener('message', messageHandler.handler);
    e.source.start();
}, false);