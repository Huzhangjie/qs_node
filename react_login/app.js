const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const koaStatic = require('koa-static')
const convert = require('koa-convert')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const routers = require('./routes/index')
const config = require('./config')

const app = new Koa()

app.use(bodyParser())
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(routers.routes()).use(routers.allowedMethods())
app.use(convert(koaStatic(
  path.join(__dirname, './static')
)))

app.listen(3000)
console.log('The server on 3000 port')