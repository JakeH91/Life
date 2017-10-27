import React from 'react';
import herbie from './herbie.png';
import herbieDying1 from './herbieDying1.png';
import herbieDying2 from './herbieDying2.png';
import herbieDying3 from './herbieDying3.png';
import herbieDying4 from './herbieDying4.png';

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
            <img src={herbieImageString} style={herbieStyle} alt="Herbie" />
        );
    }
};

export default Herbie;