const fs = require('fs');

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir)
    .filter(f => {
      return f.endsWith('.js');
    }).forEach(e => {
      console.log(`process controller: ${e}...`);
      let mapping = require(__dirname + '/' + dir + '/' + e);
      addMapping(router, mapping);
    })
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controller',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
}