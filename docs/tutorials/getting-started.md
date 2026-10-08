# Getting started

You will connect Seneca to memcached and use the Common Cache API to
store, read, increment and delete values.

## 1. Install

```sh
npm install seneca @seneca/memcached-cache
```

You need a running memcached server. With Docker, from a clone of this
repository:

```sh
npm run services:up
```

This starts `memcached:1.6-alpine` on host port 11311.

## 2. Write the program

Save as `getting-started.js` (this is
[examples/getting-started.js](../examples/getting-started.js)):

```js
const Seneca = require('seneca')

const host = process.env.SENECA_TEST_MEMCACHED_HOST || '127.0.0.1'
const port = process.env.SENECA_TEST_MEMCACHED_PORT || '11311'

async function main() {
  const seneca = Seneca({ legacy: false })
    .quiet()
    .use('@seneca/memcached-cache', { servers: [host + ':' + port], expires: 60 })

  await new Promise((resolve) => seneca.ready(resolve))

  console.log(await seneca.post('role:cache,cmd:set', { key: 'k1', val: 'v1' }))
  console.log(await seneca.post('role:cache,cmd:get', { key: 'k1' }))

  await seneca.post('role:cache,cmd:set', { key: 'n1', val: 10 })
  console.log(await seneca.post('role:cache,cmd:incr', { key: 'n1', val: 5 }))
  console.log(await seneca.post('role:cache,cmd:decr', { key: 'n1', val: 3 }))

  console.log(await seneca.post('role:cache,cmd:delete', { key: 'k1' }))
  console.log(await seneca.post('role:cache,cmd:get', { key: 'k1' }))

  await seneca.close()
}

main()
```

## 3. Run it

```sh
node getting-started.js
```

Output with `seneca@4.0.0-rc5`:

```
{ key: 'k1' }
{ value: 'v1' }
{ value: 15 }
{ value: 12 }
{ key: 'k1' }
{ value: undefined }
```

## What happened

* `use` registered the cache actions. The memcached client was created
  in the plugin's `init:memcached-cache` action.
* `set` and `delete` reply with the key; `get`, `incr` and `decr` reply
  with the value. A missing key gives `{ value: undefined }`.
* `ready` is awaited through its callback form, which works on every
  Seneca 4 build (see [How the plugin works](../explanation/how-it-works.md)).
* `close` ran the plugin's close hook, which ended the memcached
  connection, so the process exits.

## Next steps

* [Configure the connection](../how-to/configure-the-connection.md)
* [Use the extended memcached API](../how-to/use-the-extended-api.md)
* [Messages reference](../reference/messages.md)
