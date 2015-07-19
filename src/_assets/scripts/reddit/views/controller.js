/* eslint react/sort-comp: 0 */

import _ from 'lodash';
import React from 'react';
import Reddit from '../app/reddit.js';
import dispatcher from '../../core/dispatcher.js';
import RedditActions from '../../reddit/actions.js';
import { appState } from '../../core/state.js';

class RedditController extends React.Component {
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

  onActiveSubredditChange(e) {
    let newSubreddit = e.currentTarget.getAttribute('data-payload');
    if (newSubreddit) {
      let action = RedditActions.setActiveSubreddit(newSubreddit);
      dispatcher.dispatch(action);
    }
  }

  setActiveListingType(listingType) {
    let action = RedditActions.setActiveListingType(listingType);
    dispatcher.dispatch(action);
  }

  setActiveSortRange(sortRange) {
    let action = RedditActions.setActiveSortRange(sortRange);
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
    let activeSubreddit = this.state.activeSubreddit;
    let listingTypes = this.state.listingTypes;
    let sortRanges = this.state.sortRanges;
    let activeListingType = this.state.activeListingType;
    let activeSortRange = this.state.activeSortRange;
    let posts = this.getPosts();

    return (
      <Reddit
        posts={posts}
        subreddits={subreddits}
        activeSubreddit={activeSubreddit}
        listingTypes={listingTypes}
        activeListingType={activeListingType}
        sortRanges={sortRanges}
        activeSortRange={activeSortRange}
        onActiveSubredditChange={this.onActiveSubredditChange.bind(this)}
        setActiveListingType={this.setActiveListingType.bind(this)}
        setActiveSortRange={this.setActiveSortRange.bind(this)}
        fetchPosts={this.fetchPosts.bind(this)} />
    );
  }
}

export default RedditController;
