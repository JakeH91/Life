import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './life.js';

var destination = document.getElementById("container");

ReactDOM.render(
    <Life numCarnies="10" numHerbies="10" numLeaves="10" />,
    destination
);