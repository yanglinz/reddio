var $ = window.$;

class RedditApi {
  constructor(options) {
    const baseUrl   = 'http://www.reddit.com';
    this._url       = baseUrl + '/r/' + options.subreddit;
    this._urlHot    = this._url + '/hot.json';
    this._urlTop    = this._url + '/top.json';
    this._urlNew    = this._url + '/new.json';
  }

  _get (params) {
    const url = params.url;
    const limit = params.limit || 25;
    const after = params.after || '';
    return $.get(url, {
      limit: limit,
      after: after
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

module.exports = RedditApi;
