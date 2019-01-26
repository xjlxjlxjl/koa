module.exports = {
  'GET /login': async (ctx, next) => ctx.render('login/login.html', {
    title: '登陆'
  }),
  'POST /login': async (ctx, next) => {
    let
      params = ctx.request.body,
      name = params.name || '',
      password = params.password || '';
    if (name == 'xjl' && password == 'a123456') this.redirect('/')
  },
  'GET /sign': async (ctx, next) => ctx.render('login/sign.html', {
    title: '注册'
  }),
  'POST /sign': async (ctx, next) => {
    let params = ctx.request.body;
  }
}