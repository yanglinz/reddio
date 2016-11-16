import React from 'react';
import InlineSVG from 'svg-inline-react';

import playIcon from 'open-iconic/svg/media-play.svg';
import pauseIcon from 'open-iconic/svg/media-pause.svg';
import forwardIcon from 'open-iconic/svg/media-step-forward.svg';
import backwardIcon from 'open-iconic/svg/media-step-backward.svg';
import './index.scss';

export function Controls(props) {
  const { isPlaying, pauseCommand, unpauseCommand, nextCommand, prevCommand } = props;

  return (
    <div className="Controls">
      <div className="Controls-commands">
        <button className="Controls-button" onClick={prevCommand}>
          <InlineSVG src={backwardIcon} />
        </button>

        {isPlaying ? (
          <button className="Controls-button Controls-button--center" onClick={pauseCommand}>
            <InlineSVG src={pauseIcon} />
          </button>
          ) : (
          <button className="Controls-button Controls-button--center" onClick={unpauseCommand}>
            <InlineSVG src={playIcon} />
          </button>
        )}

        <button className="Controls-button" onClick={nextCommand}>
          <InlineSVG src={forwardIcon} />
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  isPlaying: React.PropTypes.bool,
  pauseCommand: React.PropTypes.func.isRequired,
  unpauseCommand: React.PropTypes.func.isRequired,
  nextCommand: React.PropTypes.func.isRequired,
  prevCommand: React.PropTypes.func.isRequired,
};

module.exports = Controls;
