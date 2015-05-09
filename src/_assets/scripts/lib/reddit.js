var RSVP = require('rsvp');
var _ = require('lodash');
var $ = window.$;

class Parse {
  static listing (listing={}) {
    return _.map(listing.data.children, Parse.post);
  }

  static post (post={}) {
    return post.data;
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
