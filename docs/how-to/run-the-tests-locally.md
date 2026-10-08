# Run the tests locally

Goal: run the test suite against a real memcached server.

1. Use Node.js 24 (Node.js 22 is also supported) and install:

   ```sh
   npm install
   ```

2. Start memcached with Docker. `docker-compose.yml` runs
   `memcached:1.6-alpine` as container `seneca-memcached-cache-memcached`
   on host port 11311 and waits until it is healthy:

   ```sh
   npm run services:up
   ```

3. Run the tests:

   ```sh
   npm test
   ```

   The tests and examples read these environment variables:

   | Variable | Default |
   | -------- | ------- |
   | `SENECA_TEST_MEMCACHED_HOST` | `127.0.0.1` |
   | `SENECA_TEST_MEMCACHED_PORT` | `11311` |

   To use another server: `SENECA_TEST_MEMCACHED_PORT=11211 npm test`.

4. Optionally test against another Seneca build, then restore the
   devDependency:

   ```sh
   npm install --no-save /path/to/seneca-4.0.0.tgz
   npm test
   npm install
   ```

5. Stop memcached:

   ```sh
   npm run services:down
   ```

`npm test` does not start Docker. In GitHub Actions the same image runs
as a service container on the same port (see the patch in `.patches/`).
`npm run test-cov-html` writes an HTML coverage report to
`test/coverage.html`.
