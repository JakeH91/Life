import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './life.js';

var destination = document.getElementById("container");

ReactDOM.render(
    <Life numCarnies="5" numHerbies="15" numLeaves="10" />,
    destination
);