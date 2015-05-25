'use strict';

var _ = require('lodash');
var $ = window.$;
var RSVP = require('rsvp');
var moment = require('moment');

class Parse {
  static listing (listing={}) {
    let posts = _.filter(listing.data.children, function (post) {
      return !post.data.is_self && !post.data.stickied;
    });
    return _.map(posts, Parse.post);
  }

  static post (post={}) {
    const p = post.data || {};
    const timeCreated = moment.unix(p.created_utc).fromNow();
    return {
      commentsCount: p.num_comments,
      domain:        p.domain,
      id:            p.id,
      permalink:     p.permalink,
      name:          p.name,
      score:         p.score,
      thumbnail:     p.thumbnail,
      timeCreated:   timeCreated,
      title:         p.title,
      url:           p.url
    };
  }
}

class RedditApi {
  constructor(options) {
    this.subreddit = options.subreddit || 'listentothis';
  }

  _endpoint (listingType) {
    const baseUrl = 'http://www.reddit.com/r/' + this.subreddit;
    return baseUrl + '/' + listingType + '.json';
  }

  get (listingType, params) {
    const url = this._endpoint(listingType);
    let request = $.get(url, {
      limit: params.limit || 25,
      after: params.after || ''
    });
    return new RSVP.Promise(function (resolve, reject) {
      request.then(function (data) {
        resolve(Parse.listing(data));
      });
    });
  }
}

module.exports = new RedditApi({subreddit: 'listentothis'});
