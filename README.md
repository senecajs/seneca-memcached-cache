![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/memcached-cache

[![npm version](https://img.shields.io/npm/v/@seneca/memcached-cache.svg)](https://npmjs.com/package/@seneca/memcached-cache)
[![build](https://github.com/senecajs/seneca-memcached-cache/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-memcached-cache/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-memcached-cache/badge.svg)](https://snyk.io/test/github/senecajs/seneca-memcached-cache)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/12817/branches/203963/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=12817&bid=203963)
[![Maintainability](https://api.codeclimate.com/v1/badges/ede9a6d19d8c3a75315a/maintainability)](https://codeclimate.com/github/senecajs/seneca-memcached-cache/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Install

```sh
npm install seneca
npm install seneca-memcached-cache
```

You'll also need [memcached](http://memcached.org/)

## Quick Example

This code snippet sets a value and then retrieves it. You'll need to have memcached running for this to work:

```sh
$ memcached -vv
```

```js
var seneca = require('seneca')();
seneca.use('memcached-cache');

seneca.ready(function(err) {
  seneca.act({role: 'cache', cmd: 'set', key: 'k1', val: 'v1'}, function(err) {
    seneca.act({role: 'cache', cmd: 'get', key: 'k1'}, function(err, out) {
      console.log('value = ' + out)
    });
  });
});
```

## More Examples

See [test/](test/) for more usage examples.

## Motivation

Memcached caching plugin for the Seneca framework.

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-memcached-cache/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

### Options

* `` : object <i><small>"&nbsp;"</small></i>

Set plugin options when loading with:
```js
seneca.use('memcached-cache', { name: value, ... })

```

<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 

<!--END:options-->

<!--START:action-list-->

### Action Patterns

* [cmd:add,plugin:memcached-cache](#-cmdaddpluginmemcachedcache-)
* [cmd:append,plugin:memcached-cache](#-cmdappendpluginmemcachedcache-)
* [cmd:cas,plugin:memcached-cache](#-cmdcaspluginmemcachedcache-)
* [cmd:decr,plugin:memcached-cache](#-cmddecrpluginmemcachedcache-)
* [cmd:delete,plugin:memcached-cache](#-cmddeletepluginmemcachedcache-)
* [cmd:flush,plugin:memcached-cache](#-cmdflushpluginmemcachedcache-)
* [cmd:get,plugin:memcached-cache](#-cmdgetpluginmemcachedcache-)
* [cmd:gets,plugin:memcached-cache](#-cmdgetspluginmemcachedcache-)
* [cmd:incr,plugin:memcached-cache](#-cmdincrpluginmemcachedcache-)
* [cmd:prepend,plugin:memcached-cache](#-cmdprependpluginmemcachedcache-)
* [cmd:replace,plugin:memcached-cache](#-cmdreplacepluginmemcachedcache-)
* [cmd:set,plugin:memcached-cache](#-cmdsetpluginmemcachedcache-)
* [cmd:stats,plugin:memcached-cache](#-cmdstatspluginmemcachedcache-)
* [init:memcached-cache](#-initmemcachedcache-)
* [role:cache,cmd:add](#-rolecachecmdadd-)
* [role:cache,cmd:clear](#-rolecachecmdclear-)
* [role:cache,cmd:decr](#-rolecachecmddecr-)
* [role:cache,cmd:delete](#-rolecachecmddelete-)
* [role:cache,cmd:get](#-rolecachecmdget-)
* [role:cache,cmd:incr](#-rolecachecmdincr-)
* [role:cache,cmd:set](#-rolecachecmdset-)
* [role:cache,get:native](#-rolecachegetnative-)

<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

### &laquo; `cmd:add,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:append,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:cas,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:decr,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:delete,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:flush,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:get,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:gets,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:incr,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:prepend,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:replace,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:set,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `cmd:stats,plugin:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `init:memcached-cache` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:add` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:clear` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:decr` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:delete` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:get` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:incr` &raquo;

No description provided.

----------
### &laquo; `role:cache,cmd:set` &raquo;

No description provided.

----------
### &laquo; `role:cache,get:native` &raquo;

No description provided.

----------

<!--END:action-desc-->

### Common Cache API

Seneca has a common caching API with the following actions:

   * `role:cache, cmd:set` store a value - _key_ and _val_ arguments required
   * `role:cache, cmd:get` retreive a value - _key_ argument is required
   * `role:cache, cmd:add` store a value, only if the key does not exist - _key_ and _val_ arguments required
   * `role:cache, cmd:delete` delete a value - _key_ argument is required, no error if key does not exist
   * `role:cache, cmd:incr` increment a value - _key_ and _val_ (integer) arguments required
   * `role:cache, cmd:decr` decrement a value - _key_ and _val_ (integer) arguments required

All caching plugins, including this one, implement this action API.

### Extended API

The full [memcached API](https://code.google.com/p/memcached/wiki/NewCommands) is also available. Use the action pattern
_plugin:memcached, cmd:..._ where cmd is one of 
_set, get, add, delete, incr, decr, replace, append, prepend, cas, gets, stats, flush_.

To access the underlying [memcached instance](https://github.com/3rd-Eden/node-memcached), 
use the action _plugin:memcached, cmd:native_.

The plugin also registers with the action _role:seneca, cmd:close_. This closes the memcached connection when you call the _seneca.close_ method.

### Options

You can use any of the options from the [node-memcached](https://github.com/3rd-Eden/node-memcached)
module directly as options to this plugin:

```JavaScript
seneca.use('memcached',{
  servers:[ '127.0.0.1:11211', '127.0.0.1:11212' ],
  expires: 60
})
```

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Implements the [Common Cache API](https://github.com/senecajs/seneca-cache) for Seneca using Memcached.
