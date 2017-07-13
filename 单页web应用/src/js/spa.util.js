/**
 * Created by Administrator on 2017/7/12 0012.
 */
export let makeError = (name_text, msg_text, data) => {
  let error = new Error()
  error.name = name_text
  error.message = msg_text

  if (data) error.data = data;
  return error
}

export let setConfigMap = (arg_map) => {
  let input_map = arg_map.input_map,
    settable_map = arg_map.settable_map,
    config_map = arg_map.config_map,
    key_name, error

  for (key_name in input_map) {
    if (input_map.hasOwnProperty(key_name)) {
      if (settable_map.hasOwnProperty(key_name)) {
        config_map[key_name] = input_map[key_name]
      } else {
        error = makeError('Bad Input', `Setting config key |${key_name}| is not supported`)
        throw error
      }
    }
  }
}



