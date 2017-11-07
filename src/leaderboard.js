import React from 'react';
import './leaderboard.css';

export default class Leaderboard extends React.Component{
    mergeCreatureArrays() {
        var array = this.props.herbies.concat(this.props.carnies);
        array.sort(function(a, b){return b.health - a.health});
        return array;
    }
    
    hideAndChange(e) {
        var arrow = e.target.children[0];
        var leaderBoard = e.target.parentElement
        if(arrow.className === "fa fa-angle-right"){
            arrow.classList.remove("fa-angle-right");
            arrow.classList.add("fa-angle-left");
            leaderBoard.style.right = "-240px";
        } else {
            arrow.classList.remove("fa-angle-left");
            arrow.classList.add("fa-angle-right");
            leaderBoard.style.right = "0px";
        }
    }

    render() {
        var creaturesArray = this.mergeCreatureArrays();

        var mainDivStyle = {
            position: "absolute",
            top: 10,
            right: 0,
            zIndex: 12,
            transition: "all 0.5s ease-in-out"
        }

        var buttonDivStyle = {
            backgroundColor: "rgba(255,255,255,0.5)",
            display: "inline-block",
            position: "absolute",
            left: -14,
            top: "50%",
            transform: "translateY(-50%)",
            minHeight: 30,
            height: "20%",
            width: 13,
            border: "solid 1px black",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8
        }

        var iconStyle = {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 4
        }

        var boardDivStyle = {
            backgroundColor: "rgba(255,255,255,0.5)"
        }

        var boardStyle = {
            border: "1px solid black",
            borderCollapse: "collapse"
        };

        var tdStyle = {
            border: "1px solid black",
            width: 60,
            height: 20
        }

        return(
            <div id="leaderBoard" style={mainDivStyle}>
                <div onMouseEnter={this.hideAndChange} id="leaderboardCollapseButton" style={buttonDivStyle}>
                    <i className="fa fa-angle-right" style={iconStyle}></i>
                </div>
                <div style={boardDivStyle}>
                    <table style={boardStyle}>
                        <thead>
                            <tr>
                                <th>Name</th> 
                                <th>Health</th>
                                <th>Age</th>
                                <th>Sight</th> 
                                <th>Speed</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {creaturesArray.map(creature => 
                                <tr>
                                    <td style={tdStyle}>{creature.key}</td>
                                    <td style={tdStyle}>{creature.health.toPrecision(5)}</td>
                                    <td style={tdStyle}>{creature.age}</td>
                                    <td style={tdStyle}>{creature.sense.sight.toPrecision(3)}</td>
                                    <td style={tdStyle}>{creature.speed}</td>
                                </tr>
                            )}
                        </tbody>   
                    </table>
                </div>
            </div>
            
        );
    }
};