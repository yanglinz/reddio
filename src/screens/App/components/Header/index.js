import React from 'react';
import InlineSVG from 'svg-inline-react';
import { Link } from 'react-router';

import logo from './logo.svg';
import './index.scss';

function Header() {
  return (
    <header className="Header">
      <nav className="Header-nav">
        <div className="Header-brand">
          <Link to="/">
            <div className="Header-logo">
              <InlineSVG src={logo} />
            </div>
            <h1 className="Header-siteName">
              <span>/reddio.co</span>
            </h1>
          </Link>
        </div>
      </nav>

      <div className="Header-callToAction">
        <h2>
          Reddio helps you find new music.
          <br />
          Discover and listen to electronic music.
        </h2>
      </div>
    </header>
  );
}

module.exports = Header;
