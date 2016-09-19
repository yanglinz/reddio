import React from 'react';

import settings from 'core/settings';

function Footer() {
  return (
    <div className="footer">
      <p>Build {settings.GIT_HASH_SHORT}</p>
    </div>
  );
}

module.exports = Footer;
