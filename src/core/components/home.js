import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/r/listentothis">listentothis</Link></li>
        <li><Link to="/r/trance">trance</Link></li>
      </ul>
    </div>
  );
}

module.exports = Home;
