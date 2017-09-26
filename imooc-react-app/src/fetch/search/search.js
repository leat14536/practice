/**
 * Created by Administrator on 2017/9/26 0026.
 */
import {get} from '../get'

export function getSearchData(page, cityName, category, keyword) {
  const keywordStr = keyword !== 'category' ? '/' + keyword : ''
  return get(`/api/search/${page}/${cityName}/${category}${keywordStr}`)
}
