import React from 'react';

import Header from './components/Header';
import PlayerContainer from './components/PlayerContainer';
import Footer from './components/Footer';
import './styles/main.scss';

function AppScreen(props) {
  return (
    <div className="AppScreen">
      <Header />
      {props.children}
      <Footer />
      <PlayerContainer />
    </div>
  );
}

AppScreen.propTypes = {
  children: React.PropTypes.node,
};

module.exports = AppScreen;
