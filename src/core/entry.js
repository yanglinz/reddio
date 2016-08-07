import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes.js';

export function initialize(mountId) {
  const mountNode = document.getElementById(mountId);
  ReactDOM.render(<AppRoutes />, mountNode);
}
