import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import 'core/state.js';

function App() {
  return (
    <div className="root">
      <h1>Hello World</h1>
    </div>
  );
}

export function initialize(mountId) {
  const mountNode = document.getElementById(mountId);
  ReactDOM.render(<App />, mountNode);
}
