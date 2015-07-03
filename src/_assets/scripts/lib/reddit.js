import _ from 'lodash';
import RSVP from 'rsvp';
import moment from 'moment';
import axios from 'axios';

class RedditApi {
  static getEndpoint(subreddit, listingType) {
    return `http://www.reddit.com/r/${subreddit}/${listingType}.json`;
  }

  static get(params) {
    const subreddit = params.subreddit;
    const listingType = params.listingType;
    const url = RedditApi.getEndpoint(subreddit, listingType);
    return axios.get(url, {
      limit: params.limit || 25,
      after: params.after || ''
    });
  }
}

class RedditParser {
  static listing(listing={}) {
    let posts = _.filter(listing.data.children, function postFilter(post) {
      return !post.data.is_self && !post.data.stickied;
    });

    return _.map(posts, Parse.post);
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

export { RedditApi, RedditParser };
