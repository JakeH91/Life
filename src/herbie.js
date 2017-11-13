import React from 'react';

class Herbie extends React.Component {
    render() {
        var herbieImageString = require("./herbie.png");
        var changeImage = this.props.state;
        if(changeImage === "decaying"){
            herbieImageString = require("./herbieDying.gif");
        } else if(changeImage === "sleeping"){
            herbieImageString = require("./herbieSleeping.gif");
        }
        var herbieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url(" + herbieImageString + ")",
            backgroundSize: this.props.size + "px " + this.props.size + "px",
            transition: "background-image 0.1s ease-out"
        };
        return (
            <div style={herbieStyle} alt="Herbie">
            </div>
        );
    }
};

export default Herbie;