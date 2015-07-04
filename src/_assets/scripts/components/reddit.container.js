/* eslint react/sort-comp: 0 */

import _ from 'lodash';
import React from 'react';
import Reddit from './base/reddit.js';
import dispatcher from '../dispatcher.js';
import RedditActions from '../actions/reddit.js';
import { appState } from '../state/state.js';

class RedditContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = appState.getState();
    this.fetchPostsIfEmpty();
  }

  componentWillUpdate() {
    this.state = appState.getState();
    this.fetchPostsIfEmpty();
  }

  setActiveSubreddit(e) {
    let newSubreddit = e.target.getAttribute('data-value') || e.target.innerText;
    let action = RedditActions.setActiveSubreddit(newSubreddit);
    dispatcher.dispatch(action);
  }

  setActiveSortType(e) {
    let newSortType = e.target.innerText;
    let action = RedditActions.setActiveSortType(newSortType);
    dispatcher.dispatch(action);
  }

  fetchPosts() {
    const activeSortType = this.state.activeSortType;
    const activeSubreddit = this.state.activeSubreddit;
    const posts = this.state.subreddits[activeSubreddit];
    const after = (_.last(posts) || {}).name;
    const limit = 3;
    let action = RedditActions.fetchPosts(activeSubreddit, activeSortType, after, limit);
    dispatcher.dispatch(action);
  }

  fetchPostsIfEmpty() {
    const activeSubreddit = this.state.activeSubreddit;
    const posts = this.state.subreddits[activeSubreddit];
    if (_.isEmpty(posts)) {
      this.fetchPosts();
    }
  }

  render() {
    let subreddits = _.keys(this.state.subreddits);
    let posts = this.state.subreddits[this.state.activeSubreddit];
    return (
      <Reddit
        subreddits={subreddits}
        sortTypes={this.state.sortTypes}
        posts={posts}
        setActiveSubreddit={this.setActiveSubreddit.bind(this)}
        setActiveSortType={this.setActiveSortType.bind(this)}
        fetchPosts={this.fetchPosts.bind(this)} />
    );
  }
}

export default RedditContainer;
