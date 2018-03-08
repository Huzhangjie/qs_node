var express = require('express')
// 只执行一次
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
var port = process.env.PORT || 8080
var router = express.Router()
// Controller 层 MVC

router.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>')
})

// xx小家
router.get('/:name', function(req, res) {
  res.send('<h1>Hello ' + req.params.name + '</h1>')
})
router.post('/', function() {
  var name = req.body.name
  res.json({message: 'Helllo ' + name})
})
// 启动 router 中间件 
// 顺序
app.use('/home', router)

// middleware 中间件 执行多次
// 从上到下,执行一次
// 如 验证登录 留下log bodyparser cookie session 错误的处理 路由的处理
// 当遇到 response 时,  
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>')
// })
// app.get('/book')

app.listen(port, function() {
  console.log(`web server在${port}端口`)
})