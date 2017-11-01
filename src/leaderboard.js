import React from 'react';
import './leaderboard.css';

export default class Leaderboard extends React.Component{
    mergeCreatureArrays() {
        var array = this.props.herbies.concat(this.props.carnies);
        array.sort(function(a, b){return b.health - a.health});
        return array;
    }
    
    render() {
        var creaturesArray = this.mergeCreatureArrays();

        var boardStyle = {
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 12,
            border: "1px solid black",
            borderCollapse: "collapse"
        };

        var tdStyle = {
            border: "1px solid black",
            width: 60,
            height: 20
        }

        console.log(creaturesArray);
        return(
            <table style={boardStyle}>
                <thead>
                    <tr>
                        <th>Name</th> 
                        <th>Health</th>
                        <th>Sight</th> 
                        <th>Speed</th>
                    </tr>
                </thead>
                
                <tbody>
                    {creaturesArray.map(creature => 
                        <tr>
                            <td style={tdStyle}>{creature.key}</td>
                            <td style={tdStyle}>{creature.health}</td>
                            <td style={tdStyle}>{creature.sense.sight.toPrecision(3)}</td>
                            <td style={tdStyle}>{creature.speed}</td>
                        </tr>
                    )}
                </tbody>


                
            </table>
        );
    }
};