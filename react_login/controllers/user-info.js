const User = require('./../models/user')

module.exports = {
  async signIn(ctx) {
    const { username, password } = ctx.request.body
    ctx.body = {
      success: true,
      message: '登录成功'
    }
  }
}