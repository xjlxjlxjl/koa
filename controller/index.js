module.exports = {
  'GET /': async (ctx, next) => ctx.render('index.html', {
    title: 'Welcome'
  }),
  'GET /a': async (ctx, next) => ctx.render('a/a.html', {
    title: 'aaaa'
  })
}