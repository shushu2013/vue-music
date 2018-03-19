import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getLyric(mid) {
  const url = 'api/getLyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 304282408,
    platform: 'yqq',
    hotsUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
