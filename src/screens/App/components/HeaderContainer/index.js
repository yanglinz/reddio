import React from 'react';
import { connect } from 'react-redux';

import { selectIsIndex } from 'state/routing/reducer';
import Header from 'screens/App/components/Header';

function stateToProps(state) {
  return {
    isIndex: selectIsIndex(state),
  };
}

function HeaderContainer(props) {
  return (
    <div className="HeaderContainer">
      <Header {...props} />
    </div>
  );
}

module.exports = connect(stateToProps)(HeaderContainer);
