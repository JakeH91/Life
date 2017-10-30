import React from 'react';

class Herbie extends React.Component {
    render() {
        var herbieImageString = require("./herbie.png");
        var changeImage = Math.floor(this.props.image);
        if(changeImage !== 0 && changeImage < 5){
            herbieImageString = require("./herbieDying" + changeImage + ".png");
        } else if(changeImage >= 5){
            herbieImageString = require("./herbieSleeping" + changeImage + ".png");
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