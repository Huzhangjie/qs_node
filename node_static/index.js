// node 核心模块
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const mime = require('mime')
const handlebars = require('handlebars')

const server = http.createServer()
server.on('request', request.bind(this))

function request(req, res) {
  const {pathname} = url.parse(req.url) 
  let filepath = path.join(config.root, pathname)
  if(pathname === '/' ){
    // console.log('首页')
    const rootPath = path.join(config.root, 'index.html')
    console.log(rootPath)
    // 文件的类型 text-/html png text/css 等叫做 mime
    // header http 相应头 状态码 响应体
    res.setHeader('Content-Type', mime.getType(rootPath) + ';charset="utf-8"')
    console.log(mime.getType(rootPath))
    // 通过url的解析 返回静态文件回去 将一个读取的流pipe到res中
    return fs.createReadStream(rootPath).pipe(res)
  }
  // 文件或目录 
  // 文件系统 接口
  fs.stat(filepath, (err, stats) => {
    if(err) {
      res.end('not found')
      return 
    }
    if(stats.isDirectory()) {
      // console.log('目录')
      // 得到所有文件
      // Sync 同步读取 会等到获取完才执行下面的

      let files = fs.readdirSync(filepath)
      files = files.map(file => ({
        name: file,
        url: path.join(pathname, file)
      }))
      // console.log(files)
      // readFile readFileSync

      // list 函数 返回Compile之后的模板
      let html = list()({
        title: pathname,
        files
      })

      res.setHeader('Content-Type', 'text/html')
      res.end(html)
    } else {
      res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8')
      fs.createReadStream(filepath).pipe(res)
    }
  })

  function list() {
    let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8')
    return handlebars.compile(tmpl)
  }
  // const = 
  // // req res
  // console.log(args)
  // 获取静态资源文件中的
  // /image/a.png
  // /template/*html
  // 需要识别 path '/'
  // js 熟悉DOM 不熟悉global

}

server.listen(3000, () => {
  console.log(`静态文件服务器启动成功,访问localhost:${config.port}`)
})

