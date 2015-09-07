import { contains, isEmpty, isEqual } from 'lodash';
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
  posts: state.reddit.posts,
  query: state.reddit.query,
  isFetching: state.reddit.meta.isFetching,
  updatedAt: state.reddit.meta.updatedAt
}))
class SubredditContainer extends RouterComponent {
  componentDidMount() {
    this.redirectIfIndex();
    this.fetchPostsIfEmpty();
  }

  componentDidUpdate(prevProps) {
    this.redirectIfIndex();
    this.fetchPostsIfEmpty(prevProps);
  }

  shouldFetchPosts(prevProps={}) {
    const { subreddit, sortType, sortRange } = this.props.params;
    const isFetching = this.props.isFetching;
    const hasPosts = !isEmpty(this.getPosts());
    const hasSubreddit = contains(SUBREDDITS, subreddit);
    const hasSortType = contains(SORT_TYPES, sortType);

    const prevParams = prevProps.params || {};
    const hasNewSubreddit = !isEqual(subreddit, prevParams.subreddit);
    const hasNewSortType = !isEqual(sortType, prevParams.sortType);
    const hasNewSortRange = !isEqual(sortRange, prevParams.sortRange);
    const hasNewParams = hasNewSubreddit || hasNewSortType || hasNewSortRange;

    return !isFetching && !hasPosts && hasSubreddit && hasSortType && hasNewParams;
  }

  getPosts() {
    const { posts, query } = this.props;
    const { subreddit, sortType, sortRange } = this.props.params;
    return query.getActivePosts(posts, subreddit, sortType, sortRange);
  }

  fetchPostsIfEmpty(prevProps={}) {
    if (this.shouldFetchPosts(prevProps)) {
      const { subreddit, sortType, sortRange } = this.props.params;
      this.props.dispatch(fetchPosts(subreddit, sortType, sortRange));
    }
  }

  render() {
    const { isFetching, params } = this.props;
    const { subreddit, sortType, sortRange } = params;
    const activePosts = this.getPosts();
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
        <SubredditPosts
          posts={activePosts || []}
          isFetching={isFetching} />
      </div>
    );
  }

  redirectIfIndex() {
    const { subreddit, sortType } = this.props.params;
    const hasSubreddit = contains(SUBREDDITS, subreddit);
    const hasSortType = contains(SORT_TYPES, sortType);
    if (!hasSubreddit || !hasSortType) {
      const defaultSubreddit = 'listentothis';
      const defaultSortType = 'hot';
      const route = hasSubreddit ?
        `/${subreddit}/${defaultSortType}` :
        `/${defaultSubreddit}/${defaultSortType}`;
      this.transitionTo(route);
    }
  }
}

SubredditContainer.propTypes = {
  params: PropTypes.object,
  posts: PropTypes.object,
  query: PropTypes.object,
  isFetching: PropTypes.bool,
  updatedAt: PropTypes.number,
  dispatch: PropTypes.func
};

export default SubredditContainer;
