import React from 'react';

class Carnie extends React.Component {
    render() {
        var carnieImageString = require("./carnie.png");
        var changeImage = Math.floor(this.props.image);
        if(changeImage !== 0 && changeImage !== 5){
            carnieImageString = require("./carnieDying" + changeImage + ".png");
        }
        var carnieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)"
        };
        return (
            <img src={carnieImageString} style={carnieStyle} alt="Carnie" />
        )
    }
};

export default Carnie;