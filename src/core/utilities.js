const urlParser = document.createElement('a');

export function parseUrl(url) {
  urlParser.href = url;
  const { protocol, hostname, pathname, search, hash, host } = urlParser;
  return { protocol, hostname, pathname, search, hash, host };
}
