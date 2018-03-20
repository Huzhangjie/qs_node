var _ = require('lodash')
var request = require('request')

function spider(opts, callback, handleMap) {
  if(_.isObject(callback) && _.isUndefined(handleMap)) {
    handleMap = callback
    opts.callback = getHandle(
      opts.callback, handleMap,
      opts
    )
  } else if(_.isObject(opts) && _.isFunction(callback)) {
    opts.callback = getHandle(callback, handleMap, opts)
  } else if(_.isString(opts)) {
    opts = {
      url: opts,
      callback: getHandle(callback, handleMap, opts),
    }
  }
  return request(opts)
}

module.exports = spider

function getHandle( callback, map, opts) {
  return function(error, response, body) {
    if(!error) {
      try {
        body = JSON.parse(body)
      } catch (error) {}
      callback(error, parser(body, map), response)      
    } else {
      callback(error, body, response)
    }
  }
}