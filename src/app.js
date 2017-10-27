import React from 'react';
import Carnie from './carnie.js';
import Herbie from './herbie.js';
import Leaf from './leaf.js';

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isMoving: true,
            top: Math.floor(Math.random() * 100),
            left: Math.floor(Math.random() * 100)
        }
    }
    
    move() {
        if(this.state.isMoving){
            var topDirection = Math.floor(Math.random() * 2);
            var leftDirection = Math.floor(Math.random() * 2);
            var topDistance = 1;
            var leftDistance = 1;
            if((topDirection < 1 && this.state.top !== 0) || this.state.top === 100) {
                topDistance *= -1;
            }
            if((leftDirection < 1 && this.state.left !== 0) || this.state.left === 100) {
                leftDistance *= -1;
            }

            var newTopState = this.state.top + topDistance;
            var newLeftState = this.state.left + leftDistance;
            this.setState({
                top: newTopState,
                left: newLeftState
            }) ;
        } 
    }
    
    componentDidMount() {
        this.gameOn = setInterval(
            () => this.move, 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.gameOn);
    }

    render() {
        return(
            <div>
                <Carnie size="20px" top={this.state.top} left={this.state.left} />
                <Herbie size="20px" />
                <Leaf />
            </div>
        );
    }
}