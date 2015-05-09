var RSVP = require('rsvp');
var _ = require('lodash');
var $ = window.$;

class Parse {
  static listing (listing={}) {
    return _.map(_.get(listing, 'data.children'), Parse.post);
  }

  static post (post={}) {
    return post.data;
  }
}

class RedditApi {
  constructor(options) {
    const baseUrl   = 'http://www.reddit.com';
    this._url       = baseUrl + '/r/' + options.subreddit;
    this._urlHot    = this._url + '/hot.json';
    this._urlTop    = this._url + '/top.json';
    this._urlNew    = this._url + '/new.json';
  }

  _get (params) {
    let request = $.get(params.url, {
      limit: params.limit || 25,
      after: params.after || ''
    });
    return new RSVP.Promise(function (resolve, reject) {
      request.then(function (data) {
        resolve(Parse.listing(data));
      });
    });
  }

  getHot (params={}) {
    params.url = this._urlHot;
    return this._get(params);
  }

  getTop (params={}) {
    params.url = this._urlTop;
    return this._get(params);
  }

  getNew (params={}) {
    params.url = this._urlNew;
    return this._get(params);
  }
}

module.exports = {
  listenToThis: new RedditApi({subreddit: 'listentothis'})
};
