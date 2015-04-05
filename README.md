# url-is-private [![Build Status](https://drone.io/github.com/FGRibreau/url-is-private/status.png)](https://drone.io/github.com/FGRibreau/url-is-private/latest)


> Check whether or not an url hostname refers to a private IP

## Setup

```shell
npm install url-is-private
```

<p align="center">
<a target="_blank" href="https://play.spotify.com/track/5vrwlyErg2E1bnDVLH5GhH"><img style="width:100%" src="https://cloud.githubusercontent.com/assets/138050/6993821/c4e023a6-db01-11e4-85aa-840078efe431.gif"></a>
</p>

## Usage

#### `isPrivate(hostname: {String}, f: (err : {Error,Null}, isPrivate: {Boolean}))`

```javascript
var isPrivate = require('url-is-private').isPrivate;

isPrivate('http://127.0.0.1.xip.io', function(err, isPrivate){
    console.log(err === null, isPrivate == true);
});

isPrivate('myprotocol://auth@localhost', function(err, isPrivate){
    console.log(err === null, isPrivate === true);
});

isPrivate('https://google.com', function(err, isPrivate){
    console.log(err === null, isPrivate === false);
});
```

#### `isPrivateIncludingPublicIp(hostname: {String}, f: (err : {Error,Null}, isPrivateIncludingPublicIp: {Boolean}))`

```javascript
var isPrivateIncludingPublicIp = require('url-is-private').isPrivateIncludingPublicIp;

isPrivateIncludingPublicIp('YOUR-PUBLIC-IP.xip.io', function(err, isPrivate){
    console.log(err === null, isPrivate == true);
});

isPrivate('localhost', function(err, isPrivate){
    console.log(err === null, isPrivate === true);
});

isPrivate('google.com', function(err, isPrivate){
    console.log(err === null, isPrivate === false);
});
```

## How it works

It uses [dns.resolve](https://nodejs.org/api/all.html#all_dns_resolve_hostname_rrtype_callback) underneath and [ip.isPrivate](https://github.com/indutny/node-ip#ip) to check if the resolved IP is private (or not).

## [Changelog](/CHANGELOG.md)
