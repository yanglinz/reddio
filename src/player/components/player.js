import React from 'react';

import Controls from './controls';
import './player.scss';

export function Player(props) {
  return (
    <div className="Player">
      <Controls {...props} />
    </div>
  );
}

module.exports = Player;
