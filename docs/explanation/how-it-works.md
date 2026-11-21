# How the plugin works

## One client per plugin instance

The plugin creates a single memcached client in `init:memcached-cache`.
The client connects lazily on the first command and keeps its
connections pooled. Every action maps one message to one client call
and translates the reply into `{ key }` or `{ value }`.

## Two sets of patterns

`role:cache` is the Common Cache API shared by Seneca cache plugins
(`set`, `get`, `add`, `delete`, `incr`, `decr`, `clear`). Code written
against it can swap memcached for another cache plugin.
`plugin:memcached-cache` exposes memcached specific commands as well.
`role:cache,get:native` is the escape hatch for everything else.

## Closing

The client holds open sockets, so the plugin must end it when Seneca
closes, or the Node.js process does not exit. Seneca 4 closes through
`sys:seneca,cmd:close`, and the plugin adds a priority action on that
pattern.

## Seneca 3 versus 4

Version 3 of the plugin supports Seneca 4 only. Version 2.1 supports
Seneca 3. What differs for users of the plugin:

| | Seneca 3 | Seneca 4 |
| - | -------- | -------- |
| Close hook pattern | `role:seneca,cmd:close` | `sys:seneca,cmd:close` |
| Error passed to callers | Seneca wrapper, original in `err.orig` | original client error |
| Top level `memcached-cache` options | merged | ignored |

## Limits

* `append`, `prepend` and `cas` do not work (see
  [Messages](../reference/messages.md#pluginmemcached-cachecmdappend-and-cmdprepend)).
* The [memcached](https://www.npmjs.com/package/memcached) client
  (2.2.2) has not been released since 2018.
* A message `expires` of `0` falls back to the `expires` option.
