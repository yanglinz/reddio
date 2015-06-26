/* eslint react/sort-comp: 0, react/prop-types: 0 */

import React from 'react';
import Marty from 'marty';
import NavStore from '../stores/navStore.js';
import NavAction from '../actions/navAction.js';

class NavItem extends React.Component {
  constructor(props) {
    super(props);
  }

  setActiveSortType() {
    let sortType = this.props.children;
    NavAction.setActiveSortType(sortType);
  }

  render() {
    let className = this.props.isActive ? 'active' : 'inactive';
    return (
      <p className={className}
         onClick={this.setActiveSortType.bind(this)}>{this.props.children}</p>
    );
  }
}

NavItem.propTypes = {
  isActive: React.PropTypes.bool,
  children: React.PropTypes.string
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        {this.props.sortTypes.map(function mapSortTypes(sortType, i) {
          let isActive = sortType === this.props.activeSortType;
          return (
            <NavItem isActive={isActive} key={i} >{sortType}</NavItem>
          );
        }.bind(this))}
      </div>
    );
  }
}

Nav.propTypes = {
  sortTypes: React.PropTypes.array,
  activeSortType: React.PropTypes.string
};

let NavContainer = Marty.createContainer(Nav, {
  listenTo: NavStore,
  fetch: {
    sortTypes() {
      return NavStore.getSortTypes();
    },

    activeSortType() {
      return NavStore.getActiveSortType();
    }
  }
});

export default NavContainer;
