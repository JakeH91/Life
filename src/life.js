import React from 'react';
import Herbie from './herbie.js';
import Carnie from './carnie.js';
import Leaf from './leaf.js';

export default class Life extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Time since beginning
            timeElapsed: 0,
            // Initialize lifeform arrays
            herbies: [],
            carnies: [],
            leaves: [],
        }
    }

    startGame() {
        this.timeInterval = setInterval(() => this.updateTime(), 10000);
        for(var i = 0; i < this.props.numLeaves; i++) {
            this.generateLeaf(i);
        }
        for(var j = 0; j < this.props.numHerbies; j++) {
            this.generateHerbie(j);
        }
        for(var k = 0; k < this.props.numCarnies; k++) {
            this.generateCarnie(k);
        }
    }

    updateTime() {
        const { timeElapsed } = this.state;
        this.setState({
            timeElapsed: timeElapsed + 1
        });
    }

    generateLeaf(i) {
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        
        var newLeaf = { 
            key: "leaf" + i,
            position: {
                top: top,
                left: left
            },
            nutrition: 100
        };

        var leavesArray = this.state.leaves;
        leavesArray.push(newLeaf);

        this.setState({
            leaves: leavesArray
        });
    }

    generateHerbie(i) {
        // Generate Position
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var randomSize = Math.floor(Math.random() * 20) + 20;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var randomNutrition = randomSize * 10;
        var randomHealth = Math.floor(Math.random() * 400) + 800;

        var newHerbie = {
            key: "herbie" + i,
            position: { top: top, left: left },
            size: randomSize,
            sense: { sight: randomSight },
            nutrition: randomNutrition,
            health: randomHealth,
            dying: 0,
            target: -1
        }

        var herbiesArray = this.state.herbies;
        herbiesArray.push(newHerbie);

        this.setState({
            herbies: herbiesArray
        });
    }

    generateCarnie(i) {
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var randomSize = Math.floor(Math.random() * 20) + 20;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var randomNutrition = randomSize * 10;
        var randomHealth = Math.floor(Math.random() * 400) + 800;

        var newCarnie = {
            key: "carnie" + i,
            position: { top: top, left: left },
            size: randomSize,
            sense: { sight: randomSight },
            nutrition: randomNutrition,
            health: randomHealth,
            dying: 0,
            target: -1
        }

        var carniesArray = this.state.carnies;
        carniesArray.push(newCarnie);

        this.setState({
            carnies: carniesArray
        });

    }
    // Herbies movement logic
    move(creature) {
        if(creature === "herbie"){
            var { herbies: lifeForm } = this.state;
        } else if(creature === "carnie"){
            var { carnies: lifeForm } = this.state;
        }
        
        
        // Provide shortcuts for various bits of data
        for(var i = 0; i < lifeForm.length; i++){
            // Minus 7 health point
            var newHealth = lifeForm[i].health - 7;
            var lifeFormArray = lifeForm.slice();
            lifeFormArray[i].health = newHealth;
            if(creature === "herbie"){
                this.setState({
                    herbies: lifeFormArray
                });
            } else if(creature === "carnie"){
                this.setState({
                    carnies: lifeFormArray
                });
            }
            
            if(lifeForm[i].health <= 0){
                // this.herbieDie(i);
                console.log("DEAD!");
            }
            else {
                var topDirection, leftDirection;
        //         // If there is a leaf close by...
        //         if(herbieTarget !== -1){
        //             // If it's on the same y-axis, no need to changein that direction.
        //             if(herbie.top === leaf[herbieTarget].top){
        //                 topDirection = 0;
        //             } 
        //             // If it's below, move downwards.
        //             else if((herbie.top - leaf[herbieTarget].top) < 0) {
        //                 topDirection = 1;
        //             } 
        //             // If it's above, move upwards.
        //             else if((herbie.top - leaf[herbieTarget].top) > 0) {
        //                 topDirection = -1;
        //             }

        //             // If it's on the same x-axis, no need to change in that direction.
        //             if(herbie.left === leaf[herbieTarget].left){
        //                 leftDirection = 0;
        //             }
        //             // If it's to the right, move right.
        //             else if((herbie.left - leaf[herbieTarget].left) < 0) {
        //                 leftDirection = 1;
        //             }
        //             // If it's to the left, move left.
        //             else if((herbie.left - leaf[herbieTarget].left) > 0) {
        //                 leftDirection = -1;
        //             }
        //             // If with that last movement you landed on the leaf
        //             if((herbie.left === leaf[herbieTarget].left) && (herbie.top === leaf[herbieTarget].top)){
        //                 // Eat the leaf.
        //                 this.herbieEatLeaf(herbieTarget);
        //             }
        //         } 
        //         // If there is no leaf close by...
        //         else {
        //             this.herbieCheckForLeaves();
                    // Generate random numbers
                    topDirection = Math.floor(Math.random() * 2);
                    leftDirection = Math.floor(Math.random() * 2);
                    // If topDirection random number is 0, and Herbie is not at the top of the board
                    // (Or herbie is at the bottom or the board)
                    if((topDirection < 1 && lifeForm[i].position.top !== 0) || lifeForm[i].position.top === 100) {
                        // Move upwards.
                        topDirection = -1;
                    } 
                    // Otherwise, ff topDirection random number is 1,
                    else {
                        // Move downwards.
                        topDirection = 1;
                    }

                    // If leftDirection random number is 0, and Herbie is not at the absolute left of the board
                    // (Or herbie is at the absolute right or the board)
                    if((leftDirection < 1 && lifeForm[i].position.left !== 0) || lifeForm[i].position.left === 100) {
                        // Move left
                        leftDirection = -1;
                    } 
                    // Otherwise, if leftDirection random number is 1,
                    else {
                        // Mover right
                        leftDirection = 1;
                    }
                // }

                // Once direction has been decided, add movement to temporary state variable,
                var newTopState = lifeForm[i].position.top + topDirection;
                var newLeftState = lifeForm[i].position.left + leftDirection;
                lifeFormArray = lifeForm.slice();
                lifeFormArray[i].position = {top: newTopState, left: newLeftState};
                // Then set the states to those variables
                if(creature === "herbie"){
                    this.setState({
                        herbies: lifeFormArray
                    });
                } else if(creature === "carnie"){
                    this.setState({
                        carnies: lifeFormArray
                    });
                }
  
            }
        }
    }

    // Herbie looking for leaves logic
    // herbieCheckForLeaves() {
    //     // Create shortcuts for data
    //     const { herbie, leaf } = this.state.positions;
    //     const { herbie: herbieSense } = this.state.senses;

    //     // Total sensing range
    //     var sensingDistance = Math.sqrt((Math.pow(herbieSense.sight, 2)) + (Math.pow(herbieSense.sight, 2)));
    //     // Check through all leaves
    //     for(var i = 0; i < leaf.length; i++){
    //         // Compare top distance of herbie and leaf
    //         var topDistanceFromLeaf = herbie.top - leaf[i].top;
    //         // Compare left distance of herbie and leaf
    //         var leftDistanceFromLeaf = herbie.left - leaf[i].left;
    //         // Figure out distance from leaf
    //         var distanceToLeaf = Math.sqrt((Math.pow(topDistanceFromLeaf, 2)) + (Math.pow(leftDistanceFromLeaf, 2)));
    //         // If the distance to the leaf is witin sensing range
    //         if(distanceToLeaf < sensingDistance){
    //             // Set target to that leaf
    //             this.setState({
    //                 target: {
    //                     herbie: i
    //                 }
    //             });
    //             return;
    //         }
    //     }
    // }

    // // Herbie leave eating logic
    // herbieEatLeaf(leafIndex) {
    //     var newHealth = this.state.health.herbie + this.state.nutrition.leaf;
    //     // Make copy of array of all leaves
    //     var newLeafState = this.state.positions.leaf.slice();
    //     // Remove the discovered leaf from this copy
    //     newLeafState.splice(leafIndex, 1);
    //     // Set the state to the filtered leaf array, minus the eaten leaf.
    //     this.setState({
    //         positions: {
    //             ...this.state.positions, // Keep all other position states the same.
    //             leaf: newLeafState
    //         }, 
    //         target: {
    //             herbie: -1
    //         },
    //         health: {
    //             ...this.state.health,
    //             herbie: newHealth
    //         }
    //     });
    // }

    herbieDie(i) {
        console.log("Herbie" + i + " is dead!");
        var herbiesArray = this.state.herbies.slice();
        herbiesArray.splice(i, 1);
        this.setState({
            herbies: herbiesArray
        });
        // this.startHerbieDecay = setInterval(
        //     () => this.herbieDecay(), 2000
        // );

    }

    // herbieDecay() {
    //     var newDeathState = this.state.dying.herbie + 1;
    //     if(newDeathState !== 5){
    //         var newNutritionState = this.state.nutrition.herbie - 100;
    //         this.setState({
    //             dying: {
    //                 ...this.state.dying,
    //                 herbie: newDeathState
    //             },
    //             nutrition: {
    //                 ...this.state.nutrition,
    //                 herbie: newNutritionState
    //             }
    //         });
    //     } else {
    //         this.setState({
    //             positions: {
    //                 ...this.state.positions,
    //                 herbie: {
    //                     top: -100,
    //                     left: -100
    //                 }
    //             }
    //         });
    //         clearInterval(this.startHerbieDecay);
    //     } 
    // }

    // // Carnie Moving Logic
    // carnieMove() {
    //     const { carnie, herbie } = this.state.positions;

    //     // Take health over time
    //     var newCarnieHealth = this.state.health.carnie - 7;
    //     this.setState({
    //         health: {
    //             ...this.state.health,
    //             carnie: newCarnieHealth
    //         }
    //     });

    //     // If Carnie health drops below 0, he's dead
    //     if(this.state.health.carnie <= 0){
    //         this.carnieDie();
    //     } else {
    //         // First, look around for herbies
    //         var herbieClose = this.carnieCheckForHerbies();

    //         var topDirection, leftDirection;
    //         // If there's a herbie nearby, chase it!
    //         if(herbieClose) {
    //             // If it's on the same y-axis, no need to changein that direction.
    //             if(carnie.top === herbie.top){
    //                 topDirection = 0;
    //             } 
    //             // If it's below, move downwards.
    //             else if((carnie.top - herbie.top) < 0) {
    //                 topDirection = 1;
    //             } 
    //             // If it's above, move upwards.
    //             else if((carnie.top - herbie.top) > 0) {
    //                 topDirection = -1;
    //             }

    //             // If it's on the same x-axis, no need to change in that direction.
    //             if(carnie.left === herbie.left){
    //                 leftDirection = 0;
    //             }
    //             // If it's to the right, move right.
    //             else if((carnie.left - herbie.left) < 0) {
    //                 leftDirection = 1;
    //             }
    //             // If it's to the left, move left.
    //             else if((carnie.left - herbie.left) > 0) {
    //                 leftDirection = -1;
    //             }
    //             // If with that last movement you landed on the herbie
    //             if((carnie.left === herbie.left) && (carnie.top === herbie.top)){
    //                 // Eat him.
    //                 this.carnieEatHerbie();
    //             }
    //         }
    //         // If there are no herbies, move around randomly.
    //         else {
    //             // Generate random numbers
    //             topDirection = Math.floor(Math.random() * 2);
    //             leftDirection = Math.floor(Math.random() * 2);
    //             // If topDirection random number is 0, and Carnie is not at the top of the board
    //             // (Or carnie is at the bottom or the board)
    //             if((topDirection < 1 && carnie.top !== 0) || carnie.top === 100) {
    //                 // Move upwards.
    //                 topDirection = -1;
    //             } 
    //             // Otherwise, ff topDirection random number is 1,
    //             else {
    //                 // Move downwards.
    //                 topDirection = 1;
    //             }

    //             // If leftDirection random number is 0, and Carnie is not at the absolute left of the board
    //             // (Or carnie is at the absolute right or the board)
    //             if((leftDirection < 1 && carnie.left !== 0) ||carnie.left === 100) {
    //                 // Move left
    //                 leftDirection = -1;
    //             } 
    //             // Otherwise, if leftDirection random number is 1,
    //             else {
    //                 // Mover right
    //                 leftDirection = 1;
    //             }
    //         }

    //         // Once direction has been decided, add movement to temporary state variable,
    //         var newTopState = carnie.top + topDirection;
    //         var newLeftState = carnie.left + leftDirection;
    //         // Then set the states to those variables
    //         this.setState({
    //             positions: {
    //                 ...this.state.positions, // Keep all other position states the same
    //                 carnie: {
    //                     top: newTopState,
    //                     left: newLeftState
    //                 }
    //             }
    //         });
    //     }


    // }
    
    // // Carnie looking for Herbies Logic
    // carnieCheckForHerbies() {
    //     // Create shortcuts for data
    //     const { carnie, herbie } = this.state.positions;
    //     const { carnie: carnieSense } = this.state.senses;

    //     // Compare top distance of herbie and leaf
    //     var topDistanceFromHerbie = carnie.top - herbie.top;
    //     // Compare left distance of herbie and leaf
    //     var leftDistanceFromHerbie = carnie.left - herbie.left;
    //     // If the distance from the top and left positions are within herbies sense of smell 
    //     if(Math.abs(topDistanceFromHerbie) < carnieSense.sight && Math.abs(leftDistanceFromHerbie) < carnieSense.sight){
    //         // Return the index of that leaf
    //         return true;
    //     }
        
    //     // If there is nothing within range, return false
    //     return false;
    // }

    // // Carnie eating Herbie Logic
    // carnieEatHerbie() {
    //     var newHerbieHealth = this.state.health.herbie - 200;
    //     this.setState({
    //         health: {
    //             ...this.state.health,
    //             herbie: newHerbieHealth
    //         }
    //     });

    //     if(this.state.health.herbie <= 0){
    //         var newCarnieHealth = this.state.health.carnie + this.state.nutrition.herbie;
    //         this.setState({
    //             health: {
    //                 ...this.state.health,
    //                 carnie: newCarnieHealth
    //             },
    //             nutrition: {
    //                 ...this.state.nutrition,
    //                 herbie: 0
    //             }
    //         });
    //         this.herbieDie();
    //     }
    // }

    // carnieDie() {
    //     this.setState({
    //         positions: {
    //             ...this.state.positions, // Keep all other position states the same
    //             carnie: {
    //                 top: -100,
    //                 left: -100
    //             }
    //         },
    //         health: {
    //             ...this.state.health,
    //             carnie: 0
    //         }
    //     });
    //     clearInterval(this.startCarnie);
    // }

    render() {
        return(
            <div>
                {this.state.herbies.map(herbie =>
                    <Herbie size={herbie.size} top={herbie.position.top} left={herbie.position.left} key={herbie.key} dying={herbie.dying} />
                )};
                {this.state.carnies.map(carnie =>
                    <Carnie size={carnie.size} top={carnie.position.top} left={carnie.position.left} key={carnie.key} />
                )};
                {this.state.leaves.map(leaf =>
                    <Leaf top={leaf.position.top} left={leaf.position.left} key={leaf.key} />
                )}
            </div>
            
        );
    } 
    
    componentDidMount() {
        this.startGame();
        this.startHerbie = setInterval(
            () => this.move("herbie"), 1000
        );
        this.startCarnie = setInterval(
            () => this.move("carnie"), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.startHerbie);
        clearInterval(this.startCarnie);
    }
};