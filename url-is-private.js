'use strict';
var hostname = require('hostname-is-private');
var Url = require('url');
var _ = require('lodash');

var ERRORS = {
  INVALID_HOSTNAME: new Error('Invalid hostname')
};

var isPrivateFactory = _.curry(function (isPrivate, url, f) {
  var _url;
  try {
    _url = Url.parse(_cleanURL(url), false, false);
  } catch (err) {
    return setImmediate(f, err);
  }

  if (!_url.hostname) {
    return setImmediate(f, ERRORS.INVALID_HOSTNAME);
  }

  isPrivate(_url.hostname, f);
});

module.exports = {
  errors: ERRORS,
  isPrivate: isPrivateFactory(hostname.isPrivate),
  isPrivateIncludingPublicIp: isPrivateFactory(hostname.isPrivateIncludingPublicIp)
};


/////////////
// Helpers //
/////////////

/**
 * Clean URL
 *   - trim it
 *   - remove weird auth part that url.parse does not support
 *   - ensure a protocol is set otherwise url.parse will throw
 * @param  {String} url
 * @return {String} cleaned url
 */
function _cleanURL(url) {
  return _removeAuthPart((url || '').toString().trim());
}

function _removeAuthPart(url) {
  var withProtocol = _ensureProtocol(url);
  return withProtocol.replace(_getAuthPart(withProtocol) + '@', '');
}

function _ensureProtocol(url) {
  if (url.indexOf('://') === -1) {
    url = 'protocol://' + url;
  }
  return url;
}

function _getAuthPart(urlwithProtocol) {
  var right = _.tail(urlwithProtocol.split('//')).join('//');
  return right.substring(0, right.lastIndexOf('@'));
}
