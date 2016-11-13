import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import PlayerContainer from './components/PlayerContainer';

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
