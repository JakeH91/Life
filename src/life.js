import React from 'react';
import Herbie from './herbie.js';
import Carnie from './carnie.js';
import Leaf from './leaf.js';
import Background from './background.js';
import Leaderboard from './leaderboard.js';

const creatureMinSize = 15;
const creatureMaxSize = 35;
var totalLifeForms = {
    herbies: 0,
    carnies: 0,
    leaves: 0
};

function documentHeight() {
    return Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
}

function documentWidth() {
    return Math.max(
        document.documentElement.clientWidth,
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth
    );
}

export default class Life extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
        this.handleClick = this.handleClick.bind(this);
    }

    getInitialState() {
        const initialState = {
            // Time since beginning
            timeElapsed: 0,
            // Initialize lifeform arrays
            herbies: [],
            carnies: [],
            leaves: []
        };
        return initialState;
    }

    // Initialize game
    startGame() {
        // Generate life forms according to props
        for(var i = 0; i < this.props.numLeaves; i++) {
            this.generateLeaf();
        }
        for(var j = 0; j < this.props.numHerbies; j++) {
            this.generateHerbie();
        }
        for(var k = 0; k < this.props.numCarnies; k++) {
            this.generateCarnie();
        }
        // Start the flow of time
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
        
        this.movementInterval = setInterval(() => this.updateGame(), 100);
    }

    endGame() {
        this.setState(this.getInitialState());
        clearInterval(this.timeInterval);
        clearInterval(this.movementInterval);
        var button = document.getElementById("startButton");
        button.style.display = "initial";
        var leaderBoard = document.getElementById("leaderBoard");
        leaderBoard.style.display = "none";
    }

    generateLeaf() {
        // Get random coordinates
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        // Create new leaf object with random coordinates
        var newLeaf = { 
            key: "leaf" + totalLifeForms.leaves,
            position: {
                top: top,
                left: left
            },
            health: 50,
            nutrition: 50,
            defence: 0,
            species: "leaf"
        };

        totalLifeForms.leaves++;

        // Copy the leaves array and push the new leaf to the end of that array
        var leavesArray = this.state.leaves;
        leavesArray.push(newLeaf);

        // Set the state to the altered, copied array
        this.setState({
            leaves: leavesArray
        });
    }

    generateHerbie() {
        // Randomly generate stats
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var startingSize = creatureMinSize;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var sightLoss = (randomSight*7.5)/100;
        var randomSpeed = Math.floor(Math.random() * 2)+ 1;
        var startingHealth = startingSize * 15;
        var startingNutrition = startingHealth + 100;
        // Create new herbie object with random stats
        
        var newHerbie = {
            key: "herbie" + totalLifeForms.herbies,
            position: { top: top, left: left },
            size: startingSize,
            species: "herbie",
            age: 0,
            sense: { 
                sight: randomSight,
                sightLoss: sightLoss
            },
            speed: randomSpeed,
            nutrition: startingNutrition,
            health: startingHealth,
            foodTarget: null,
            pregnant: false,
            mateTarget: null,
            activePredator: null,
            dead: false,
            image: 0
        }

        // Copy the herbies array and push the new herbie to the end of that array
        var herbiesArray = this.state.herbies;
        herbiesArray.push(newHerbie);
        totalLifeForms.herbies++;

        // Set the state to the altered, copied array
        this.setState({
            herbies: herbiesArray
        });
    }

    generateCarnie() {
        // Randomly generate stats
        var top = Math.floor(Math.random() * 100);
        var left = Math.floor(Math.random() * 100);
        var startingSize = creatureMinSize;
        var randomSight = Math.floor(Math.random() * 10) + 10;
        var sightLoss = (randomSight*7.5)/100;
        var randomSpeed = Math.floor(Math.random() * 2)+ 1;
        var startingHealth = startingSize * 25;
        var startingNutrition = startingHealth + 100;

        // Create new carnie object with random stats   
        var newCarnie = {
            key: "carnie" + totalLifeForms.carnies,
            position: { top: top, left: left },
            size: startingSize,
            species: "carnie",
            age: 0,
            sense: { 
                sight: randomSight,
                sightLoss: sightLoss
            },
            speed: randomSpeed,
            nutrition: startingNutrition,
            health: startingHealth,
            foodTarget: null,
            pregnant: false,
            mateTarget: null,
            activePredator: null,
            dying: false,
            image: 0
        }

        // Copy the carnies array and push the new carnie to the end of that array
        var carniesArray = this.state.carnies;
        carniesArray.push(newCarnie);
        totalLifeForms.carnies++;

        // Set the state to the altered, copied array
        this.setState({
            carnies: carniesArray
        });
    }


    // Add 1 to timeElapsed
    updateTime() {
        const { timeElapsed } = this.state;
         if(this.state.timeElapsed > 0){
            const { herbies, carnies } = this.state;
            
            var copyHerbies = this.state.herbies.slice();
            if(herbies.length > 0){
                for(var i = 0; i < herbies.length; i++){
                    copyHerbies[i].age += 1;
                }
            }
            
            var copyCarnies = carnies.slice();
            if(carnies.length > 0){
                for(var j = 0; j < carnies.length; j++){
                    copyCarnies[j].age += 1;
                }
            }
            
            this.setState({
                timeElapsed: timeElapsed + 1,
                herbies: copyHerbies,
                carnies: copyCarnies
            });
        } else {
            this.setState({
                timeElapsed: timeElapsed + 1,
            });
        }

        var time = this.state.timeElapsed % 24;
        if(this.state.leaves.length < this.props.numLeaves) {
            var keyNumber = Math.random();
            this.generateLeaf(keyNumber);
        }
        this.changeVision(time);
    }

    changeVision(time) {
        var { herbies, carnies } = this.state;
        for(var i = 0; i < herbies.length; i++){
            var tempHerbies = herbies.slice();
            var herbieSight = tempHerbies[i].sense.sight;
            if(time > 0 && time < 13){
                herbieSight -= tempHerbies[i].sense.sightLoss;
            } else if (time > 12){
                herbieSight += tempHerbies[i].sense.sightLoss;
            }
            tempHerbies[i].sense.sight = herbieSight;
            this.setState({
                herbies: tempHerbies
            });
        }
        for(var j = 0; j < carnies.length; j++){
            var tempCarnies = carnies.slice()
            var carnieSight = tempCarnies[j].sense.sight;
            if(time > 0 && time < 13){
                carnieSight -= tempCarnies[j].sense.sightLoss;
            } else if (time > 12){
                carnieSight += tempCarnies[j].sense.sightLoss;
            }
            tempCarnies[j].sense.sight = carnieSight;
            this.setState({
                carnies: tempCarnies
            });
        }
    }


    updateGame() {
        var copyHerbies = this.state.herbies.slice();
        var herbieRemovals = [];
        var copyCarnies = this.state.carnies.slice();
        var carnieRemovals = [];
        var copyLeaves = this.state.leaves.slice();
        var leafRemovals = [];

        for(var i = 0; i < this.state.herbies.length; i++){
            var tempHerbiesObject = this.decide(copyHerbies[i]);
            if(tempHerbiesObject.toRemove){ // If this herbie is to be removed
                herbieRemovals.push(i); // Add the index to the removals array
            } else { // Otherwise
                copyHerbies[i] = tempHerbiesObject.lifeForm; // Update this herbie's attributes
            }
            if(tempHerbiesObject.toEat !== -1){
                leafRemovals.push(tempHerbiesObject.toEat);
            }
        }

        var newLeavesArray = this.remove(copyLeaves, leafRemovals);
        var newHerbiesArray = this.remove(copyHerbies, herbieRemovals);
        copyHerbies = newHerbiesArray.slice();
        herbieRemovals = [];

        for(var j = 0; j < this.state.carnies.length; j++){
            var tempCarniesObject = this.decide(copyCarnies[j]);
            if(tempCarniesObject.toRemove){ // If this carnie is to be removed
                carnieRemovals.push(j); // Add the index to the removals array
            } else { // Otherwise
                copyCarnies[j] = tempCarniesObject.lifeForm; // Update this carnie's attributes
            }
            if(tempCarniesObject.toEat !== -1){
                herbieRemovals.push(tempCarniesObject.toEat);   
            }
        }

        newHerbiesArray = this.remove(copyHerbies, herbieRemovals);

        // Return arrays with any fully decayed creatures removed
        var newCarniesArray = this.remove(copyCarnies, carnieRemovals);

        this.setState({
            herbies: newHerbiesArray,
            carnies: newCarniesArray,
            leaves: newLeavesArray
        });

        if(this.state.herbies.length < 1 && this.state.carnies.length < 1){
            this.endGame();
        }
    }

    decide(lifeForm) {
        var decision;
        if(!lifeForm.dead){
            if(lifeForm.sense.sight > 3){
                lifeForm.image = 0;
                lifeForm.health -= 4;
                lifeForm.nutrition -= 4;
                if(lifeForm.activePredator){
                    console.log(lifeForm.species + " is running away!!!");
                    decision = this.escape(lifeForm);
                } else if((!lifeForm.pregnant) && (lifeForm.age > 3) && this.searchForMate(lifeForm)) { // searchForFood returns true or false
                    console.log(lifeForm.species + " is following a potential mate.");
                    decision = this.trackMate(lifeForm);
                } else if(lifeForm.foodTarget) { // searchForFood returns true or false
                    decision = this.hunt(lifeForm);
                }  else {
                    // lifeForm.activePredator = this.checkForEnemies(lifeForm);
                    // if(!lifeForm.activePredator){
                    //     lifeForm.foodTarget = this.searchForFood(lifeForm);
                    //     lifeForm.mateTarget = this.searchForMate(lifeForm);
                    // }
                    lifeForm.foodTarget = this.searchForFood(lifeForm);
                    
                    decision = this.moveRandomly(lifeForm);
                    
                    
                    
                }
            } else{
                lifeForm.health -= 1;
                lifeForm.nutrition -= 1;
                decision = this.sleep(lifeForm);
            }
            if(lifeForm.health <= 0){
                lifeForm.health = 0;
                lifeForm.dead = true;
                decision.lifeForm = lifeForm;
            }
        } else {
            
            decision = this.decay(lifeForm);
        }

        if(lifeForm.species === "herbie"){
            if(lifeForm.health > 2000){
                lifeForm.size = creatureMaxSize;
            }
            else if(lifeForm.health > 400) {
                lifeForm.size = lifeForm.health/20;
            }
            else{
                lifeForm.size = creatureMinSize;
            }
            decision.lifeForm = lifeForm;
        } else if(lifeForm.species === "carnie"){
            if(lifeForm.health > 2000){
                lifeForm.size = creatureMaxSize;
            }
            else if(lifeForm.health > 400) {
                lifeForm.size = lifeForm.health/20;
            }
            else{
                lifeForm.size = creatureMinSize;
            }
            decision.lifeForm = lifeForm;
        }
        

        return {
            lifeForm: decision.lifeForm,
            toRemove: decision.toRemove,
            toEat: decision.toEat
        };


    }
    
    checkForEnemies() {
        // Logic to be added
        return null;
    }

    defend() {
        // Logic to be added
    }
    
    escape() {
        // Logic to be added
    }

    searchForFood(lifeForm) {
        var sensingDistance = Math.sqrt((Math.pow(lifeForm.sense.sight, 2)) + (Math.pow(lifeForm.sense.sight, 2)));
        var food;
        if(lifeForm.species === "herbie"){
            food = this.state.leaves;
        } else if(lifeForm.species === "carnie"){
            food = this.state.herbies;
        }

        var shortestDistance = sensingDistance;
        var target = null;
        for(var i = 0; i < food.length; i++){
            var topDistanceToFood = lifeForm.position.top - food[i].position.top;
            var leftDistanceToFood = lifeForm.position.left - food[i].position.left;
            var distanceToFood = Math.sqrt((Math.pow(topDistanceToFood, 2)) + (Math.pow(leftDistanceToFood, 2)));
            
            if(distanceToFood < shortestDistance){
                shortestDistance = distanceToFood;
                target = food[i];
            }
        }
        return target;
    }

    hunt(lifeForm) {
        // Logic to be added
        var theTarget = lifeForm.foodTarget;
        var targetIndex;

        if(theTarget){
            var topDirection, leftDirection;
            //Set difference between top positions of creature and food to topDifference
            var topDifference = lifeForm.position.top - theTarget.position.top;
            // Set difference between left positions of creature and food to leftDifference
            var leftDifference = lifeForm.position.left - theTarget.position.left;

            var heightAsPercentage = (lifeForm.size * 100)/documentHeight();
            var widthAsPercentage = (lifeForm.size * 100)/documentWidth();

            // If it's on the same y-axis, no need to changein that direction.
            if(topDifference === 0 || Math.abs(topDifference) < lifeForm.speed){
                topDirection = topDifference;
            } 
            // If it's below, move downwards.
            else if(topDifference < 0) {
                topDirection = lifeForm.speed;
            } 
            // If it's above, move upwards.
            else if(topDifference > 0) {
                topDirection = -(lifeForm.speed);
            }

            // If it's on the same x-axis, no need to change in that direction.
            if(leftDifference === 0 || Math.abs(leftDifference) < lifeForm.speed){
                leftDirection = leftDifference;
            }
            // If it's to the right, move right.
            else if(leftDifference < 0) {
                leftDirection = lifeForm.speed;
            }
            // If it's to the left, move left.
            else if(leftDifference > 0) {
                leftDirection = -(lifeForm.speed);
            }

            var newTopState = lifeForm.position.top + topDirection;
            var newLeftState = lifeForm.position.left + leftDirection;
            
            lifeForm.position = {top: newTopState, left: newLeftState};
            var toEat = "";
            // If with that last movement you landed on the target
            if((Math.abs(topDifference) < (heightAsPercentage/2)) && (Math.abs(leftDifference) < (widthAsPercentage/2))){
                // Damage it.
                if(lifeForm.species === "herbie"){
                    targetIndex = this.state.leaves.indexOf(theTarget);
                } else if(lifeForm.species === "carnie"){
                    targetIndex = this.state.herbies.indexOf(theTarget);
                }

                theTarget.health -= 50;
                theTarget.nutrition -= 50;
                lifeForm.health += 50;
                lifeForm.nutrition += 50;
                

                if(theTarget.health <= 0){
                    toEat = targetIndex;
                    lifeForm.foodTarget = null;
                    lifeForm.health += theTarget.nutrition;
                    lifeForm.nutrition += theTarget.nutrition;
                }
                
                
            }
        } else {
            lifeForm.foodTarget = null;
        }

        return {
            lifeForm: lifeForm,
            toRemove: false,
            toEat: toEat
        }
    }

    searchForMate() {
        // Logic to be added
        return null;
    }

    trackMate() {
        // Logic to be added
    }

    mate() {
        // Logic to be added
    }
    
    moveRandomly(lifeForm){
        var topDirection = Math.floor(Math.random() * 2);
        var leftDirection = Math.floor(Math.random() * 2);
        // If topDirection random number is 0, and the creature is not at the top of the board
        // (Or the creature is at the bottom or the board)
        if((topDirection < 1 && !(lifeForm.position.top <= lifeForm.speed)) || lifeForm.position.top >= (100 - lifeForm.speed)) {
            topDirection = -(lifeForm.speed); // Move upwards.
        } else { // Otherwise, if topDirection random number is 1,
            topDirection = lifeForm.speed; // Move downwards.
        }

        // If leftDirection random number is 0, and the creature is not at the absolute left of the board
        // (Or the creature is at the absolute right or the board)
        if((leftDirection < 1 && !(lifeForm.position.left <= lifeForm.speed)) || lifeForm.position.left >= (100 - lifeForm.speed)) {
            leftDirection = -(lifeForm.speed); // Move left
        } else { // Otherwise, if leftDirection random number is 1,
            leftDirection = lifeForm.speed; // Move right
        }

        var newTopState = lifeForm.position.top + topDirection;
        var newLeftState = lifeForm.position.left + leftDirection;
        
        lifeForm.position = {top: newTopState, left: newLeftState};

        return {
            lifeForm: lifeForm,
            toRemove: false,
            toEat: -1
        }
    }

    sleep(lifeForm) {
        if(lifeForm.image === 0 || lifeForm.image === 8.75){
            lifeForm.image = 5;
        } else {
            lifeForm.image += 0.25;
        }

        return {
            lifeForm: lifeForm,
            toRemove: false,
            toEat: -1
        }
    }

    decay(lifeForm) {
        var toRemove = false;
        if(lifeForm.image >= 5){
            lifeForm.image = 0.5;
        } else if(lifeForm.image < 4.5){
            lifeForm.image += 0.5;
        } else if(lifeForm.image === 4.5){
            toRemove = true;
        }

        lifeForm.nutrition -= 30;

        return {
            lifeForm: lifeForm,
            toRemove: toRemove,
            toEat: -1
        }
    }
    
    remove(array, removals) {
        removals.sort(function(a, b){return b-a});
        for(var i = 0; i < removals.length; i++){
            for(var j = 0; j < array.length; j++){
                if(removals[i] === j){
                    array.splice(j, 1);
                }
            }
        }
        return array;
    }

    // When start button is pressed
    handleClick(){
        this.startGame();
        // And hide the button
        var button = document.getElementById("startButton");
        button.style.display = "none";
        var leaderBoard = document.getElementById("leaderBoard");
        leaderBoard.style.display = "inline-block";
    }

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

        return(
            <div>
                <button id="startButton" onClick={this.handleClick} style={buttonStyle}>CREATE LIFE</button>
                {this.state.herbies.map(herbie =>
                    <Herbie size={herbie.size} top={herbie.position.top} left={herbie.position.left} key={herbie.key} image={herbie.image} />
                )}
                {this.state.carnies.map(carnie =>
                    <Carnie size={carnie.size} top={carnie.position.top} left={carnie.position.left} key={carnie.key} image={carnie.image} />
                )}
                {this.state.leaves.map(leaf =>
                    <Leaf top={leaf.position.top} left={leaf.position.left} key={leaf.key} />
                )}
                <Background time={this.state.timeElapsed} />
                <Leaderboard carnies={this.state.carnies} herbies={this.state.herbies} />
            </div>
            
        );
    } 

    componentWillUnmount() {
        clearInterval(this.startHerbie);
        clearInterval(this.startCarnie);
    }
};