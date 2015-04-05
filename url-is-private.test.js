'use strict';

var t = require('chai').assert;
var publicIp = require('public-ip');
var _ = require('lodash');

var errors = require('./').errors;
var isPrivate = require('./').isPrivate;
var isPrivateIncludingPublicIp = require('./').isPrivateIncludingPublicIp;

var isPrivateMatcherFactory = _.curry(function (isPrivate, shouldBe, url, done) {
  isPrivate(url, function (err, isPrivate) {
    t.strictEqual(err, null);
    t.strictEqual(isPrivate, true);
    done();
  });
});

var shouldBePrivate = isPrivateMatcherFactory(isPrivate, true);
var shouldNotBePrivate = isPrivateMatcherFactory(isPrivate, false);

var shouldBePrivateIncludingIp = isPrivateMatcherFactory(isPrivate, true);
var shouldNotBePrivateIncludingIp = isPrivateMatcherFactory(isPrivate, false);

var PRIVATE_URL = ['http://127.0.0.1.xip.io',
  'aaaa://127.0.0.1.xip.io',
  'dbcontent.cloudapp.net',
  'aaaa://127.0.0.1.xip.io:6379:6379',
  'myprotocol://auth@127.0.0.1.xip.io'
];

var PUBLIC_URL = [
  'redis://redisgreen.net',
  'redis://xdr5%RDX@google.com:20000',
  'redis://aaa5%AAA@google.com:200000',
  'redis://sdsd@node-2bcdf15671b4b4806.openredis.com:10000',
  'redis://sd:sdssd:sd//:sodksodk@node-2bcdf15671b4b4806.openredis.com:10256',
  'redis://sd:sdssd:sd:sodksodk@google.com',
  'redis://sd:sdssd:sd//:sodksodk@google.com',
  'redis://aaa:@aa@redsmin.com',
  'aaa://redislabs.com/aaa',
  'aaa://openredis.com/aass',
  'aaa://8.8.8.8.xip.io:293/qsd',

  // without protocol
  'plop@node-2bcdf15671b4b4806.openredis.com:11111',
  'psodk@koi.redistogo.com:1111/',
  'psodk@google.com:1111/',

  // without protocol and space
  ' aaaaa:aaaa@koi.redistogo.com:1111/'
];

var PUBLIC_URL_AUTH_PART = [
  "",
  "xdr5%RDX",
  "aaa5%AAA",
  "sdsd",
  "sd:sdssd:sd//:sodksodk",
  "sd:sdssd:sd:sodksodk",
  "sd:sdssd:sd//:sodksodk",
  "aaa:@aa",
  "",
  "",
  "",
  "plop",
  "psodk",
  "psodk",
  "aaaaa:aaaa"
];

describe('isPrivate', function () {
  it('should handle invalid empty string input', function (done) {
    isPrivate('', function (err, isPrivate) {
      t.strictEqual(err, errors.INVALID_INPUT);
      done();
    });
  });

  it('should handle invalid falsy input', function (done) {
    isPrivate(null, function (err, isPrivate) {
      t.strictEqual(err, errors.INVALID_INPUT);
      done();
    });
  });

  PRIVATE_URL.forEach(function (url) {
    it('should consider ' + url + ' private', shouldBePrivate(url));
  });

  PUBLIC_URL.forEach(function (url) {
    it('should not consider ' + url + ' private', shouldNotBePrivate(url));
  });

  ['redis://::1:6379'].forEach(function (url) {
    it('should yield an error for ' + url, function (done) {
      isPrivate(url, function (err, isPrivate) {
        t.strictEqual(err, errors.INVALID_HOSTNAME);
        t.strictEqual(isPrivate, undefined);
        done();
      });
    });
  });
});


describe('.isPrivateIncludingPublicIp', function () {
  it('should handle invalid empty string input', function (done) {
    isPrivateIncludingPublicIp('', function (err, isPrivate) {
      t.strictEqual(err, errors.INVALID_INPUT);
      done();
    });
  });

  it('should handle invalid falsy input', function (done) {
    isPrivateIncludingPublicIp(null, function (err, isPrivate) {
      t.strictEqual(err, errors.INVALID_INPUT);
      done();
    });
  });

  it('should consider specified public IP as private too', function (done) {
    publicIp(function (err, ip) {
      t.strictEqual(err, null);
      isPrivateIncludingPublicIp('aaa://plop:plop:@' + ip + '.xip.io', function (err, isPrivate) {
        t.strictEqual(err, null);
        t.strictEqual(isPrivate, true);
        done();
      });
    });
  });

  PRIVATE_URL.forEach(function (url) {
    it('should consider ' + url + ' private', shouldBePrivateIncludingIp(url));
  });

  PUBLIC_URL.forEach(function (url) {
    it('should not consider ' + url + ' private', shouldNotBePrivateIncludingIp(url));
  });
});
