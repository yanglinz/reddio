import React from 'react';
import { Link } from 'react-router';

function ListingNavigation(props) {
  const {
    hotLink,
    newLink,
    risingLink,
    controversialLink,
  } = props;

  return (
    <nav>
      <ul>
        <li><Link to={hotLink}>hot</Link></li>
        <li><Link to={newLink}>new</Link></li>
        <li><Link to={risingLink}>rising</Link></li>
        <li><Link to={controversialLink}>controversial</Link></li>
      </ul>
    </nav>
  );
}

ListingNavigation.propTypes = {
  hotLink: React.PropTypes.string,
  newLink: React.PropTypes.string,
  risingLink: React.PropTypes.string,
  controversialLink: React.PropTypes.string,
};

module.exports = ListingNavigation;
