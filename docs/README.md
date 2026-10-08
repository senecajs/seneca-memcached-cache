# @seneca/memcached-cache documentation

The documentation follows the [Diátaxis](https://diataxis.fr/) structure.
Start with the tutorial, use the how-to guides for specific tasks, look
things up in the reference, and read the explanation to understand the
design.

## Tutorials

| Tutorial | What you build |
| -------- | -------------- |
| [Getting started](tutorials/getting-started.md) | A program that stores, reads, increments and deletes values in memcached. |

The programs are in [examples](examples/).

## How-to guides

| Guide | Covers |
| ----- | ------ |
| [Configure the connection](how-to/configure-the-connection.md) | Servers, expiry, memcached client options. |
| [Use the extended memcached API](how-to/use-the-extended-api.md) | `plugin:memcached-cache` actions and the native client. |
| [Run the tests locally](how-to/run-the-tests-locally.md) | Docker memcached, environment variables, Seneca 4 builds, Node 22. |
| [Migrate from Seneca 3](how-to/migrate-from-seneca-3.md) | What changes for users of this plugin on Seneca 4. |

## Reference

| Reference | Describes |
| --------- | --------- |
| [Options](reference/options.md) | Every plugin option and the connection settings. |
| [Messages](reference/messages.md) | Every action pattern: parameters, reply, errors. |

## Explanation

| Page | Discusses |
| ---- | --------- |
| [How the plugin works](explanation/how-it-works.md) | Lifecycle, the Common Cache API, closing, Seneca 3 versus 4, limits. |

## Feature index

| Feature | Kind | Documented in |
| ------- | ---- | ------------- |
| `expires` | option | [Options](reference/options.md#expires) |
| `servers` | option | [Options](reference/options.md#servers) |
| `legacy.scalar_results` | option | [Options](reference/options.md#legacyscalarresults) |
| memcached client options | option | [Options](reference/options.md#memcached-client-options) |
| `init:memcached-cache` | action | [Messages](reference/messages.md#initmemcached-cache) |
| `role:cache,cmd:set` | action | [Messages](reference/messages.md#rolecachecmdset) |
| `role:cache,cmd:get` | action | [Messages](reference/messages.md#rolecachecmdget) |
| `role:cache,cmd:add` | action | [Messages](reference/messages.md#rolecachecmdadd) |
| `role:cache,cmd:delete` | action | [Messages](reference/messages.md#rolecachecmddelete) |
| `role:cache,cmd:incr` | action | [Messages](reference/messages.md#rolecachecmdincr-and-rolecachecmddecr) |
| `role:cache,cmd:decr` | action | [Messages](reference/messages.md#rolecachecmdincr-and-rolecachecmddecr) |
| `role:cache,cmd:clear` | action | [Messages](reference/messages.md#rolecachecmdclear) |
| `role:cache,get:native` | action | [Messages](reference/messages.md#rolecachegetnative) |
| `plugin:memcached-cache,cmd:set` / `get` / `add` / `delete` / `incr` / `decr` | action | [Messages](reference/messages.md#pluginmemcached-cache-actions) |
| `plugin:memcached-cache,cmd:replace` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdreplace) |
| `plugin:memcached-cache,cmd:append` / `prepend` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdappend-and-cmdprepend) |
| `plugin:memcached-cache,cmd:cas` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdcas) |
| `plugin:memcached-cache,cmd:gets` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdgets) |
| `plugin:memcached-cache,cmd:stats` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdstats) |
| `plugin:memcached-cache,cmd:flush` | action | [Messages](reference/messages.md#pluginmemcached-cachecmdflush) |
| close hook (`sys:seneca,cmd:close` / `role:seneca,cmd:close`) | action | [Messages](reference/messages.md#close-hook) |
| `SENECA_TEST_MEMCACHED_HOST`, `SENECA_TEST_MEMCACHED_PORT` | env (tests, examples) | [Run the tests locally](how-to/run-the-tests-locally.md) |

The plugin defines no error codes, exports and command line flags.
