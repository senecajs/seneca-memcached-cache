# Options

Set options with `seneca.use('@seneca/memcached-cache', { ... })` or
`options.plugin['memcached-cache']`. Defaults are merged with
`seneca.util.deepextend` in [memcached-cache.js](../../memcached-cache.js).

| Option | Type | Default | Effect |
| ------ | ---- | ------- | ------ |
| `expires` | number (seconds) | `3600` | Lifetime for `set`, `add`, `replace` and `cas` when the message has no `expires`. |
| `servers` | array of `host:port` strings | `['127.0.0.1:11211']` | First argument of the memcached client constructor. |
| `legacy.scalar_results` | boolean | `false` | Reply with bare values instead of `{ key }` / `{ value }` objects. |

## expires

Seconds. A message can override it with its own `expires` parameter. A
falsy message value (for example `0`) falls back to this option.

## servers

Passed unchanged to `new Memcached(servers, options)`. The memcached
client also accepts a single string or an object of server weights.

## legacy.scalar_results

When `true`, `set`, `add`, `replace`, `append`, `prepend`, `cas` and
`delete` reply with the key string, and `get`, `gets`, `incr` and `decr`
with the raw value. Seneca rejects non-object results by default
(`result_not_objarr`), so this needs the Seneca option
`strict: { result: false }`.

## memcached client options

The whole options object, including the options above, is passed as the
second argument to the [memcached](https://www.npmjs.com/package/memcached)
client constructor, so its options (`timeout`, `retries`, `retry`,
`poolSize`, `reconnect`, `idle` and others) can be given directly.

## Connection settings for tests

The tests and examples build `servers` from `SENECA_TEST_MEMCACHED_HOST`
(default `127.0.0.1`) and `SENECA_TEST_MEMCACHED_PORT` (default `11311`).
The plugin itself does not read environment variables.
