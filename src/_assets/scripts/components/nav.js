/* eslint react/sort-comp:0 */
/* eslint react/prop-types:0 */

import _ from 'lodash';
import React from 'react';
import Marty from 'marty';
import NavStore from '../stores/navStore.js';
import NavAction from '../actions/navAction.js';

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.propTypes = {
      isActive: React.PropTypes.bool,
      children: React.PropTypes.string
    };
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

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.propTypes = {
      sortTypes: React.PropTypes.array,
      activeSortType: React.PropTypes.string
    };
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
