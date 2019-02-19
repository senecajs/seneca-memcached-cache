/* Copyright (c) 2012-2019 Richard Rodger, MIT License */
'use strict'

// run memcached for this to work!

var Assert = require('assert')
var Util = require('util')

var Lab = require('lab')
var Code = require('code')

const PluginValidator = require('seneca-plugin-validator')
const Plugin = require('..')

var Seneca = require('seneca')

var lab = (exports.lab = Lab.script())
var describe = lab.describe
var it = make_it(lab)
var expect = Code.expect

var tmx = parseInt(process.env.TIMEOUT_MULTIPLIER || 1, 10)

var seneca = Seneca()
  .test()
  .quiet()
  .use(Plugin)

var standard = require('@seneca/cache-test')

lab.test(
  'validate',
  Util.promisify(function(x, fin) {
    PluginValidator(Plugin, module)(fin)
  })
)

describe('memcached', function() {
  it('basic', function(done) {
    standard.basictest(seneca, done)
  })

  it('init', function(cb) {
    seneca.act('role:cache,cmd:delete', { key: 'a1' })
    seneca.act('role:cache,cmd:delete', { key: 'c1' })
    seneca.act('role:cache,cmd:delete', { key: 'd1' })
    cb()
  })

  it('set1', function(cb) {
    seneca.act('role:cache,cmd:set', { key: 'a1', val: 'b1' }, function(
      err,
      out
    ) {
      Assert.ok(null == err)
      Assert.equal(out.key, 'a1')
      cb()
    })
  })

  it('get1', function(cb) {
    seneca.act('role:cache,cmd:get', { key: 'a1' }, function(err, out) {
      Assert.ok(null == err)
      Assert.equal(out.value, 'b1')
      cb()
    })
  })

  it('set2', function(cb) {
    seneca.act('role:cache,cmd:set', { key: 'c1', val: 0 }, function(err, out) {
      Assert.ok(null == err)
      Assert.ok(out.key, 'c1')
      cb()
    })
  })

  it('incr1', function(cb) {
    seneca.act('role:cache,cmd:incr', { key: 'c1', val: 1 }, function(
      err,
      out
    ) {
      Assert.ok(null == err)
      Assert.equal(out.value, 1)
      cb()
    })
  })

  it('get2', function(cb) {
    seneca.act('role:cache,cmd:get', { key: 'c1' }, function(err, out) {
      Assert.ok(null == err)
      Assert.equal(1, out.value)
      cb()
    })
  })

  it('incr2', function(cb) {
    seneca.act('role:cache,cmd:incr', { key: 'c1', val: 1 }, function(
      err,
      out
    ) {
      Assert.ok(null == err)
      Assert.equal(out.value, 2)
      cb()
    })
  })

  it('get3', function(cb) {
    seneca.act('role:cache,cmd:get', { key: 'c1' }, function(err, out) {
      Assert.ok(null == err)
      Assert.equal(2, out.value)
      cb()
    })
  })

  it('delete', function(cb) {
    seneca.act('role:cache,cmd:delete', { key: 'c1' }, function(err, out) {
      Assert.ok(null == err)
      Assert.equal(out.key, 'c1')
      cb()
    })
  })

  it('add', function(cb) {
    seneca.act('role:cache,cmd:add', { key: 'd1', val: 'e1' }, function(
      err,
      out
    ) {
      Assert.ok(null == err)
      Assert.equal(out.key, 'd1')
      cb()
    })
  })

  it("won't add if key already exists", function(cb) {
    seneca.act('role:cache,cmd:add', { key: 'd1', val: 'e2' }, function(
      err,
      out
    ) {
      Assert(err)
      cb()
    })
  })

  it('noop if key does not exist', function(cb) {
    seneca.act('role:cache,cmd:delete', { key: 'zzz' }, function(err, out) {
      Assert.ok(null == err)
      Assert.equal(out.key, 'zzz')
      cb()
    })
  })

  it("won't incr unless value is an integer", function(cb) {
    seneca.act('role:cache,cmd:incr', { key: 'd1', val: 1 }, function(
      err,
      out
    ) {
      Assert(err)
      cb()
    })
  })
})

function make_it(lab) {
  return function it(name, opts, func) {
    if ('function' === typeof opts) {
      func = opts
      opts = {}
    }

    lab.it(
      name,
      opts,
      Util.promisify(function(x, fin) {
        func(fin)
      })
    )
  }
}
