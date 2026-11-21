# Migrate from Seneca 3

Goal: run an application that uses this plugin on Seneca 4.

1. Upgrade to `@seneca/memcached-cache` 3 and Seneca 4, on Node.js 24 or
   later: `npm install seneca@^4 @seneca/memcached-cache@^3`. Version 3
   declares the peer dependency `seneca` `^4.0.0` and registers its close
   hook on `sys:seneca,cmd:close`. Version 2.1 registers it on
   `role:seneca,cmd:close`, which Seneca 4 still calls, with the
   `SENECA_DEP_LEGACY_CLOSE_HOOK` warning.

2. Move plugin options into `use()` or `options.plugin['memcached-cache']`.
   Seneca 4 ignores a top level `memcached-cache` options block.

3. Expect unwrapped errors. With Seneca 4 defaults the `act` callback or
   rejected `post` receives the memcached client error itself, for
   example `err.message === 'Item is not stored'`, not
   `seneca: Action ... failed: ...`.

The action patterns and replies are unchanged.
