import React from 'react';
import './background.css';

export default class Background extends React.Component{
    
    changeLighting(time) {
        var backgroundStyle, r, g, b, a;

        var addition = Math.floor(255/12);
        var opacityAddition = 0.0666;
        // Maybe change background color instead of just black and white
        // var gAddition = Math.floor(230/12);
        // var bAddition = Math.floor(255/12);
        if(time > 0 && time < 13){ 
            r = 255;
            g = 255;
            b = 255;
            a = 0.1;
            r -= (addition * time);
            g -= (addition * time);
            b -= (addition * time);
            a += (opacityAddition * time);
            
        } else if(time > 12){
            r = 0;
            g = 0;
            b = 0;
            a = 0.9;
            r += (addition * (time - 12));
            g += (addition * (time - 12));
            b += (addition * (time - 12));
            a -= (opacityAddition * (time - 12));
        } else if(time === 0){
            r = 255;
            g = 255;
            b = 255;
            a = 0.1;
        }

        backgroundStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        var background = document.getElementById("lighting");
        background.style.backgroundColor = backgroundStyle;
    }

    componentWillUpdate() {
        var time = this.props.time % 24;
        this.changeLighting(time);
    }
    
    render() {
        return (
            <div id="lighting" >
            </div>
        );
    }
};