import React from 'react';
import ReactDOM from 'react-dom';
import Life from './life.js';
import './index.css';

var destination = document.getElementById("container");

ReactDOM.render(
    <Life numCarnies="3" numHerbies="15" numLeaves="200" />,
    destination
);