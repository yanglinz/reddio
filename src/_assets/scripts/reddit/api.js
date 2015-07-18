import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { logError } from './../lib/app.utils.js';

class RedditParser {
  static listing(listing={}) {
    let posts = _.filter(listing.data.children, function postFilter(post) {
      return !post.data.is_self && !post.data.stickied;
    });

    return _.map(posts, RedditParser.post);
  }

  static post(post={}) {
    const p = post.data || {};
    const timeCreated = moment.unix(p.created_utc).fromNow();
    return {
      commentsCount: p.num_comments,
      domain: p.domain,
      id: p.id,
      permalink: p.permalink,
      name: p.name,
      score: p.score,
      thumbnail: p.thumbnail,
      timeCreated: timeCreated,
      title: p.title,
      url: p.url
    };
  }
}

class RedditApi {
  static getEndpoint(subreddit, listingType) {
    return `http://www.reddit.com/r/${subreddit}/${listingType}.json`;
  }

  static get(params) {
    const url = RedditApi.getEndpoint(params.subreddit, params.listingType);
    return axios
      .get(url, {
        params: {
          t: params.listingType === 'top' ? params.sortRange : null,
          limit: params.limit,
          after: params.after
        }
      })
      .then(function onResponse(response) {
        let posts = RedditParser.listing(response.data);
        return {
          posts: posts
        };
      })
      .catch(function onError(err) {
        logError(err);
        return [];
      });
  }
}

export { RedditApi, RedditParser };
