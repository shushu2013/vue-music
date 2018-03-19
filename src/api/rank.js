import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'

  const data = Object.assign({}, commonParams, {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  })

  const option = Object.assign({}, options, {
    name: 'jsonCallback'
  })

  return jsonp(url, data, option)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    tpl: 3,
    page: 'detail',
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 304282408,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
