const express = require('express')
const app = express()
const captchapng = require('captchapng')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// 中间件
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.set('view engine', 'ejs') // 模板引擎

class VerificationCode {
  // 显示的文字
  // 生成上的图片
  constructor (len = 4, w = 80, h = 30) {
    this.w = w;
    this.h = h;
    this.len = len;
    this.randomNumber = null;
  }
  getRandomNumber() {
    let i = 0, res =[]
    while(i < this.len) {
      i++
      res.push(Math.floor(Math.random() * 10))
    }
    return res.join('')
  }
  getImgbase64() {
    let cap
    this.randomNumber = this.getRandomNumber()
    cap = new captchapng(this.w, this.h, this.randomNumber)
    cap.color(0, 0, 0, 0)
    cap.color(80, 80, 80, 255)
    let img = cap.getBase64(), imgbase64 = new Buffer(img, 'base64')
    return imgbase64
  }
  getJSON() {
    let imgbase64 = this.getImgbase64()
    return {
      number: this.randomNumber,
      base64: 'data:image/png;base64,' + imgbase64.toString('base64')
    }
  }
}

// let vercode = new VerificationCode()
// console.log(vercode.getImgbase64().toString('base64'))

app.get('/api', function(req, res) {
  res.json({
    data: [{
      movie: '女儿国'
    },{
      movie: '唐人街探案'
    }]
  })
})

app.post('/login', function(req, res) {
  // console.log('提交')
  // 表单的数据在哪
  // 如何将表单的数据和随机生成的数据比较
  // console.log(req.cookies)
  // console.log(req.body)
  if(req.cookies.code === req.body.code) {
    res.send('验证码输入正确')
  } else {
    res.send('验证码输入错误')
  }
})

app.get('/', function(req, res) {
  // req 请求 res 返回 app 全局运用
  // 数据库查询 M
  // 业务处理 C
  // view V
  let code = new VerificationCode(),
    code_data = code.getJSON()
  // 种cookie 
  res.cookie('code', code_data.number, { maxAge: 60000 })

  res.render('index', {
    title: '图形验证码',
    pic: code_data.base64
  })
})
app.listen(3000)
