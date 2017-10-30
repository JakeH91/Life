import React from 'react';

export default class StartButton extends React.Component{
    render() {
        var buttonStyle = {
            width: 100,
            height: 40,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 10,
            backgroundColor: "green",
            color: "white",
            zIndex: "11"
        };

        return (
            <button id="startButton" style={buttonStyle}>CREATE LIFE</button>
        );
    }
};