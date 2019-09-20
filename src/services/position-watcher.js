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

        // window.addEventListener('resize', this.handler);
        // requestAnimationFrame(() => this.handler());
        // window.requestAnimationFrame(this.handler);

        this.start();
    }

    comparePosition(position) {
        let diff = false;

        for(let pos in position) {
            if(position[pos] !== this.lastPosition[pos]) {
                diff = true;
            }
        }

        return diff;
    }

    handler = () => {
        let position = {
            top: window.screenY,
            right: window.screenX + window.outerWidth,
            bottom: window.screenY + window.outerHeight,
            left: window.screenX
        };

        let compare = this.comparePosition(position);
        if(compare) {
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