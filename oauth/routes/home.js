const router = require('koa-router')()
const routes = router.get('/', async (ctx) => {
  const title = 'login home'
  await ctx.render('home', {
    title
  })
})

module.exports = routes