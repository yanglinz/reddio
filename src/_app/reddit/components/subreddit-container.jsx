import { isEmpty } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RouterComponent from 'core/components/higher-order/router.jsx';
import SubredditListings from 'reddit/components/subreddit-listing.jsx';
import SubredditSortController from 'reddit/components/subreddit-sort-controller.jsx';
import SubredditPosts from 'reddit/components/subreddit-posts.jsx';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';
import { fetchPosts } from 'reddit/api.js';
import { setPosts } from 'reddit/state/actions.js';
import { logError } from 'core/logger.js';

@connect(state => ({
  activePosts: state.reddit.activePosts
}))
class SubredditContainer extends RouterComponent {
  componentDidMount() {
    this.fetchPostsIfNeeded();
  }

  componentDidUpdate() {
    this.fetchPostsIfNeeded();
  }

  fetchPosts() {
    const { activeSubreddit, activeSortType, activeSortRange } = this.props;
    fetchPosts(activeSubreddit, {
      sortType: activeSortType,
      sortRange: activeSortRange
    })
    .then((posts) => {
      const action = setPosts(posts, activeSubreddit, activeSortType, activeSortRange);
      this.props.dispatch(action);
    })
    .catch(logError);
  }

  fetchPostsIfNeeded() {
    if (isEmpty(this.props.activePosts)) {
      this.fetchPosts();
    }
  }

  render() {
    const { activePosts, activeSubreddit, activeSortType, activeSortRange } = this.props;
    return (
      <div>
        <h1>Subreddit handler {activeSubreddit} {activeSortType} {activeSortRange}</h1>
        <SubredditListings
          subreddits={SUBREDDITS}
          activeSubreddit={activeSubreddit} />
        <SubredditSortController
          activeSubreddit={activeSubreddit}
          sortTypes={SORT_TYPES}
          activeSortType={activeSortType}
          sortRanges={SORT_RANGES}
          activeSortRange={activeSortRange} />
        <SubredditPosts posts={activePosts} />
      </div>
    );
  }
}

SubredditContainer.propTypes = {
  activeSubreddit: PropTypes.string.isRequired,
  activeSortType: PropTypes.string.isRequired,
  activeSortRange: PropTypes.string
};

export default SubredditContainer;
