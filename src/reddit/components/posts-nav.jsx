import React from 'react';
import { Link } from 'react-router';

function PostsNavigation(props) {
  const {
    hotLink,
    newLink,
    risingLink,
    controversialLink
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

module.exports = PostsNavigation;
