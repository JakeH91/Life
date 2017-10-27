import React from 'react';
import herbie from './herbie.png';
import herbieDying1 from './herbieDying1';
import herbieDying2 from './herbieDying2';
import herbieDying3 from './herbieDying3';
import herbieDying4 from './herbieDying4';

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