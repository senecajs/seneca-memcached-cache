# Changes

## 3.0.0 2026-11-21

* Seneca 4: the peer dependency is `seneca` `^4.0.0`. Seneca 3 users stay
  on `@seneca/memcached-cache@2`.
* Node.js 24 or later (`engines.node` `>=24`).
* 2.2.0 was not published. Its changes, listed in the 2.2.0 entry below,
  are part of 3.0.0.
* The close hook is registered on `sys:seneca,cmd:close` only. The
  Seneca 3 branch on `role:seneca,cmd:close` is removed.
* Options are merged with `seneca.util.deep` instead of the deprecated
  `seneca.util.deepextend` (`SENECA_DEP_UTIL_DEEPEXTEND`). The result is
  the same.
* Development dependencies: `seneca` `^4.0.0` (was `^4.0.0-rc5`),
  `@seneca/cache-test` `^3.0.0`, `seneca-plugin-validator` `^0.7.0` and
  `@seneca/doc` `^9.0.0`. The tests use `await seneca.ready()`.
* Documentation: the Seneca 3, Node.js 22 and `4.0.0-rc5` notes are
  removed, and install lines name `seneca@^4`.

## 2.2.0

* Seneca 4 prerelease support (`seneca@4.0.0-rc5` and the 4.0.0 build):
  the close hook is registered on `sys:seneca,cmd:close` under Seneca 4
  (and `role:seneca,cmd:close` under Seneca 3), so `seneca.close()` ends
  the memcached connection again.
* Tested on Node.js 24 and 22.
* Tests run against a Docker memcached 1.6 (`npm run services:up`,
  host port 11311, `SENECA_TEST_MEMCACHED_HOST`/`_PORT`), verify that
  close ends the connection, and close every Seneca instance.
* Test runner: `@hapi/lab` 26 and `@hapi/code` 9; linting removed from
  `npm test`; coverage HTML moved to `npm run test-cov-html`.
* Removed `.travis.yml`, the coveralls script, the tracked coverage
  report and the lockfile that pointed at a local registry.
* Documentation reorganized into `docs/` (Diátaxis).
* CI workflow update delivered in `.patches/` (memcached service
  container, triggers on `master`).
