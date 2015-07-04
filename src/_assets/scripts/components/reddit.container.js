/* eslint react/sort-comp: 0 */

import _ from 'lodash';
import React from 'react';
import Reddit from './base/reddit.js';
import dispatcher from '../dispatcher.js';
import RedditActions from '../actions/reddit.js';
import { appState } from '../state/state.js';
import { logError} from '../lib/logger.js';

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

  getPosts() {
    const activeListingType = this.state.activeListingType;
    const activeSortRange = this.state.activeSortRange;
    const storageKey = activeListingType === 'top' ?
      `${activeListingType}:${activeSortRange}` : `${activeListingType}:`;
    return this.state.subreddits[this.state.activeSubreddit][storageKey];
  }

  setActiveSubreddit(e) {
    let newSubreddit = e.target.getAttribute('data-value') || e.target.innerText;
    let action = RedditActions.setActiveSubreddit(newSubreddit);
    dispatcher.dispatch(action);
  }

  setActiveListingType(e) {
    let newListingTYpe = e.target.getAttribute('data-value') || e.target.innerText;
    let action = RedditActions.setActiveListingType(newListingTYpe);
    dispatcher.dispatch(action);
  }

  setActiveSortRange(e) {
    let newSortRange = e.target.getAttribute('data-value') || e.target.innerText;
    let action = RedditActions.setActiveSortRange(newSortRange);
    dispatcher.dispatch(action);
  }

  fetchPosts() {
    const activeSubreddit = this.state.activeSubreddit;
    const activeListingType = this.state.activeListingType;
    const activeSortRange = this.state.activeSortRange;
    const posts = this.getPosts();
    const after = (_.last(posts) || {}).name;
    const limit = 5;
    let action = RedditActions.fetchPosts(
      activeSubreddit, activeListingType, activeSortRange, after, limit);
    dispatcher.dispatch(action);
  }

  fetchPostsIfEmpty() {
    if (_.isEmpty(this.getPosts())) {
      this.fetchPosts();
    }
  }

  render() {
    let subreddits = _.keys(this.state.subreddits);
    let listingTypes = this.state.listingTypes;
    let sortRanges = this.state.sortRanges;
    let activeListingType = this.state.activeListingType;
    let activeSortRange = this.state.activeSortRange;
    let posts = this.getPosts();

    return (
      <Reddit
        subreddits={subreddits}
        posts={posts}
        listingTypes={listingTypes}
        activeListingType={activeListingType}
        sortRanges={sortRanges}
        activeSortRange={activeSortRange}
        setActiveSubreddit={this.setActiveSubreddit.bind(this)}
        setActiveListingType={this.setActiveListingType.bind(this)}
        setActiveSortRange={this.setActiveSortRange.bind(this)}
        fetchPosts={this.fetchPosts.bind(this)} />
    );
  }
}

export default RedditContainer;
