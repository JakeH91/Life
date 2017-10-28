import React from 'react';

export default class LifeForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            position: {
                top: 0,
                left: 0
            },
            nutritionalValue: 0,
            health: 0
        }
    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
};