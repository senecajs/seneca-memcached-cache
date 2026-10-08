![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/memcached-cache

A Seneca plugin that implements the Common Cache API (`role:cache`) and
the wider memcached command set with a [memcached](https://memcached.org/)
server. Works with Seneca 3 and Seneca 4 (tested with `seneca@4.0.0-rc5`)
on Node.js 24 and 22.

[![npm version](https://img.shields.io/npm/v/@seneca/memcached-cache.svg)](https://npmjs.com/package/@seneca/memcached-cache)
[![build](https://github.com/senecajs/seneca-memcached-cache/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-memcached-cache/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-memcached-cache/badge.svg)](https://snyk.io/test/github/senecajs/seneca-memcached-cache)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/12817/branches/203963/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=12817&bid=203963)
[![Maintainability](https://api.codeclimate.com/v1/badges/ede9a6d19d8c3a75315a/maintainability)](https://codeclimate.com/github/senecajs/seneca-memcached-cache/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Install

```sh
npm install seneca @seneca/memcached-cache
```

You also need a memcached server, for example
`docker run -d -p 11211:11211 memcached:1.6-alpine`. In a clone of this
repository, `npm run services:up` starts one on host port 11311 for the tests.

## Quick Example

```js
const Seneca = require('seneca')

const seneca = Seneca()
  .quiet()
  .use('@seneca/memcached-cache', { servers: ['127.0.0.1:11311'] })

seneca.ready(async function () {
  await seneca.post('role:cache,cmd:set', { key: 'k1', val: 'v1' })
  const out = await seneca.post('role:cache,cmd:get', { key: 'k1' })
  console.log(out) // { value: 'v1' }
  await seneca.close()
})
```

## More Examples

* [Getting started](docs/tutorials/getting-started.md)
* [Configure the connection](docs/how-to/configure-the-connection.md)
* [Use the extended memcached API](docs/how-to/use-the-extended-api.md)
* [Migrate from Seneca 3](docs/how-to/migrate-from-seneca-3.md)
* Runnable programs: [docs/examples](docs/examples/)

## Motivation

Caching is a cross cutting concern that should not tie business logic to
one cache server. With the Common Cache API you send `role:cache`
messages and choose memcached by loading this plugin. See
[How the plugin works](docs/explanation/how-it-works.md).

## Support

* [GitHub issues](https://github.com/senecajs/seneca-memcached-cache/issues)
* [Seneca documentation](https://github.com/senecajs/seneca/tree/master/docs)
* Sponsored by [Voxgig](https://www.voxgig.com)

## API

Full documentation index: [docs/README.md](docs/README.md).

| Pattern | Reply | Reference |
| ------- | ----- | --------- |
| `role:cache,cmd:set` / `add` | `{ key }` | [Messages](docs/reference/messages.md#rolecachecmdset) |
| `role:cache,cmd:get` | `{ value }` | [Messages](docs/reference/messages.md#rolecachecmdget) |
| `role:cache,cmd:delete` | `{ key }` | [Messages](docs/reference/messages.md#rolecachecmddelete) |
| `role:cache,cmd:incr` / `decr` | `{ value }` | [Messages](docs/reference/messages.md#rolecachecmdincr-and-rolecachecmddecr) |
| `role:cache,cmd:clear` | `[true, ...]` | [Messages](docs/reference/messages.md#rolecachecmdclear) |
| `role:cache,get:native` | memcached client | [Messages](docs/reference/messages.md#rolecachegetnative) |
| `plugin:memcached-cache,cmd:*` | see reference | [Messages](docs/reference/messages.md#pluginmemcached-cache-actions) |

| Option | Default | Reference |
| ------ | ------- | --------- |
| `expires` | `3600` | [Options](docs/reference/options.md#expires) |
| `servers` | `['127.0.0.1:11211']` | [Options](docs/reference/options.md#servers) |
| `legacy.scalar_results` | `false` | [Options](docs/reference/options.md#legacyscalarresults) |

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open
participation. To run the tests (Node.js 24 or 22, with the Seneca 4
prerelease devDependency):

```sh
npm install
npm run services:up
npm test
npm run services:down
```

See [Run the tests locally](docs/how-to/run-the-tests-locally.md). CI
workflow changes are in [.patches](.patches/README.md); apply them with
`git am .patches/*.patch`.

## Background

Implements the Common Cache API for Seneca using memcached; originally
written by Seamus D'Arcy and Richard Rodger. See [CHANGES.md](CHANGES.md).

| Plugin version | Seneca | Node.js |
| -------------- | ------ | ------- |
| 2.2.x | 3, 4 (4.0.0-rc5 and later) | 24, 22 |
| 2.1.x | 3 | 10 and later |

License: [MIT](LICENSE).
