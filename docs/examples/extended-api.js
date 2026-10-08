// The plugin:memcached-cache actions add, replace, gets, stats and flush,
// and the native client. (append, prepend and cas are currently broken,
// see docs/reference/messages.md.)
const Seneca = require('seneca')

const host = process.env.SENECA_TEST_MEMCACHED_HOST || '127.0.0.1'
const port = process.env.SENECA_TEST_MEMCACHED_PORT || '11311'

async function main() {
  const seneca = Seneca({ legacy: false })
    .quiet()
    .use(require('../..'), { servers: [host + ':' + port] })

  await new Promise((resolve) => seneca.ready(resolve))
  const p = 'plugin:memcached-cache'

  await seneca.post(p + ',cmd:flush')
  await seneca.post(p + ',cmd:set', { key: 'g', val: 'abc' })
  console.log(await seneca.post(p + ',cmd:get', { key: 'g' }))

  try {
    await seneca.post(p + ',cmd:add', { key: 'g', val: 'x' })
  } catch (err) {
    console.log('add failed:', err.message)
  }

  await seneca.post(p + ',cmd:replace', { key: 'g', val: 'r' })
  console.log(await seneca.post(p + ',cmd:gets', { key: 'g' }))

  const stats = await seneca.post(p + ',cmd:stats')
  console.log('stats servers:', stats.length, 'has version:', !!stats[0].version)

  const client = await seneca.post('role:cache,get:native')
  console.log('native client:', client.constructor.name)

  await seneca.close()
}

main()
