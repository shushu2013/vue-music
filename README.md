# vue 音乐播放器

## 下载与运行

``` bash
$ git clone git@github.com:shushu2013/vue-music.git

$ cd vue-music

$ npm install

// 开发环境下运行代码
$ npm run dev

// 生成生产环境代码
$ npm run build

// 运行本地生产环境代码（必须先生成生产环境代码）
$ node prod.server.js
```

## 技术栈

#### 前端

- [vue](https://cn.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [stylus](http://stylus-lang.com/)
- [ES6](https://www.tutorialspoint.com/es6/index.htm)

- `相关插件`

  [babel-runtime 介绍](https://www.jianshu.com/p/e9b94b2d52e2)

  [fastclick GitHub 地址](https://github.com/ftlabs/fastclick) -- 解决移动端 click 延迟

  [jsonp GitHub 地址](https://github.com/webmodules/jsonp) -- 使用 jsonp 获取数据

  [better-scroll GitHub 地址](https://github.com/ustbhuangyi/better-scroll) -- 滚动插件

  [vue-lazyload GitHub 地址](https://github.com/hilongjw/vue-lazyload) -- 图片懒加载

  [create-keyframe-animation GitHub 地址](https://github.com/HenrikJoreteg/create-keyframe-animation) -- 创建帧动画

  [js-base64 GitHub 地址](https://github.com/dankogai/js-base64) -- base64 编码解码

  [lyric-parser GitHub 地址](https://github.com/ustbhuangyi/lyric-parser) -- 歌词解析

  [storage GitHub 地址](https://github.com/ustbhuangyi/storage) -- 本地存储

  [vue-fullscreen GitHub 地址](https://github.com/mirari/vue-fullscreen) -- 全屏组件

#### 后端

- [NodeJS](https://nodejs.org/en/)
- [Express](https://github.com/expressjs/express)

#### 其他工具

- [vue-cli](https://github.com/vuejs/vue-cli)
- [eslint](http://eslint.cn/)
- [vConsole](https://github.com/WechatFE/vConsole) -- 移动端调试工具，在移动端输出日志
- [Fiddler](https://www.jianshu.com/p/99b6b4cd273c) -- windows 下代理查看移动端网络请求数据


## 问题与解决方法

##### 1、`vue-cli init` 在 `git Bash` 中不能选择上下键
```
windows 下使用 `git Bash` 运行 `vue-cli init` 的时候时候，按上下键不能选择 `Runtime + compiler` 或者 `Runtime-only`
```
解决：使用 windows 自带的 `cmd` 可以，`git Bash` 不行


#### 2、`vscode` 设置 `js` 文件缩进 `Tab` 等于 2 个空格不生效

解决：安装 `editorconfig` 插件，项目目录下配置 `.editorconfig` 文件
```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

```

#### 3、代理服务器抓取 QQ 官网数据

##### 3.1 方法及参考资料

使用 `webpack-dev-server` 来做后台代理，去请求 `QQ 音乐` 歌单接口并设置相应的头文件信息（如 referer、host 等）

`webpack-dev-server` 内部使用的是 `express` 和 `http-proxy-middleware` 来代理跨域请求，相关参考资料：

[devServer.proxy 选项说明](https://webpack.js.org/configuration/dev-server/#devserver-proxy)

[http-proxy-middleware GitHub 地址](https://github.com/chimurai/http-proxy-middleware)

##### 3.2 具体实现

在 `config` 目录下的 `index.js` 文件中，配置 `proxyTable` 选项：
```
module.exports = {
  dev: {
    proxyTable: {
    '/api/getDiscLists': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg',
        pathRewrite: {"/api/getDiscLists" : ""},
        headers:{
          referer: 'https://m.y.qq.com/',
          host: 'c.y.qq.com'
        }
        changeOrigin: true
      }
    }
  }
}

// 如果要代理多个请求，可设置为数组形式

module.exports = {
  dev: {
    proxyTable: [
      {
        context: '/api/getDiscLists',
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg',
        pathRewrite: {"/api/getDiscLists" : ""},
        headers:{
          referer: 'https://m.y.qq.com/',
          host: 'c.y.qq.com'
        }
        changeOrigin: true
      }
    ]
  }
}

```

#### 4、audio 事件

参考资料：

[audio 支持的事件 MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events)

#### 5、webpack 设置手机端能访问项目地址

解决：配置 `webpack-dev-server` 的 `host` 和 `disableHostCheck` 选项
```
host: '0.0.0.0',
disableHostCheck: true
```

参考资料:

[--host 0.0.0.0 Not working](https://github.com/webpack/webpack-dev-server/issues/882)

#### 6、添加歌曲到队列时，歌曲跳转异常

解决：列表项的 key 设置为 `item.id` 导致部分列表重用，不能跳转至正确位置，改为 `key = index`

#### 7、`Android Chrome` 不能播放歌曲

`Vue.js 2.5+` 的版本改变了 `nextTick` 的实现
```
Vue.js 优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，
不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0。

我们知道，除了高版本 IE 和 Edge，setImmediate 是没有原生支持的，
除非一些工具对它进行了重新改写。而 MessageChannel 的浏览器支持程度还是非常高的。

this.$refs.audio.play() 的逻辑也是可以执行到的，但是歌曲并不能播放，应该是浏览器对 audio
播放在使用 MessageChannel 做异步的一种限制。
```

因为是 `MessageChannel` 的锅，所以我就在 `Vue.js` 的初始化前，引入了一段 `hack.js`

```
// hack for global nextTick

function noop() {

}

window.MessageChannel = noop
window.setImmediate = noop
```

在 `main.js` 中引入 `hack.js`
```
import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'

...

```

这样的话 `Vue.js` 在初始化 `nextTick` 的时候，发现全局的 `setImmediate` 和 `MessageChannel` 被改写了，就自动降级为 `setTimeout 0` 的实现，这样就可以规避掉我们的问题了。


参考资料：

[Vue.js 升级踩坑小计](https://github.com/DDFE/DDFE-blog/issues/24)


#### 8、图标字体编辑

需要添加新的字体图标，如放大和缩小图片时，使用`百度字体在线编辑器`把图标添加到字体文件。

[FontEditor 百度字体在线编辑器](http://fontstore.baidu.com/static/editor/index.html)

图标资源：

[icomoon](https://icomoon.io/app/#/select)

[iconfont](http://www.iconfont.cn/home/index)


