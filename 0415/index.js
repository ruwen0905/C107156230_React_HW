import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './App_1'

ReactDOM.render(
  <Clock date={new Date()} />,
  document.getElementById('root')
);

/*
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
*/