import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import { SUBREDDITS, MULTIREDDITS } from 'services/reddit-api/manifest';

import './index.scss';

function HomeScreen() {
  const multiredditSection = (
    <section className="HomeScreen-section">
      <div className="HomeScreen-sectionHeader">
        <h2 className="HomeScreen-sectionTitle">
          Multireddits
        </h2>
        <p className="HomeScreen-sectionLabel">
          Listen to music posted on a combination of subreddits.
        </p>
      </div>

      <ul className="HomeScreen-sectionList">
        {_.map(MULTIREDDITS, multireddit => (
          <li key={multireddit.pathname} className="HomeScreen-sectionItem">
            <Link to={multireddit.pathname}>
              <h3 className="HomeScreen-sectionItemTitle">
                {multireddit.title}
              </h3>
              <p className="HomeScreen-sectionItemLabel">
                {multireddit.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  const subredditSection = (
    <section className="HomeScreen-section">
      <div className="HomeScreen-sectionHeader">
        <h2 className="HomeScreen-sectionTitle">
          Subreddits
        </h2>
        <p className="HomeScreen-sectionLabel">
          Listen to music posted on a specific subreddits.
        </p>
      </div>

      <ul className="HomeScreen-sectionList">
        {_.map(SUBREDDITS, subreddit => (
          <li key={subreddit.pathname} className="HomeScreen-sectionItem">
            <Link to={subreddit.pathname}>
              <h3 className="HomeScreen-sectionItemTitle">
                {subreddit.title}
              </h3>
              <p className="HomeScreen-sectionItemLabel">
                {subreddit.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="HomeScreen">
      {multiredditSection}
      {subredditSection}
    </div>
  );
}

module.exports = HomeScreen;
