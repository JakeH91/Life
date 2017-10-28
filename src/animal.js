import React from 'react';
import LifeForm from './lifeForm.js'

export default class Animal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            target: -1
        }
    }
    render(){
        return (
            <LifeForm top="" left="" nutritionalValue="" health="" >
                <div>
                    {this.props.children}
                </div>
            </LifeForm>
        );
    }
};