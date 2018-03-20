// var request = require('request')
// var cheerio = require('cheerio')

// cheerio.prototype.removeTagText = function () {
//   var html = this.html()
//   return html.replace(/<([\w\d]+)\b[^<]+?<\/\1>/g, (m) => {
//     return ''
//   })
// }

// request('http://www.smzdm.com/youhui/',
//   (err, req)=> {
//     if(!err) {
//       // console.log(Object.keys(req))
//       var body = req.body
//       // console.log(body)
//       // 爬完数据 进行分析
//       // dom querySelector
//       // node cheerio
//       var $ = cheerio.load(body, {
//         decodeEntities: false
//       })
//       $('.list.list_preferential').each((i, item) => {
//         var $title = $('.itemName a', item)
//         var url = $title.attr('href')
//         var title = $title.removeTagText()
//         console.log(title)
//         var h1 = $title.children().text().trim()
//         var img = $('', item).attr('src')
//         var desc = $('.lrInfo', item).html().trim()
//         desc = desc.replace(/<a\b.+?>阅读全文<\/a>/g, '')
//         var mall = $('.botPart a.mall', item).text().trim()
//         console.log({ title, h1, url, img, desc})
//       })
//     }
//   }
// )

var spider = require('./lib/spider')
spider('http://www.smzdm.com/youhui/',{
  title: {
    selector: '.itemName a',
    handler: 'removeTagText'
  }
})
// console.log(JSON.stringify([1,2]))
// console.log(Object.prototype.toString.call({}))