var express = require('express')
var config = require('./config/index.js')
var app = express()
var proxy = require('http-proxy-middleware')

var port = process.env.PORT || config.build.port

const api = {
  _getDiscLists: {
    context: '/api/getDiscLists',
    target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
    headers:{
      referer: 'https://y.qq.com/portal/playlist.html',
      // host: 'c.y.qq.com'
    },
    // bypass:function(req, res, proxyOptions){
    //   req.headers.referer = 'https://c.y.qq.com/'
    //   host: 'c.y.qq.com'
    // },
    pathRewrite: {'^/api/getDiscLists' : ''},
    changeOrigin: true
  },
  _getLyric: {
    context: '/api/getLyric',
    target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    headers: {
      referer: 'https://y.qq.com/portal/player.html'
    },
    pathRewrite: {'^/api/getLyric': ''},
    changeOrigin: true
  },
  _getSongList: {
    context: '/api/getSongList',
    target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    headers: {
      referer: 'https://y.qq.com/'
    },
    pathRewrite: {'^/api/getSongList': ''},
    changeOrigin: true
  }
}

app.use(express.static('./dist'))

// 遍历 api，进行正向代理
for (let key of Object.keys(api)) {
  let obj = api[key]
  let apiProxy = proxy(obj.context, {
    target: obj.target,
    headers: obj.headers,
    pathRewrite: obj.pathRewrite,
    changeOrigin: obj.changeOrigin
  })
  app.use(apiProxy)
}

module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
