# Messages

All replies below are with `legacy.scalar_results: false` (the default).
Errors are those of the [memcached](https://www.npmjs.com/package/memcached)
client, passed through unchanged. On Seneca 4 the caller receives that
error itself (`err.message`), on Seneca 3 wrapped in a Seneca error.

## role:cache,cmd:set

Store a value. Parameters: `key` (string), `val`, `expires` (optional
seconds, default option `expires`). Reply: `{ key }`.

## role:cache,cmd:get

Read a value. Parameters: `key`. Reply: `{ value }`; `value` is
`undefined` when the key does not exist. Objects are stored as JSON by
the client and come back as objects.

## role:cache,cmd:add

Store a value only if the key does not exist. Parameters as for `set`.
Reply: `{ key }`. Error `Item is not stored` when the key exists.

## role:cache,cmd:delete

Delete a key. Parameters: `key`. Reply: `{ key }`, also when the key did
not exist.

## role:cache,cmd:incr and role:cache,cmd:decr

Increment or decrement an integer value. Parameters: `key`, `val`
(integer). Reply: `{ value }` with the new value, or `{ value: false }`
when the key does not exist. Error
`cannot increment or decrement non-numeric value` for a non numeric value.

## role:cache,cmd:clear

Flush all servers (memcached `flush_all`). Reply: an array with one
`true` per server.

## role:cache,get:native

Reply: the memcached client instance (`Client` from the memcached
package).

## plugin:memcached-cache actions

`plugin:memcached-cache,cmd:set`, `get`, `add`, `delete`, `incr` and
`decr` are the same functions as the `role:cache` actions above.

## plugin:memcached-cache,cmd:replace

Replace the value of an existing key. Parameters as for `set`. Reply:
`{ key }`. Error `Item is not stored` when the key does not exist.

## plugin:memcached-cache,cmd:append and cmd:prepend

Intended to append or prepend `val` to an existing value. Currently
broken: the plugin passes an `expires` argument the memcached client
does not accept for these commands, and the action fails with
`args.callback is not a function`.

## plugin:memcached-cache,cmd:cas

Intended for check and set. Currently broken: the plugin does not pass
the CAS token, and the action never replies (it ends with a Seneca
`action_timeout`).

## plugin:memcached-cache,cmd:gets

Read a value and its CAS token. Parameters: `key`. Reply:
`{ value: { <key>: <value>, cas: <token string> } }`.

## plugin:memcached-cache,cmd:stats

Reply: an array with one statistics object per server (fields such as
`server`, `version`, `uptime`, `curr_items`).

## plugin:memcached-cache,cmd:flush

Same as `role:cache,cmd:clear`.

## init:memcached-cache

Plugin initialization. Creates the memcached client from `servers` and
the options. Called by Seneca; do not send it yourself.

## close hook

The plugin adds a priority action on `sys:seneca,cmd:close` (Seneca 4)
or `role:seneca,cmd:close` (Seneca 3). It calls `end()` on the client
and then continues the close chain, so `seneca.close()` releases the
connection.
