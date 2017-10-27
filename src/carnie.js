import React from 'react';
import carnie from './carnie.png';

class Carnie extends React.Component {
    render() {
        var carnieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)"
        };
        return (
            <img src={carnie} style={carnieStyle} alt="Carnie" />
        )
    }
};

export default Carnie;