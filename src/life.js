import React from 'react';
import Herbie from './herbie.js';
import Carnie from './carnie.js';
import Leaf from './leaf.js';

export default class Life extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Placement on the map
            positions: {
                // At the moment, a hard coded start position for Herbie...
                herbie: {
                    top: 30,
                    left: 70
                },
                // ...and Carnie.
                carnie: {
                    top: 20,
                    left: 20
                },
                // Randomly generate leafs positions
                leaf: [{top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)},
                        {top: Math.floor(Math.random() * 100), left: Math.floor(Math.random() * 100)}]
            },
            
            // This will be where the creatures are able to sense each other
            senses: {
                herbie: {
                    sight: 20
                },
                carnie: {
                    sight: 30
                }
            },
            nutrition: {
                herbie: 500,
                leaf: 100
            },
            health: {
                herbie: 1000,
                carnie: 2000
            },

            target: {
                herbie: -1
            }
        }
    }

    // Herbies movement logic
    herbieMove() {
        // Provide shortcuts for various bits of data
        const { herbie, leaf } = this.state.positions;
        const { herbie: herbieTarget } = this.state.target;
        // Minus 7 health point
        var newHealth = this.state.health.herbie - 7;
        this.setState({
            health: {
                ...this.state.health,
                herbie: newHealth
            }
        });

        if(this.state.health.herbie <= 0){
            this.herbieDie();
        } else {
            var topDirection, leftDirection;
            // If there is a leaf close by...
            if(herbieTarget !== -1){
                // If it's on the same y-axis, no need to changein that direction.
                if(herbie.top === leaf[herbieTarget].top){
                    topDirection = 0;
                } 
                // If it's below, move downwards.
                else if((herbie.top - leaf[herbieTarget].top) < 0) {
                    topDirection = 1;
                } 
                // If it's above, move upwards.
                else if((herbie.top - leaf[herbieTarget].top) > 0) {
                    topDirection = -1;
                }

                // If it's on the same x-axis, no need to change in that direction.
                if(herbie.left === leaf[herbieTarget].left){
                    leftDirection = 0;
                }
                // If it's to the right, move right.
                else if((herbie.left - leaf[herbieTarget].left) < 0) {
                    leftDirection = 1;
                }
                // If it's to the left, move left.
                else if((herbie.left - leaf[herbieTarget].left) > 0) {
                    leftDirection = -1;
                }
                // If with that last movement you landed on the leaf
                if((herbie.left === leaf[herbieTarget].left) && (herbie.top === leaf[herbieTarget].top)){
                    // Eat the leaf.
                    this.herbieEatLeaf(herbieTarget);
                }
            } 
            // If there is no leaf close by...
            else {
                this.herbieCheckForLeaves();
                // Generate random numbers
                topDirection = Math.floor(Math.random() * 2);
                leftDirection = Math.floor(Math.random() * 2);
                // If topDirection random number is 0, and Herbie is not at the top of the board
                // (Or herbie is at the bottom or the board)
                if((topDirection < 1 && herbie.top !== 0) || herbie.top === 100) {
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
                if((leftDirection < 1 && herbie.left !== 0) || herbie.left === 100) {
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
            var newTopState = herbie.top + topDirection;
            var newLeftState = herbie.left + leftDirection;
            // Then set the states to those variables
            this.setState({
                positions: {
                    ...this.state.positions, // Keep all other position states the same
                    herbie: {
                        top: newTopState,
                        left: newLeftState
                    }
                }
            });
        }
        
        
    }

    // Herbie looking for leaves logic
    herbieCheckForLeaves() {
        // Create shortcuts for data
        const { herbie, leaf } = this.state.positions;
        const { herbie: herbieSense } = this.state.senses;

        // Total sensing range
        var sensingDistance = Math.sqrt((Math.pow(herbieSense.sight, 2)) + (Math.pow(herbieSense.sight, 2)));
        // Check through all leaves
        for(var i = 0; i < leaf.length; i++){
            // Compare top distance of herbie and leaf
            var topDistanceFromLeaf = herbie.top - leaf[i].top;
            // Compare left distance of herbie and leaf
            var leftDistanceFromLeaf = herbie.left - leaf[i].left;
            // Figure out distance from leaf
            var distanceToLeaf = Math.sqrt((Math.pow(topDistanceFromLeaf, 2)) + (Math.pow(leftDistanceFromLeaf, 2)));
            // If the distance to the leaf is witin sensing range
            if(distanceToLeaf < sensingDistance){
                // Set target to that leaf
                this.setState({
                    target: {
                        herbie: i
                    }
                });
                return;
            }
        }
    }

    // Herbie leave eating logic
    herbieEatLeaf(leafIndex) {
        var newHealth = this.state.health.herbie + this.state.nutrition.leaf;
        // Make copy of array of all leaves
        var newLeafState = this.state.positions.leaf.slice();
        // Remove the discovered leaf from this copy
        newLeafState.splice(leafIndex, 1);
        // Set the state to the filtered leaf array, minus the eaten leaf.
        this.setState({
            positions: {
                ...this.state.positions, // Keep all other position states the same.
                leaf: newLeafState
            }, 
            target: {
                herbie: -1
            },
            health: {
                ...this.state.health,
                herbie: newHealth
            }
        });
    }

    herbieDie() {
        console.log("Herbie Died :(");
        this.setState({
            positions: {
                ...this.state.positions, // Keep all other position states the same
                herbie: {
                    top: -100,
                    left: -100
                }
            },
            health: {
                ...this.state.health,
                herbie: 0
            }
        });
        clearInterval(this.startHerbie);
    }

    // Carnie Moving Logic
    carnieMove() {
        const { carnie, herbie } = this.state.positions;

        // Take health over time
        var newCarnieHealth = this.state.health.carnie - 7;
        this.setState({
            health: {
                ...this.state.health,
                carnie: newCarnieHealth
            }
        });

        // If Carnie health drops below 0, he's dead
        if(this.state.health.carnie <= 0){
            this.carnieDie();
        }

        // First, look around for herbies
        var herbieClose = this.carnieCheckForHerbies();

        var topDirection, leftDirection;
        // If there's a herbie nearby, chase it!
        if(herbieClose) {
            // If it's on the same y-axis, no need to changein that direction.
            if(carnie.top === herbie.top){
                topDirection = 0;
            } 
            // If it's below, move downwards.
            else if((carnie.top - herbie.top) < 0) {
                topDirection = 1;
            } 
            // If it's above, move upwards.
            else if((carnie.top - herbie.top) > 0) {
                topDirection = -1;
            }

            // If it's on the same x-axis, no need to change in that direction.
            if(carnie.left === herbie.left){
                leftDirection = 0;
            }
            // If it's to the right, move right.
            else if((carnie.left - herbie.left) < 0) {
                leftDirection = 1;
            }
            // If it's to the left, move left.
            else if((carnie.left - herbie.left) > 0) {
                leftDirection = -1;
            }
            // If with that last movement you landed on the herbie
            if((carnie.left === herbie.left) && (carnie.top === herbie.top)){
                // Eat him.
                this.carnieEatHerbie();
            }
        }
        // If there are no herbies, move around randomly.
        else {
            // Generate random numbers
            topDirection = Math.floor(Math.random() * 2);
            leftDirection = Math.floor(Math.random() * 2);
            // If topDirection random number is 0, and Carnie is not at the top of the board
            // (Or carnie is at the bottom or the board)
            if((topDirection < 1 && carnie.top !== 0) || carnie.top === 100) {
                // Move upwards.
                topDirection = -1;
            } 
            // Otherwise, ff topDirection random number is 1,
            else {
                // Move downwards.
                topDirection = 1;
            }

            // If leftDirection random number is 0, and Carnie is not at the absolute left of the board
            // (Or carnie is at the absolute right or the board)
            if((leftDirection < 1 && carnie.left !== 0) ||carnie.left === 100) {
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
        var newTopState = carnie.top + topDirection;
        var newLeftState = carnie.left + leftDirection;
        // Then set the states to those variables
        this.setState({
            positions: {
                ...this.state.positions, // Keep all other position states the same
                carnie: {
                    top: newTopState,
                    left: newLeftState
                }
            }
        });
    }
    
    // Carnie looking for Herbies Logic
    carnieCheckForHerbies() {
        // Create shortcuts for data
        const { carnie, herbie } = this.state.positions;
        const { carnie: carnieSense } = this.state.senses;

        // Compare top distance of herbie and leaf
        var topDistanceFromHerbie = carnie.top - herbie.top;
        // Compare left distance of herbie and leaf
        var leftDistanceFromHerbie = carnie.left - herbie.left;
        // If the distance from the top and left positions are within herbies sense of smell 
        if(Math.abs(topDistanceFromHerbie) < carnieSense.sight && Math.abs(leftDistanceFromHerbie) < carnieSense.sight){
            // Return the index of that leaf
            return true;
        }
        
        // If there is nothing within range, return false
        return false;
    }

    // Carnie eating Herbie Logic
    carnieEatHerbie() {
        var newHerbieHealth = this.state.health.herbie - 200;
        this.setState({
            health: {
                ...this.state.health,
                herbie: newHerbieHealth
            }
        });

        if(this.state.health.herbie <= 0){
            var newCarnieHealth = this.state.health.carnie + this.state.nutrition.herbie;
            this.setState({
                health: {
                    ...this.state.health,
                    carnie: newCarnieHealth
                }
            });
            this.herbieDie();
        }
    }

    carnieDie() {
        console.log("Carnie Died :(");
        this.setState({
            positions: {
                ...this.state.positions, // Keep all other position states the same
                carnie: {
                    top: -100,
                    left: -100
                }
            },
            health: {
                ...this.state.health,
                carnie: 0
            }
        });
        clearInterval(this.startCarnie);
    }

    componentDidMount() {
        this.startHerbie = setInterval(
            () => this.herbieMove(), 80
        );
        this.startCarnie = setInterval(
            () => this.carnieMove(), 90
        );
    }

    componentWillUnmount() {
        clearInterval(this.startHerbie);
        clearInterval(this.startCarnie);
    }

    render() {
        var pStyle = {
            color: "white"
        };
        return(
            <div>
                <p style={pStyle}>Herbie Health: {this.state.health.herbie}</p>
                <p style={pStyle}>Carnie Health: {this.state.health.carnie}</p>
                <Herbie size="40px" top={this.state.positions.herbie.top} left={this.state.positions.herbie.left} />
                <Carnie size="40px" top={this.state.positions.carnie.top} left={this.state.positions.carnie.left}/>
                {this.state.positions.leaf.map(leaf =>
                    <Leaf top={leaf.top} left={leaf.left}/>
                )
                }
            </div>
            
        );
    }
};