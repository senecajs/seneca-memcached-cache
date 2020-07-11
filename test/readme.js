var seneca = require('seneca')()
seneca.use('../')

seneca.ready(function () {
  test1(function () {
    seneca.close()
  })
})

function test1(done) {
  seneca.act({ role: 'cache', cmd: 'set', key: 'k1', val: 'v1' }, function (
    err
  ) {
    seneca.act({ role: 'cache', cmd: 'get', key: 'k1' }, function (err, out) {
      console.log('value = ' + out)
      return done()
    })
  })
}
