const
  Koa = require("koa"),
  http = require('koa-bodyparser'),
  router = require('./router'),
  template = require('./template'),
  app = new Koa(),
  isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  let
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(http());

app.use(template('view', {
  noCache: !isProduction,
  watch: !isProduction
}));

app.use(router());

app.listen(3000);
console.log("app started at port 3000");