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
            target: ""
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
            target: ""
        }

        var carniesArray = this.state.carnies;
        carniesArray.push(newCarnie);

        this.setState({
            carnies: carniesArray
        });

    }
    // Creature movement logic
    move(creature) {
        if(creature === "herbie"){
            var { herbies: lifeForm, leaves: food } = this.state;

        } else if(creature === "carnie"){
            var { carnies: lifeForm, herbies: food } = this.state;
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
                // If there is food close by...
                if(lifeForm[i].target){
                    var theTarget = undefined;
                    for(var a = 0; a < food.length; a++){
                        if(food[a].key === lifeForm[i].target){
                            theTarget = food[a];  
                        }
                    }
                    if(theTarget){
                        // If it's on the same y-axis, no need to changein that direction.
                        if(lifeForm[i].position.top === theTarget.position.top){
                            topDirection = 0;
                        } 
                        // If it's below, move downwards.
                        else if((lifeForm[i].position.top - theTarget.position.top) < 0) {
                            topDirection = 1;
                        } 
                        // If it's above, move upwards.
                        else if((lifeForm[i].position.top - theTarget.position.top) > 0) {
                            topDirection = -1;
                        }

                        // If it's on the same x-axis, no need to change in that direction.
                        if(lifeForm[i].position.left === theTarget.position.left){
                            leftDirection = 0;
                        }
                        // If it's to the right, move right.
                        else if((lifeForm[i].position.left - theTarget.position.left) < 0) {
                            leftDirection = 1;
                        }
                        // If it's to the left, move left.
                        else if((lifeForm[i].position.left - theTarget.position.left) > 0) {
                            leftDirection = -1;
                        }
                        // If with that last movement you landed on the leaf
                        if((lifeForm[i].position.left === theTarget.position.left) && (lifeForm[i].position.top === theTarget.position.top)){
                            // Eat the leaf.
                            this.eat(creature, i);
                        }
                    } else {
                        lifeFormArray = lifeForm.slice();
                        lifeFormArray[i].target = "";
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
                // If there is no leaf close by...
                else {
                    this.searchForFood(creature, i);
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
                }

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

    // Search for Food Logic
    searchForFood(creature, index) {
        // Create shortcuts for data
        if(creature === "herbie"){
            var { herbies: lifeForm, leaves: food } = this.state;
        } else if(creature === "carnie"){
            var { carnies: lifeForm, herbies: food } = this.state;
        }

        // Total sensing range
        var sensingDistance = Math.sqrt((Math.pow(lifeForm[index].sense.sight, 2)) + (Math.pow(lifeForm[index].sense.sight, 2)));
        // Check through food array
        for(var i = 0; i < food.length; i++){
            // Compare top distance of lifeForm and food
            var topDistanceToFood = lifeForm[index].position.top - food[i].position.top;
            // Compare left distance of lifeForm and food
            var leftDistanceToFood = lifeForm[index].position.left - food[i].position.left;
            // Figure out distance from food
            var distanceToFood = Math.sqrt((Math.pow(topDistanceToFood, 2)) + (Math.pow(leftDistanceToFood, 2)));
            // If the distance to the food is witin sensing range
            if(distanceToFood < sensingDistance){
                var lifeFormArray = lifeForm.slice();
                lifeFormArray[index].target = food[i].key;
                if(creature === "herbie"){
                    this.setState({
                        herbies: lifeFormArray
                    });
                } else if(creature === "carnie"){
                    this.setState({
                        carnies: lifeFormArray
                    });
                }
                return;
            }
        }
    }

    // Herbie leave eating logic
    eat(creature, index) {
        if(creature === "herbie"){
            var { herbies: eatingLifeForm, leaves: food } = this.state;
        } else if(creature === "carnie"){
            var { carnies: eatingLifeForm, herbies: food } = this.state;
        }


        var theTarget;
        for(var b = 0; b < food.length; b++){
            if(food[b].key === eatingLifeForm[index].target){
                theTarget = b;
                
            }
        }

        var foodArray = food;
        var lifeFormArray = eatingLifeForm;
        lifeFormArray[index].target = "";
        lifeFormArray[index].health += food[theTarget].nutrition;
        foodArray.splice(theTarget, 1);
        
        
        if(creature === "herbie"){
            this.setState({
                herbies: lifeFormArray,
                leaves: foodArray
            });
        } else if(creature === "carnie"){
            this.setState({
                carnies: lifeFormArray,
                herbies: foodArray
            });
        }
    }

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
            () => this.move("herbie"), 100
        );
        this.startCarnie = setInterval(
            () => this.move("carnie"), 150
        );
    }

    componentWillUnmount() {
        clearInterval(this.startHerbie);
        clearInterval(this.startCarnie);
    }
};