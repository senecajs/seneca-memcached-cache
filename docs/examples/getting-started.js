// Set, read, increment and delete cache values in memcached.
// Start memcached first: npm run services:up (host port 11311).
const Seneca = require('seneca')

const host = process.env.SENECA_TEST_MEMCACHED_HOST || '127.0.0.1'
const port = process.env.SENECA_TEST_MEMCACHED_PORT || '11311'

async function main() {
  const seneca = Seneca({ legacy: false })
    .quiet()
    .use(require('../..'), { servers: [host + ':' + port], expires: 60 })

  await new Promise((resolve) => seneca.ready(resolve))

  console.log(await seneca.post('role:cache,cmd:set', { key: 'k1', val: 'v1' }))
  console.log(await seneca.post('role:cache,cmd:get', { key: 'k1' }))

  await seneca.post('role:cache,cmd:set', { key: 'n1', val: 10 })
  console.log(await seneca.post('role:cache,cmd:incr', { key: 'n1', val: 5 }))
  console.log(await seneca.post('role:cache,cmd:decr', { key: 'n1', val: 3 }))

  console.log(await seneca.post('role:cache,cmd:delete', { key: 'k1' }))
  console.log(await seneca.post('role:cache,cmd:get', { key: 'k1' }))

  await seneca.close()
}

main()
