/**
 * Created by Administrator on 2017/9/28 0028.
 */
import 'whatwg-fetch'

export function post(url, paramsObj) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: obj2params(paramsObj)
  })
}

function obj2params(obj) {
  let result = ''
  for (let item in obj) {
    result += '&' + item + '=' + encodeURIComponent(obj[item])
  }

  if (result) {
    result = result.slice(1)
  }

  return result
}
