import { contains, defaults, isEmpty, isEqual } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RouterComponent from 'core/components/higher-order/router.jsx';
import SubredditListings from 'reddit/components/subreddit-listing.jsx';
import SubredditSortController from 'reddit/components/subreddit-sort-controller.jsx';
import SubredditPosts from 'reddit/components/subreddit-posts.jsx';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';
import { fetchPosts } from 'reddit/state/actions.js';

@connect(state => ({
  params: state.core.params,
  activePosts: state.reddit.activePosts,
  isFetching: state.reddit.isFetching
}))
class SubredditContainer extends RouterComponent {
  componentDidMount() {
    this.redirectIfIndex();
    this.fetchPostsIfEmpty();
  }

  componentDidUpdate() {
    this.redirectIfIndex();
    this.fetchPostsIfEmpty();
  }

  shouldFetchPosts() {
    const { subreddit, sortType } = this.props.params;
    const isFetching = this.props.isFetching;
    const hasPosts = !isEmpty(this.props.activePosts);
    const hasSubreddit = contains(SUBREDDITS, subreddit);
    const hasSortType = contains(SORT_TYPES, sortType);
    return !isFetching && !hasPosts && hasSubreddit && hasSortType;
  }

  fetchPostsIfEmpty() {
    if (this.shouldFetchPosts()) {
      const { subreddit, sortType, sortRange } = this.props.params;
      this.props.dispatch(fetchPosts(subreddit, sortType, sortRange));
    }
  }

  render() {
    const { activePosts } = this.props;
    const { subreddit, sortType, sortRange } = this.props.params;
    return (
      <div>
        <h1>Subreddit handler {subreddit} {sortType} {sortRange}</h1>
        <SubredditListings
          subreddits={SUBREDDITS}
          activeSubreddit={subreddit} />
        <SubredditSortController
          activeSubreddit={subreddit}
          sortTypes={SORT_TYPES}
          activeSortType={sortType}
          sortRanges={SORT_RANGES}
          activeSortRange={sortRange} />
        <SubredditPosts posts={activePosts} />
      </div>
    );
  }

  redirectIfIndex() {
    let { subreddit, sortType } = this.props.params;
    const hasSubreddit = contains(SUBREDDITS, subreddit);
    const hasSortType = contains(SORT_TYPES, sortType);
    if (!hasSubreddit && !hasSortType) {
      const defaultSubreddit = 'listentothis';
      const defaultSortType = 'hot';
      const route = `/${defaultSubreddit}/${defaultSortType}`;
      this.transitionTo(route);
    }
  }
}

SubredditContainer.propTypes = {
  dispatch: PropTypes.func
};

export default SubredditContainer;
