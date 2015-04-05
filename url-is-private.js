'use strict';
var hostname = require('hostname-is-private');
var _ = require('lodash');
var TolerantUrl = require('tolerant');

var ERRORS = {
  INVALID_HOSTNAME: new Error('Invalid hostname'),
  INVALID_INPUT: new Error('Invalid url'),
};

var isPrivateFactory = _.curry(function (isPrivate, url, f) {
  if (!url) {
    return setImmediate(f, ERRORS.INVALID_INPUT);
  }

  var _url;
  try {
    _url = TolerantUrl.parse(url);
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
