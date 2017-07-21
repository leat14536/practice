/**
 * Created by Administrator on 2017/7/20 0020.
 */

export let fake = () => {
  let getPeopleList, fakeIdSerial, makeFakeId, mockSio

  getPeopleList = () => {
    return [
      {
        name: 'Betty',
        _id: 'id_01',
        css_map: {
          top: 20,
          left: 20,
          'background-color': 'rgb( 128, 128, 128)'
        }
      },
      {
        name: 'Mike',
        _id: 'id_02',
        css_map: {
          top: 60, left: 20,
          'background-color': 'rgb( 128, 255, 128)'
        }
      },
      {
        name: 'Pebbles',
        _id: 'id_03',
        css_map: {
          top: 100,
          left: 20,
          'background-color': 'rgb( 128, 192, 192)'
        }
      },
      {
        name: 'Wilma',
        _id: 'id_04',
        css_map: {
          top: 140,
          left: 20,
          'background-color': 'rgb( 192, 128, 128)'
        }
      }
    ]
  }

  fakeIdSerial = 5

  makeFakeId = () => {
    return 'id' + String(fakeIdSerial++)
  }

  mockSio = (() => {
    let on_sio, emit_sio, callback_map = {}

    on_sio = (msg_type, callback) => {
      callback_map[msg_type] = callback
    }

    emit_sio = (msg_type, data) => {
      if(msg_type === 'adduser' && callback_map.userupdate) {
        setTimeout(() => {
          callback_map.userupdate([{
           _id: makeFakeId(),
            name: data.name,
            css_map: data.css_map
          }])
        }, 3000)
      }
    }
    return {
      emit: emit_sio,
      on: on_sio
    }
  })()

  return {
    getPeopleList,
    mockSio
  }
}
