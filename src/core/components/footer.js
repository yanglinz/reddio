import React from 'react';

import settings from 'settings';

function Footer() {
  return (
    <div className="footer">
      <p>Build {settings.GIT_HASH_SHORT}</p>
    </div>
  );
}

module.exports = Footer;
