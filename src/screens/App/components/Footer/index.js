import React from 'react';

import settings from 'settings';
import './index.scss';

function Footer() {
  return (
    <div className="Footer">
      <p>Build {settings.GIT_HASH_SHORT}</p>
    </div>
  );
}

module.exports = Footer;
