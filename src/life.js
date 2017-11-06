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
            health: 100,
            nutrition: 100,
            defence: 0,
            species: "leaf",
            activePredator: null
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
            energy: 100,
            defence: 25,
            attack: 50,
            foodTarget: null,
            pregnant: false,
            mateTarget: null,
            activePredator: null,
            dead: false,
            isAwake: true,
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
            energy: 100,
            defence: 50,
            attack: 50,
            foodTarget: null,
            pregnant: false,
            mateTarget: null,
            activePredator: null,
            dead: false,
            isAwake: true,
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
            this.generateLeaf();
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
        var foodIndex = -1;
        var decision;
        if(!lifeForm.dead){
            if(lifeForm.sense.sight > 3 && lifeForm.isAwake && lifeForm.energy > 10){
                lifeForm.image = 0;
                lifeForm.health -= 4;
                lifeForm.nutrition -= 4;
                
                if(lifeForm.species === "herbie"){
                    lifeForm.activePredator = this.checkForEnemies(lifeForm);
                }
                if(lifeForm.activePredator){
                    decision = this.escape(lifeForm);
                } 

                // else if((!lifeForm.pregnant) && (lifeForm.age > 3) && this.searchForMate(lifeForm)) { // searchForFood returns true or false
                //     console.log(lifeForm.species + " is following a potential mate.");
                //     decision = this.trackMate(lifeForm);
                // } 
                else if(lifeForm.energy < 200 || lifeForm.health < 1000) { // searchForFood returns true or false
                    lifeForm.foodTarget = this.searchForFood(lifeForm);
                    if(lifeForm.foodTarget){
                        decision = this.hunt(lifeForm);
                    }
                    else {
                        decision = this.moveRandomly(lifeForm);
                    }
                }
                else {
                    lifeForm.energy += 0.5;
                    // lifeForm.mateTarget = this.searchForMate(lifeForm);
                    
                    // var search = this.searchForFood(lifeForm);
                    // lifeForm.foodTarget = search.target;
                    // foodIndex = search.index;
                    // if(search.index !== -1){
                    //     console.log(lifeForm.key + " has set his target to " + search.target.key);
                    // } else {
                    //     console.log(lifeForm.key + " will need to keep searching.");
                    // }

                    decision = this.moveRandomly(lifeForm);
                    
                    
                    
                }
            } 
            else{
                lifeForm.health -= 0.1;
                lifeForm.nutrition -= 1;
                lifeForm.energy += 1;
                decision = this.sleep(lifeForm);
            }
            if(lifeForm.health <= 0){
                lifeForm.health = 0;
                lifeForm.dead = true;
                decision.lifeForm = lifeForm;
            }
            if(lifeForm.energy < 0){
                lifeForm.energy = 0;
            } else if(lifeForm.energy > 300) {
                lifeForm.energy = 300;
            }
        } 
        else {    
            decision = this.decay(lifeForm);
        }

        if(lifeForm.health > 700){
            lifeForm.size = creatureMaxSize;
        }
        else if(lifeForm.health > 400) {
            lifeForm.size = lifeForm.health/20;
        }
        else{
            lifeForm.size = creatureMinSize;
        }

        decision.lifeForm = lifeForm;
                
        

        return {
            lifeForm: decision.lifeForm,
            toRemove: decision.toRemove,
            toEat: decision.toEat,
            foodIndex: foodIndex
        };


    }
    
    checkForEnemies(lifeForm) {
        // Logic to be added
        var sensingDistance = Math.sqrt((Math.pow(lifeForm.sense.sight, 2)) + (Math.pow(lifeForm.sense.sight, 2)));
        var enemyType;
        if(lifeForm.species === "herbie"){
            enemyType = this.state.carnies;
        } else if(lifeForm.species === "carnie"){
            return null;
        }

        var shortestDistance = sensingDistance;
        var enemy = null;
        for(var i = 0; i < enemyType.length; i++){
            var topDistanceToEnemy = lifeForm.position.top - enemyType[i].position.top;
            var leftDistanceToEnemy = lifeForm.position.left - enemyType[i].position.left;
            var distanceToEnemy = Math.sqrt((Math.pow(topDistanceToEnemy, 2)) + (Math.pow(leftDistanceToEnemy, 2)));
            
            if(distanceToEnemy < shortestDistance){
                shortestDistance = distanceToEnemy;
                enemy = enemyType[i];
            }
        }
        if(enemy !== lifeForm.activePredator && lifeForm.activePredator !== null){
            lifeForm.defence += 5;
        }
        
        return enemy
    }

    defend() {
        // Logic to be added
    }
    
    escape(lifeForm) {
        // Logic to be added
        var theEnemy = lifeForm.activePredator;
        var heightAsPercentage = (lifeForm.size * 100)/documentHeight();
        var widthAsPercentage = (lifeForm.size * 100)/documentWidth();

        var tempSpeed = lifeForm.speed;
        if(lifeForm.energy > 50){
            tempSpeed *= 1.5;
            lifeForm.energy -= 2;
        } else{
            lifeForm.energy -= 1;
        }
       
        var topDirection = 0;
        var leftDirection = 0;
        //Set difference between top positions of creature and food to topDifference
        var topDifference = lifeForm.position.top - theEnemy.position.top;
        // Set difference between left positions of creature and food to leftDifference
        var leftDifference = lifeForm.position.left - theEnemy.position.left;


        // If it's on the same y-axis, choose a random direction
        if(topDifference === 0){
            var upOrDown = Math.floor(Math.random() * 2);
            if(upOrDown && lifeForm.position.top > (tempSpeed + (heightAsPercentage/2))){
                topDirection = -(tempSpeed);
            } else if(lifeForm.position.top < (100-(tempSpeed + (heightAsPercentage/2)))){
                topDirection = tempSpeed;
            }
        }
        // If it's below, move upwards.
        else if(topDifference < 0  && lifeForm.position.top > (tempSpeed + (heightAsPercentage/2))) {
            topDirection = -(tempSpeed);
        } 
        // If it's above, move downwards.
        else if(topDifference > 0 && lifeForm.position.top < (100-(tempSpeed + (heightAsPercentage/2)))){
            topDirection = tempSpeed;
        }

        // If it's on the same x-axis, choose a random direction
        if(leftDifference === 0){
            var leftOrRight = Math.floor(Math.random() * 2);
            if(leftOrRight && lifeForm.position.left > (tempSpeed + (widthAsPercentage/2))){
                leftDirection = -(tempSpeed);
            } else if(lifeForm.position.left < (100-(tempSpeed + (widthAsPercentage/2)))){
                leftDirection = tempSpeed;
            }
        }
        // If it's to the right, move left.
        else if(leftDifference < 0  && lifeForm.position.left > (tempSpeed + (widthAsPercentage/2))) {
            leftDirection = -(tempSpeed);
        }
        // If it's to the left, move right.
        else if(leftDifference > 0 && lifeForm.position.left < (100-(tempSpeed + (widthAsPercentage/2)))){
            leftDirection = tempSpeed;
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
        var theTarget = lifeForm.foodTarget;
        var targetIndex;
        if(theTarget){
            var tempSpeed = lifeForm.speed;
            if(lifeForm.species === "carnie"){
                if(lifeForm.energy > 50){
                    tempSpeed *= 1.5;
                    lifeForm.energy -= 2;
                } else {
                    lifeForm.energy -= 1;
                }
            } else {
                lifeForm.energy -= 1;
            }
            var topDirection, leftDirection;
            //Set difference between top positions of creature and food to topDifference
            var topDifference = lifeForm.position.top - theTarget.position.top;
            // Set difference between left positions of creature and food to leftDifference
            var leftDifference = lifeForm.position.left - theTarget.position.left;

            var heightAsPercentage = (lifeForm.size * 100)/documentHeight();
            var widthAsPercentage = (lifeForm.size * 100)/documentWidth();

            // If it's on the same y-axis, no need to changein that direction.
            if(Math.abs(topDifference) <= tempSpeed){
                
                topDirection = -(topDifference);
            } 
            // If it's below, move downwards.
            else if(topDifference < -(tempSpeed)) {
                topDirection = tempSpeed;
            } 
            // If it's above, move upwards.
            else if(topDifference > tempSpeed) {
                topDirection = -(tempSpeed);
            }

            // If it's on the same x-axis, no need to change in that direction.
            if(Math.abs(leftDifference) <= tempSpeed){
                leftDirection = -(leftDifference);
            }
            // If it's to the right, move right.
            else if(leftDifference < -(tempSpeed)) {
                leftDirection = tempSpeed;
            }
            // If it's to the left, move left.
            else if(leftDifference > tempSpeed) {
                leftDirection = -(tempSpeed);
            }

            var newTopState = lifeForm.position.top + topDirection;
            var newLeftState = lifeForm.position.left + leftDirection;
            
            lifeForm.position = {top: newTopState, left: newLeftState};
            var toEat = -1;
        
            if((Math.abs(theTarget.position.top - lifeForm.position.top) < (heightAsPercentage/2)) && (Math.abs(theTarget.position.left - lifeForm.position.left) < (widthAsPercentage/2))){
                if(lifeForm.species === "herbie"){
                    targetIndex = this.state.leaves.indexOf(theTarget);
                } else if(lifeForm.species === "carnie"){
                    targetIndex = this.state.herbies.indexOf(theTarget);
                }
                var attVSDef = lifeForm.attack - theTarget.defence;
                if(attVSDef >= 50){
                    lifeForm.health += 50;
                    lifeForm.nutrition += 50;
                    lifeForm.energy += 10;
                    theTarget.health -= 50;
                    theTarget.nutrition -= 50;
                } else if(attVSDef > 0){
                    lifeForm.health += attVSDef;
                    lifeForm.nutrition += attVSDef;
                    lifeForm.energy += attVSDef/5;
                    theTarget.health -= attVSDef;
                    theTarget.nutrition -= attVSDef;
                } 
                if(lifeForm.species === "carnie"){
                    lifeForm.attack += 5;
                }

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
        lifeForm.energy -= 1;
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
        lifeForm.isAwake = false;
        if(lifeForm.energy > 70){
            lifeForm.isAwake = true;
        }
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