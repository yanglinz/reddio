import { contains, defaults, filter, map } from 'lodash';
import { ajax } from 'jquery';
import { Promise } from 'es6-promise';
import moment from 'moment';
import { logError } from 'core/logger.js';

export function isYoutube(url) {
  const youtubeUrl = 'youtube.com';
  const youtubeShortUrl = 'youtu.be';
  return contains(url, youtubeUrl) || contains(url, youtubeShortUrl);
}

export function isSoundcloud(url) {
  const soundcloudUrl = 'soundcloud.com';
  return contains(url, soundcloudUrl);
}

function isPostSong(post) {
  const {
    is_self: isSelf,
    stickied: isStickied,
    url
  } = post.data;
  return !isSelf && !isStickied && (isYoutube(url) || isSoundcloud(url));
}

function parsePost(post) {
  const p = post.data;
  const createdUtcHuman = moment.unix(p.created_utc).fromNow();
  return {
    createdUtcHuman: createdUtcHuman,
    domain: p.domain,
    id: p.id,
    name: p.name,
    numComments: p.num_comments,
    permalink: p.permalink,
    score: p.score,
    thumbnail: p.thumbnail,
    title: p.title,
    url: p.url
  };
}

function parseListing(data) {
  const validPosts = filter(data.data.children, isPostSong);
  return map(validPosts, parsePost);
}

function fetchPosts(subreddit, params={}) {
  const { sortType, sortRange, limit, after } = defaults(params, {
    sortType: 'hot',
    sortRange: null,
    limit: 25,
    after: null
  });

  const request = new Promise((resolve, reject) => {
    ajax({
      url: `http://www.reddit.com/r/${subreddit}/${sortType}.json`,
      method: 'GET',
      data: {
        t: sortRange,
        limit: limit,
        after: after
      }
    }).done(resolve).fail(reject);
  });

  return request
    .then((data) => {
      return parseListing(data);
    })
    .catch(logError);
}

export { fetchPosts };
