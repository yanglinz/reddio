import React from 'react';

import Controls from './Controls';
import './index.scss';

export function Player(props) {
  return (
    <div className="Player">
      <Controls {...props} />
    </div>
  );
}

module.exports = Player;
