import React from 'react';
import ReactDOM from 'react-dom';

import store from 'core/state.js';

function App() {
  return (
    <h1>Hello World</h1>
  );
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
