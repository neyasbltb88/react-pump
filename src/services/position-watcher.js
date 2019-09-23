import throttle from './throttle';

export default class positionWatcher {
    constructor(callback = () => {}) {
        this.cb = callback;
        this.handler = throttle(this.handler, 50);
        this.lastPosition = {
            top: null,
            right: null,
            bottom: null,
            left: null
        };

        this.raf = null;
        this.autoUpdate = false;

        this.start();
    }

    comparePosition(position) {
        return Object.keys(position).some(pos => position[pos] !== this.lastPosition[pos]);
    }

    handler = () => {
        let position = {
            top: window.screenY,
            right: window.screenX + window.outerWidth,
            bottom: window.screenY + window.outerHeight,
            left: window.screenX
        };

        if(this.comparePosition(position)) {
            this.cb(position);
            this.lastPosition = position;
        }

        if(this.autoUpdate) {
            this.raf = window.requestAnimationFrame(() => this.handler());
        }
    }

    start() {
        this.autoUpdate = true;
        this.handler();
    }

    stop() {
        this.autoUpdate = false;
        window.cancelAnimationFrame(this.raf);
    }
}