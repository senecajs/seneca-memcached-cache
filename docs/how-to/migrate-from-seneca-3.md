# Migrate from Seneca 3

Goal: run an application that uses this plugin on Seneca 4.

1. Upgrade to `@seneca/memcached-cache` 2.2.0 or later. Earlier versions
   register their close hook only on `role:seneca,cmd:close`, which
   `seneca@4.0.0-rc5` never calls, so `seneca.close()` left the
   memcached connection open and the process did not exit.

2. Move plugin options into `use()` or `options.plugin['memcached-cache']`.
   Seneca 4 ignores a top level `memcached-cache` options block.

3. Expect unwrapped errors. With Seneca 4 defaults the `act` callback or
   rejected `post` receives the memcached client error itself, for
   example `err.message === 'Item is not stored'`, not
   `seneca: Action ... failed: ...`.

4. If you `await seneca.ready()` on an otherwise idle instance with
   `seneca@4.0.0-rc5`, use the callback form instead:
   `await new Promise((resolve) => seneca.ready(resolve))`.

The action patterns and replies are unchanged.
