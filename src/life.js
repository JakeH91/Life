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
            leaves: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    // Initialize game
    startGame() {
        // Start the flow of time
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
        
        // Generate life forms according to props
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

    // Add 1 to timeElapsed
    updateTime() {
        const { timeElapsed } = this.state;
        this.setState({
            timeElapsed: timeElapsed + 0.5
        });
        this.changeLighting();
    }

    changeLighting() {
        var time = (Math.floor(this.state.timeElapsed)) % 24;
        var backgroundStyle, r, g, b;
        var addition = Math.floor(255/12);
        var gAddition = Math.floor(230/12);
        var bAddition = Math.floor(255/12);
        if(time > 0 && time < 13){ 
            r = 0;
            g = 0;
            b = 0;
            r += (addition * time);
            g += (addition * time);
            b += (addition * time);
        } else if(time > 12){
            r = 255;
            g = 255;
            b = 255;
            r -= (addition * (time - 12));
            g -= (addition * (time - 12));
            b -= (addition * (time - 12));
        } else if(time === 0){
            r = 0;
            g = 0;
            b = 0;
        }

        backgroundStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        document.body.style.backgroundColor = backgroundStyle;
    }

    generateLeaf(i) {
        // Get random coordinates
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        
        // Create new leaf object with random coordinates
        var newLeaf = { 
            key: "leaf" + i,
            position: {
                top: top,
                left: left
            },
            nutrition: 100
        };

        // Copy the leaves array and push the new leaf to the end of that array
        var leavesArray = this.state.leaves;
        leavesArray.push(newLeaf);

        // Set the state to the altered, copied array
        this.setState({
            leaves: leavesArray
        });
    }

    generateHerbie(i) {
        // Randomly generate stats
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var randomSize = Math.floor(Math.random() * 20) + 20;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var randomSpeed = Math.floor(Math.random() * 2)+ 1;
        var randomNutrition = randomSize * 10;
        var randomHealth = Math.floor(Math.random() * 400) + 10;

        // Create new herbie object with random stats
        var newHerbie = {
            key: "herbie" + i,
            position: { top: top, left: left },
            size: randomSize,
            sense: { sight: randomSight },
            speed: randomSpeed,
            nutrition: randomNutrition,
            health: randomHealth,
            dead: false,
            target: "",
            image: 0
        }

        // Copy the herbies array and push the new herbie to the end of that array
        var herbiesArray = this.state.herbies;
        herbiesArray.push(newHerbie);

        // Set the state to the altered, copied array
        this.setState({
            herbies: herbiesArray
        });
    }

    generateCarnie(i) {
        // Randomly generate stats
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var randomSize = Math.floor(Math.random() * 20) + 20;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var randomSpeed = Math.random() + 0.5;
        var randomNutrition = randomSize * 10;
        var randomHealth = Math.floor(Math.random() * 400) + 10;

        // Create new carnie object with random stats
        var newCarnie = {
            key: "carnie" + i,
            position: { top: top, left: left },
            size: randomSize,
            sense: { sight: randomSight },
            speed: randomSpeed,
            nutrition: randomNutrition,
            health: randomHealth,
            dying: false,
            target: "",
            image: 0
        }

        // Copy the carnies array and push the new carnie to the end of that array
        var carniesArray = this.state.carnies;
        carniesArray.push(newCarnie);

        // Set the state to the altered, copied array
        this.setState({
            carnies: carniesArray
        });

    }
    
    // Creature movement logic
    move(creature) {
        // Set the lifeForm and food variables depending on the creature
        if(creature === "herbie"){
            var { herbies: lifeForm, leaves: food } = this.state;

        } else if(creature === "carnie"){
            var { carnies: lifeForm, herbies: food } = this.state;
        }
        
        // Cycle through all instances of that creature
        for(var i = 0; i < lifeForm.length; i++){
            // If it isn't dead...
            if(!lifeForm[i].dead){
                // Minus 7 health point
                var newHealth = lifeForm[i].health - 7;
                var lifeFormArray = lifeForm.slice();
                lifeFormArray[i].health = newHealth;
                
                // Update the health of that creature
                if(creature === "herbie"){
                    this.setState({
                        herbies: lifeFormArray
                    });
                } else if(creature === "carnie"){
                    this.setState({
                        carnies: lifeFormArray
                    });
                }
                
                // If health drops below 0, the creature dies
                if(lifeForm[i].health <= 0){
                    this.die(creature, i);
                }
                // If health is still above 0...
                else {
                    var topDirection, leftDirection;
                    // If the creature has a target locked...
                    if(lifeForm[i].target){
                        var theTarget = undefined;
                        // Set theTarget equal to the object of whatever it is targeting
                        for(var a = 0; a < food.length; a++){
                            if(food[a].key === lifeForm[i].target){
                                theTarget = food[a];  
                            }
                        }
                        // If that target still exists (and hasn't been eaten or decayed to nothing)
                        if(theTarget){
                            // Set difference between top positions of creature and food to topDifference
                            var topDifference = lifeForm[i].position.top - theTarget.position.top;
                            // Set difference between left positions of creature and food to leftDifference
                            var leftDifference = lifeForm[i].position.left - theTarget.position.left;


                            // If it's on the same y-axis, no need to changein that direction.
                            if(topDifference === 0 || Math.abs(topDifference) < lifeForm[i].speed){
                                topDirection = topDifference;
                            } 
                            // If it's below, move downwards.
                            else if(topDifference < 0) {
                                topDirection = lifeForm[i].speed;
                            } 
                            // If it's above, move upwards.
                            else if(topDifference > 0) {
                                topDirection = -(lifeForm[i].speed);
                            }

                            // If it's on the same x-axis, no need to change in that direction.
                            if(leftDifference === 0 || Math.abs(leftDifference) < lifeForm[i].speed){
                                leftDirection = leftDifference;
                            }
                            // If it's to the right, move right.
                            else if(leftDifference < 0) {
                                leftDirection = lifeForm[i].speed;
                            }
                            // If it's to the left, move left.
                            else if(leftDifference > 0) {
                                leftDirection = -(lifeForm[i].speed);
                            }
                            // If with that last movement you landed on the leaf
                            if((topDifference === 0) && (leftDifference === 0)){
                                // Eat the leaf.
                                this.eat(creature, i);
                            }
                        } 
                        // If the target no longer exists...
                        else {
                            // Remove the target from the creature's object
                            lifeFormArray = lifeForm.slice();
                            lifeFormArray[i].target = "";
                            // And update the state accordingly.
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
                    // If the creature has no target...
                    else {
                        // Generate random numbers
                        topDirection = Math.floor(Math.random() * 2);
                        leftDirection = Math.floor(Math.random() * 2);
                        // If topDirection random number is 0, and the creature is not at the top of the board
                        // (Or the creature is at the bottom or the board)
                        if((topDirection < 1 && lifeForm[i].position.top !== 0) || lifeForm[i].position.top === 100) {
                            // Move upwards.
                            topDirection = -(lifeForm[i].speed);
                        } 
                        // Otherwise, if topDirection random number is 1,
                        else {
                            // Move downwards.
                            topDirection = lifeForm[i].speed;
                        }

                        // If leftDirection random number is 0, and the creature is not at the absolute left of the board
                        // (Or the creature is at the absolute right or the board)
                        if((leftDirection < 1 && lifeForm[i].position.left !== 0) || lifeForm[i].position.left === 100) {
                            // Move left
                            leftDirection = -(lifeForm[i].speed);
                        } 
                        // Otherwise, if leftDirection random number is 1,
                        else {
                            // Mover right
                            leftDirection = lifeForm[i].speed;
                        }
                        // Look for a target
                        this.searchForFood(creature, i);
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
            // If the creature is dead...
            else {
                // Decay a bit more.
                var death = this.decay(creature, i);
                // If the creature is fully decayed, the creature is removed,
                if(death){
                    // And we exit the loop.
                    return;
                }
            }
        }
    }



    // Search for Food Logic
    searchForFood(creature, index) {
        // Set the lifeForm and food variables depending on the creature
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
            // If the distance to the food is within sensing range...
            if(distanceToFood < sensingDistance){
                // Add the food's key to the creatures target...
                var lifeFormArray = lifeForm.slice();
                lifeFormArray[index].target = food[i].key;
                // And update the state accordingly.
                if(creature === "herbie"){
                    this.setState({
                        herbies: lifeFormArray
                    });
                } else if(creature === "carnie"){
                    this.setState({
                        carnies: lifeFormArray
                    });
                }
                // Exit the loop
                return;
            }
        }
    }

    // Eating logic
    eat(creature, index) {
        var theTargetSpecies;
        // Set the lifeForm, food and target species variables depending on the creature
        if(creature === "herbie"){
            var { herbies: eatingLifeForm, leaves: food } = this.state;
            theTargetSpecies = "leaf";
        } else if(creature === "carnie"){
            var { carnies: eatingLifeForm, herbies: food } = this.state;
            theTargetSpecies = "herbie";
        }

        var theTargetIndex;
        var lifeFormArray = eatingLifeForm;
        
        // Loop through food array
        for(var b = 0; b < food.length; b++){
            // If the food item at current index has a key that is equal to the creatures target
            if(food[b].key === eatingLifeForm[index].target){
                // Set theTargetIndex to current index
                theTargetIndex = b;
                // Add the available nutrition to the creature
                lifeFormArray[index].health += food[theTargetIndex].nutrition;
                // And remove the target from it's array
                this.remove(theTargetSpecies, theTargetIndex);
            } 
        }

        // Reset the creature's target
        lifeFormArray[index].target = "";
        if(creature === "herbie"){
            this.setState({
                herbies: lifeFormArray,
            });
        } else if(creature === "carnie"){
            this.setState({
                carnies: lifeFormArray,
            });
        }
    }

    die(creature, i) {
        // Set the lifeForm variable depending on the creature
        if(creature === "herbie"){
            var { herbies: lifeForm } = this.state;
        } else if(creature === "carnie"){
            var { carnies: lifeForm } = this.state;
        }

        // Update the dead variable of the creature to true
        var lifeFormArray = lifeForm.slice();
        lifeFormArray[i].dead = true;
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

    decay(creature, i) {
        // Set the lifeForm variable depending on the creature
        if(creature === "herbie"){
            var { herbies: lifeForm } = this.state;
        } else if(creature === "carnie"){
            var { carnies: lifeForm } = this.state;
        }

        // Change the image (every other run through) and take away some nutrition
        var lifeFormArray = lifeForm.slice();
        lifeFormArray[i].image += 0.5;
        lifeFormArray[i].nutrition -= 50;
        
        // If the creature has cycled through all decay images
        if(lifeFormArray[i].image > 4.5){
            // Remove the creature from it's array and leave the function
            this.remove(creature, i);
            return true;
        }

        // If the creature has not finished the decaying process...
        else {
            // Applied the updated values of image and nutrition
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

    remove(creature, i) {
        // Set the lifeForm variable depending on the creature
        if(creature === "herbie"){
            var { herbies: lifeForm } = this.state;
        } else if(creature === "carnie"){
            var { carnies: lifeForm } = this.state;
        } else if(creature === "leaf"){
            var { leaves: lifeForm } = this.state;
        }

        // Remove that creature from a copy of the array
        var lifeFormArray = lifeForm.slice();
        lifeFormArray.splice(i, 1);

        // Update the state accordingly
        if(creature === "herbie"){
            this.setState({
                herbies: lifeFormArray
            });
            // If the last herbie has just been removed, stop the process for moving herbies
            if(this.state.herbies.length < 1){
                clearInterval(this.startHerbie);
            }
        } else if(creature === "carnie"){
            this.setState({
                carnies: lifeFormArray
            });
            // If the last carnie has just been removed, stop the process for moving carnies
            if(this.state.carnies.length < 1){
                clearInterval(this.startCarnie);
            }
        } else if(creature === "leaf"){
            this.setState({
                leaves: lifeFormArray
            });
        }
    }

    // When start button is pressed
    handleClick(){
        // Start the game, get the creatures moving
        this.startGame();
        this.startHerbie = setInterval(
            () => this.move("herbie"), 100
        );
        this.startCarnie = setInterval(
            () => this.move("carnie"), 100
        );
        // And hide the button
        var button = document.getElementById("startButton");
        button.style.display = "none"
    }

    render() {
        return(
            <div>
                <button id="startButton" onClick={this.handleClick}>CREATE LIFE!</button>
                {this.state.herbies.map(herbie =>
                    <Herbie size={herbie.size} top={herbie.position.top} left={herbie.position.left} key={herbie.key} image={herbie.image} />
                )}
                {this.state.carnies.map(carnie =>
                    <Carnie size={carnie.size} top={carnie.position.top} left={carnie.position.left} key={carnie.key} image={carnie.image} />
                )}
                {this.state.leaves.map(leaf =>
                    <Leaf top={leaf.position.top} left={leaf.position.left} key={leaf.key} />
                )}
            </div>
            
        );
    } 

    componentWillUnmount() {
        clearInterval(this.startHerbie);
        clearInterval(this.startCarnie);
    }
};