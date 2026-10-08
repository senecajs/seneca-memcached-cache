# Configure the connection

Goal: point the plugin at your memcached servers and set the default
expiry.

1. Pass `servers` as an array of `host:port` strings (or anything the
   [memcached](https://www.npmjs.com/package/memcached) client accepts as
   its first constructor argument):

   ```js
   seneca.use('@seneca/memcached-cache', {
     servers: ['10.0.0.1:11211', '10.0.0.2:11211'],
   })
   ```

2. Set `expires` (seconds) for values stored without their own `expires`:

   ```js
   seneca.use('@seneca/memcached-cache', { expires: 60 })
   ```

   A single message can override it: `{ role: 'cache', cmd: 'set', key, val, expires: 10 }`.

3. Pass any other memcached client option in the same object, for
   example `timeout`, `retries` or `poolSize`. The whole options object
   is handed to the client constructor.

4. On Seneca 4 options come only from `use()` or `options.plugin['memcached-cache']`:

   ```js
   const seneca = Seneca({
     plugin: { 'memcached-cache': { servers: ['127.0.0.1:11211'] } },
   }).use('@seneca/memcached-cache')
   ```

   A top level `memcached-cache` options block is not merged on Seneca 4.

See [Options](../reference/options.md) for every option.
