import React from 'react';
import ReactDOM from 'react-dom';
import Life from './life.js';
import './index.css';

var destination = document.getElementById("container");

ReactDOM.render(
    <Life numCarnies="2" numHerbies="20" numLeaves="200" />,
    destination
);