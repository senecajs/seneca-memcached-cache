# Changes

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
