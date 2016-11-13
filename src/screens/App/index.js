import React from 'react';

// import Home from 'core/components/home';
// import Footer from 'core/components/footer';
// import Posts from 'reddit/components/posts';
// import PlayerContainer from 'player/containers/player';

function AppScreen(props) {
  return (
    <div className="AppScreen">
      <h1>AppScreen</h1>
      {props.children}
      {/*<Footer />*/}
      {/*<PlayerContainer />*/}
    </div>
  );
}

AppScreen.propTypes = {
  children: React.PropTypes.node,
};

module.exports = AppScreen;
