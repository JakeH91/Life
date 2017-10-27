import React from 'react';
import herbie from './herbie.png';

class Herbie extends React.Component {
    render() {
        var herbieStyle = {
            height: this.props.size,
            width: this.props.size,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)"
        };
        return (
            <img src={herbie} style={herbieStyle} alt="Herbie" />
        );
    }
};

export default Herbie;