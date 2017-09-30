/**
 * Created by Administrator on 2017/9/30 0030.
 */
export function get(url) {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*'
    }
  })
}
