/**
 * Created by Administrator on 2017/9/24 0024.
 */
import 'whatwg-fetch'

export function get(url) {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  })
}
