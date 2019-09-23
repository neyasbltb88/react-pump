import React, { Component } from 'react';

const withComputeCollision = (Comp) => {
    return class withComputeCollision extends Component {

        state = {
            connectedSide: {
                left: false,
                right: false
            },
            Pumping: null, // Положение насоса
            Pumpeds: new Map(), // Список шариков с их положениями
            Plugged: new Map(), // Коллекция подключенных шариков
        }

        messageHandler = this.props.messageHandler({
            'position:update': (data) => this.onPositionUpdate(data),
            'pumped:disconnected': (data) => this.onDisconnectedPumped(data),
            'checkStatus:pumped': (name) => this.onCheckStatusPumped(name),
        });

        // Обработчик запроса статуса подключения шарика
        onCheckStatusPumped(name) {
            let { Plugged } = this.state;
            let plugged = Plugged.has(name) ? Plugged.get(name) : false;

            this.messageHandler.message('status:pumped', { target: name, plugged });
        }

        // Обрабатывает изменение размеров/позиций насоса и шариков
        onPositionUpdate(data) {
            let { target, position } = data;

            if(target === 'Pumping') {
                this.setState({ Pumping: position });
            }

            this.collisionCalc(target, position);
        }

        // Рассчитывает столкновения(подключения) насоса и шариков
        collisionCalc(target, position) {
            let Pumping = null;
            let Pumpeds = new Map([...this.state.Pumpeds]);
            let sides = {
                left: false,
                right: false
            }

            // Если изменилось положение насоса
            if(target === 'Pumping') {
                // Запомним новое положение насоса
                Pumping = position;

            // Если изменилось положение шарика
            } else {
                // Получим положение насоса
                Pumping = {...this.state.Pumping};
                // Обновим изменившееся положение шарика
                Pumpeds.set(target, position);
            }

            // Сверяем положение насоса с шариками
            Pumpeds.forEach((pumped, name) => {
                let vertical = false;
                let horizontal = false;

                if(Pumping.top <= pumped.bottom && Pumping.bottom >= pumped.top) { vertical = true; }
                if(Pumping.left <= pumped.right && Pumping.right >= pumped.left) { horizontal = true; }

                if(vertical && horizontal) {
                    let pumpingCenter = ((Pumping.right - Pumping.left) / 2) + Pumping.left;
                    let pumpedCenter = ((pumped.right - pumped.left) / 2) + pumped.left;

                    let side = ( (pumpingCenter - pumpedCenter) > 0 ) ? 'left' : 'right';
                    sides[side] = true;
                    this.onPlug(name, side);
                } else {
                    this.onUnplug(name);
                }
            });

            // Сохраним изменения положений
            this.setState({
                connectedSide: sides,
                Pumping,
                Pumpeds
            });
        }

        // Подключает шарик к насосу
        onPlug(name, side) {
            side = ( side === 'left' ) ? 'right' : 'left';

            this.setState(state => {
                let Plugged = new Map([...state.Plugged]);

                // Если шарик еще не был подключен, подключаем и уведомляем
                if(!Plugged.has(name) || Plugged.get(name) !== side) {
                    Plugged.set(name, side);
                    this.messageHandler.message('pumped:plugged', {
                        target: name,
                        side
                    });
                } 
                
                return { Plugged };
            });
        }

        // Отключает шарик от насоса
        onUnplug(name) {
            this.setState(state => {
                let Plugged = new Map([...state.Plugged]);

                // Если delete вернет true, значит шарик был подключен, 
                // а теперь отключился, значит уведомляем
                if(Plugged.delete(name)) {
                    this.messageHandler.message('pumped:unplugged', name);
                } 
                
                return { Plugged };
            });
        }

        // Обрабатывает дисконнект шарика
        onDisconnectedPumped(data) {
            let Pumpeds = new Map([...this.state.Pumpeds]);
            let { Pumping } = this.state;

            Pumpeds.delete(data);

            this.setState({ Pumpeds });

            this.onUnplug(data);
            this.collisionCalc('Pumping', Pumping);
        }

        componentDidUpdate() {
            if(!this.state.Pumping) {
                this.setState({ Pumping: this.props.position });
            }
        }

        render() {
            const { Pumpeds, connectedSide, Plugged } = this.state;

            return <Comp Pumpeds={Pumpeds} connectedSide={connectedSide} Plugged={Plugged} {...this.props}/>
        }
    }
}

export default withComputeCollision;