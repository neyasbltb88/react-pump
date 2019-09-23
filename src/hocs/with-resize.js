import React, { Component, createRef } from 'react';

const withResize = (Comp) => {
    return class withResize extends Component {
        constructor(props) {
            super(props);
            this.comp = createRef();

            this.messageHandler = this.props.messageHandler({
                'pump:down': ({delta, ratio}) => {
                    if(this.comp.current.state.plagged) this.onPumpDown(delta, ratio);
                },
            });

            this.state = {
                delta: 0,
                runResize: false,
            }
        }

        runResize = (need) => {
            requestAnimationFrame(() => this.smoothResize(need));
        }
    
        smoothResize = (need) => {
            let { delta, runResize } = this.state;
    
            // Если процесс плавного ресайза уже запущен 
            // и нет флага принудительного запуска, то выходим
            if(runResize && !need) return;
    
            // За один вызов увеличение на 2px, а сдвиг на 1px
            let step = 2;
            let move = -step / 2;
    
            // Вычитаем шаг увеличения из буффера увеличения
            delta = delta - step;
    
            window.resizeBy(step, step);
            window.moveBy(move, move);
    
            // Если в буфере еще есть остаток, вызовем эту функцию еще раз
            if(delta > 0) {
                runResize = true;
                this.runResize(true);
    
            // Если буфер увеличения закончился
            } else {
                delta = 0;
                runResize = false;
            }
    
            this.setState({
                delta,
                runResize
            });
        }

        // Обработчик надувания
        onPumpDown(delta, ratio = 1) {        
            this.setState(state => {
                // Пытается запустить плавный ресайз
                // (если он уже идет, то эта попытка будет проигнорирована)
                this.runResize();

                // Обновляем значение буфера ресайза
                return {
                    delta: state.delta + ( delta / ratio)
                }
            })
        }

        render() {
            return <Comp ref={this.comp} { ...this.props }/>
        }
    }
}

export default withResize;