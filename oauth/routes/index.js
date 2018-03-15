const router = require('koa-router')()

// 中间件 koa async函数0
// /home 路由中间件
const home = require('./home')
const github = require('./github')

router.use('/home', home.routes(), home.allowedMethods())
router.use('/github', github.routes(), github.allowedMethods())

module.exports = router
