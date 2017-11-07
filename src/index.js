import React from 'react';
import ReactDOM from 'react-dom';
import Life from './life.js';
import './index.css';

var destination = document.getElementById("container");

ReactDOM.render(
    <Life numCarnies="6" numHerbies="25" numLeaves="250" />,
    destination
);