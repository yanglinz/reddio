/* eslint react/sort-comp: 0 */

import React from 'react';
import Reddit from './base/reddit.js';
import dispatcher from '../dispatcher.js';
import RedditActions from '../actions/reddit.js';
import { appState } from '../state/state.js';

class RedditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = appState.getState('reddit');
  }

  componentWillUpdate() {
    let redditState = appState.getState('reddit') || {};
    this.state = {
      activeSubreddit: redditState.activeSubreddit,
      activeSortType: redditState.activeSortType,
      subreddits: redditState.activeSortType,
      sortTypes: redditState.sortTypes
    };
  }

  setActiveSubreddit(e) {
    let newSubreddit = e.target.getAttribute('data-subreddit') || e.target.innerText;
    let action = RedditActions.setActiveSubreddit(newSubreddit);
    return dispatcher.dispatch(action);
  }

  setActiveSortType(e) {
    let newSortType = e.target.innerText;
    let action = RedditActions.setActiveSortType(newSortType);
    return dispatcher.dispatch(action);
  }

  fetchPosts() {
    const numPosts = 50;
    let action = RedditActions.fetchPosts(numPosts);
    return dispatcher.dispatch(action);
  }

  render() {
    return (
      <Reddit
        subreddits={this.state.subreddits}
        sortTypes={this.state.sortTypes}
        setActiveSubreddit={this.setActiveSubreddit.bind(this)}
        setActiveSortType={this.setActiveSortType.bind(this)}
        fetchPosts={this.fetchPosts.bind(this)} />
    );
  }
}

export default RedditContainer;