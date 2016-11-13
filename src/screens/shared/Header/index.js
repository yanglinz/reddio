import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="Header">
      <h1>Header</h1>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/r/listentothis">listentothis</Link></li>
        <li><Link to="/r/trance">trance</Link></li>
      </ul>
    </div>
  );
}

module.exports = Header;
