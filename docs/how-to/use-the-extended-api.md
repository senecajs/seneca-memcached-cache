# Use the extended memcached API

Goal: use memcached commands that are not part of the Common Cache API.

1. Send messages with `plugin:memcached-cache` and one of the commands
   listed in [Messages](../reference/messages.md#pluginmemcached-cache-actions):

   ```js
   const p = 'plugin:memcached-cache'
   await seneca.post(p + ',cmd:flush')
   await seneca.post(p + ',cmd:set', { key: 'g', val: 'abc' })
   await seneca.post(p + ',cmd:replace', { key: 'g', val: 'r' })
   console.log(await seneca.post(p + ',cmd:gets', { key: 'g' }))
   // { value: { g: 'r', cas: '73' } }
   ```

2. Handle refused writes. `add` on an existing key and `replace` on a
   missing key fail with the memcached client error:

   ```js
   try {
     await seneca.post(p + ',cmd:add', { key: 'g', val: 'x' })
   } catch (err) {
     console.log(err.message) // Item is not stored
   }
   ```

3. For anything else, get the native
   [memcached](https://www.npmjs.com/package/memcached) client:

   ```js
   const client = await seneca.post('role:cache,get:native')
   ```

`append`, `prepend` and `cas` do not currently work; see
[Messages](../reference/messages.md#pluginmemcached-cachecmdappend-and-cmdprepend).
The complete program is [examples/extended-api.js](../examples/extended-api.js).
