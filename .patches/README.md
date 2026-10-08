# Workflow patches

GitHub requires the `workflow` OAuth scope to add or change files under
`.github/workflows/`. The session that prepared this branch did not have
it, so the workflow change is provided here as a git patch instead.

Apply it from a checkout with normal credentials:

```sh
git am .patches/*.patch
git rm -r .patches
git commit -m "ci: remove applied workflow patches"
git push
```

| Patch | Changes |
| ----- | ------- |
| `0001-ci-run-the-build-on-master-with-a-memcached-service-.patch` | `.github/workflows/build.yml`: triggers on `master` and `main`, Node.js 24 and 22 on `ubuntu-latest`, and a `memcached:1.6-alpine` service container on host port 11311 with a health check (`echo version \| nc`), the same port and env variables (`SENECA_TEST_MEMCACHED_HOST`, `SENECA_TEST_MEMCACHED_PORT`) as `docker-compose.yml` and the tests. |

`git apply --check .patches/*.patch` verifies that the patch applies.
