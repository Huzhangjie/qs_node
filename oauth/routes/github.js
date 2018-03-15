// oauth 是一个协议 为用户资源的授权提供一个安全 开放 又简单的标准
// oauth 与其他授权不同的是  不会涉及第三方用户的账号密码 也可以申请获得资源的授权
// 微信支付 
const router = require('koa-router')()
const config = require('../config')
const fetch = require('node-fetch')

const routes = router.get('/login', async (ctx) => {
  // 去到github 授权页 
  const dataSrc = (new Date()).valueOf()
  // 令牌环 access_token
  // github 会给用户授权 client_id (第三方应用)
  // oath 先去第三方网站注册应用 
  // 应用上线地址 安全性 保证开发者的权益
  // 当请求授权时,第三方网站将结果返回到开发服务器
  // Authorization callback URL
  var path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scope}&state=${dataSrc}`  
    // 重定向
    // 到授权中间页
    ctx.redirect(path)
})
.get('/oauth/callback', async (ctx) => {
  const code = ctx.query.code
  let path = `https://github.com/login/oauth/access_token`
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code
  }
  // 网页请求
  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => {
    // console.log(res)
    // 在thenable中返回一个 Promise 可以一直链下去
    return res.text()
  }).then(body => {
    const args = body.split('&')
    let arg = args[0].split('=')
    const access_token = arg[1]
    console.log(access_token)
    return access_token
  }).then(async (token) => {
    const url = 'https://api.github.com/user?token=' + token 
    console.log(url)
    await fetch(url).then(res => {
      return res.json()
    }).then(res => {
      console.log(res)
      ctx.body = res
    })
  })
})

module.exports = routes