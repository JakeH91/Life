import React from 'react';
import Animal from './animal.js';

class Herbie extends React.Component {
    render() {
        var herbieImageString = require("./herbie.png");
        if(this.props.dying !== 0 && this.props.dying !== 5){
            herbieImageString = require("./herbieDying" + this.props.dying + ".png");
        }
        var herbieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)"
        };
        return (
            <Animal>
                <img src={herbieImageString} style={herbieStyle} alt="Herbie" />
            </Animal>
        );
    }
};

export default Herbie;