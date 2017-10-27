import React from 'react';
import leaf from './leaf.png';

class Leaf extends React.Component {
    render() {
        var leafStyle = {
            height: 8,
            width: 10,
            position: "absolute",
            top: this.props.top + "%",
            left: this.props.left + "%",
            transform: "translate(-50%, -50%)"
            // WUT
        };
        return (
            <img src={leaf} style={leafStyle} alt="Leaf"/>
        );
    }
};

export default Leaf;