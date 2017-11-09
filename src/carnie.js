import React from 'react';

class Carnie extends React.Component {
    render() {
        var carnieImageString = require("./carnieMoving.gif");
        var changeImage = this.props.state;
        if(changeImage === "decaying"){
            carnieImageString = require("./carnieDying.gif");
        } else if(changeImage === "sleeping"){
            carnieImageString = require("./carnieSleeping.gif");
        }
        var carnieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)",
            backgroundImage: "url(" + carnieImageString + ")",
            backgroundSize: this.props.size + "px " + this.props.size + "px",
            transition: "background-image 0.1s ease-out"
        };
        return (
            <div style={carnieStyle}>
            </div>
        )
    }
};

export default Carnie;