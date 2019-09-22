import React, { Component } from 'react';
import { workerHandler, positionWatcher } from '../../services'

import './pumped.css';

export default class Pumped extends Component{

    worker = new SharedWorker('./services/worker.js');

    messageHandler = new workerHandler(this.worker, {
        'pumped:close': (name) => {
            if(window.name === name) window.close();
        },
        'pumped:closeAll': () => {
            window.close();
        },
        'pumped:plugged': (data) => {
            let { target, side } = data;
            if(window.name === target) this.onChangePlug(true, side);
        },
        'pumped:unplugged': (name) => {
            if(window.name === name) this.onChangePlug(false);
        },
        'pump:down': ({delta, ratio}) => {
            if(this.state.plagged) this.onPumpDown(delta, ratio);
        }
    });

    state = {
        lastTitle: '',
        position: {},
        plagged: false,
        side: '',
        delta: 0,
        ratio: 1,
        runResize: false,
    }

    runResize = (need) => {
        requestAnimationFrame(() => this.smoothResize(need));
    }

    smoothResize = (need) => {
        let { delta, runResize } = this.state;
        if(runResize && !need) return;

        console.log('smoothResize');
        

        let step = 2;
        let move = -step / 2;

        delta = delta - step;

        window.resizeBy(step, step);
            window.moveBy(move, move);

        if(delta > 0) {
            runResize = true;
            this.runResize(true);
        } else {
            delta = 0;
            runResize = false;
        }

        this.setState({
            delta,
            runResize
        });
    }

    onPumpDown(delta, ratio = 1) {        
        this.setState(state => {
            this.runResize();

            return {
                delta: state.delta + ( delta / ratio),
                ratio,
            }
        })
    }

    onChangePlug(value, side = '') {
        this.setState({
            plagged: value,
            side
        });
    }

    onPosition(position) {
        this.messageHandler.message('position:update', {target: window.name, position});
        this.setState({
            position
        })
    }

    onClose = () => {
        this.messageHandler.message('pumped:disconnected', window.name);
    }

    componentDidMount() {
        let lastTitle = document.title;
        document.title = 'Шарик';

        window.addEventListener('beforeunload', this.onClose);

        this.messageHandler.message('pumped:connected', window.name);

        this.posWatcher = new positionWatcher(pos => this.onPosition(pos));

        this.setState({
            lastTitle
        });
    }

    componentWillUnmount() {
        document.title = this.state.lastTitle;

        this.posWatcher && this.posWatcher.stop();
    }

    render() {
        const { plagged } = this.state;
        let color = plagged ? '#e91e63' : '#576d7e';

        return (
            <div className="Pumped">
                <svg className="baloon" xmlns="http://www.w3.org/2000/svg" width="223" height="300" viewBox="0 0 222 300" version="1.1">
                    <path fill={color} transform="matrix(0.02344759,0,0,-0.02344759,-0.03472868,300.11723)" d="M 4430,12789 C 3509,12730 2661,12419 1950,11881 883,11074 192,9797 36,8345 -33,7704 2,6967 136,6240 328,5201 760,4156 1358,3285 1894,2504 2583,1846 3277,1451 c 140,-79 424,-214 558,-264 215,-80 439,-136 648,-162 60,-7 111,-16 115,-19 8,-9 -15,-237 -34,-326 -35,-167 -134,-411 -198,-487 -33,-40 -33,-73 2,-105 59,-57 173,-82 372,-83 213,0 331,25 393,83 36,34 34,62 -7,116 -114,150 -225,522 -226,758 0,54 -15,47 150,68 889,116 1919,814 2751,1865 480,607 892,1332 1182,2085 466,1210 624,2521 441,3659 -214,1337 -881,2491 -1874,3242 -876,663 -1971,982 -3120,908 z"/>
                </svg>
            </div>
        )
    }
}