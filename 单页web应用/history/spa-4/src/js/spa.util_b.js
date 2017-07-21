/**
 * Created by Administrator on 2017/7/20 0020.
 */

let configMap = {
    regex_encode_html: /[&"'><]/g,
    regex_encode_noamp: /["'><]/g,
    html_encode_map: {
      '&': '&#38',
      '"': '&#34',
      '\'': '&#39',
      '>': '&#62',
      '<': '&#60'
    }
  },
  decodeHtml, ecodeHtml, getEmSize

configMap.ecode_noamp_map = Object.assign({}, configMap.html_encode_map)

delete configMap.ecode_noamp_map['&']

decodeHtml = (str) => {
  return $('<div/>').html(str || '').text
}

ecodeHtml = (input_arg_str, exclude_amp) => {
  let input_str = String(input_arg_str),
    regex,
    lookup_map

  if (exclude_amp) {
    lookup_map = configMap.ecode_noamp_map
    regex = configMap.regex_encode_noamp
  } else {
    lookup_map = configMap.html_encode_map
    regex = configMap.regex_encode_html
  }

  return input_str.replace(regex, (match, name) => {
    return lookup_map[match] || ''
  })
}

getEmSize = (elem) => {
  return Number(getComputedStyle(elem, '').fontSize.match(/\d*\.?\d*/)[0])
}

export decodeHtml
export ecodeHtml
export getEmSize
