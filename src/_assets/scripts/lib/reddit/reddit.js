var RedditApi = require("./api.js");

module.exports = {
  listenToThis: new RedditApi({subreddit: 'listentothis'})
};
