# url-is-private [![Build Status](https://drone.io/github.com/FGRibreau/url-is-private/status.png)](https://drone.io/github.com/FGRibreau/url-is-private/latest)

> Check whether or not a url hostname refers to a private IP

## Setup

```shell
npm install url-is-private
```

<p align="center">
<a target="_blank" href="https://play.spotify.com/track/1HDLnDrZSxZ2Rb1yq9nZKK"><img style="width:100%" src="https://cloud.githubusercontent.com/assets/138050/6997063/7e747d58-dbac-11e4-8295-b2082f05697a.gif"></a>
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

isPrivate('http://ok:ok@localhost.xip.io:293/', function(err, isPrivate){
    console.log(err === null, isPrivate === true);
});

isPrivate('http://google.com/', function(err, isPrivate){
    console.log(err === null, isPrivate === false);
});
```

## How it works

url-is-private uses [hostname-is-private](https://github.com/FGRibreau/hostname-is-private) underneath.

## [Changelog](/CHANGELOG.md)
