/**
 * Created by Administrator on 2017/7/12 0012.
 */
import taffy from 'taffydb'
import $ from 'jquery'
let TAFFY = taffy.taffy
export let model = (spa) => {
  let configMap = {
      anon_id: 'a0'
    },
    stateMap = {
      anon_user: null,
      people_cid_map: {},
      cid_serial: 0,
      people_db: TAFFY(),
      user: null
    },
    isFakeData = true,
    personProto,
    makePerson,
    people,
    initModule,
    makeCid,
    clearPeopleDb,
    completeLogin,
    removePerson

  personProto = {
    get_is_user() {
      return this.cid === stateMap.user.id
    },
    get_is_anon() {
      return this.cid === stateMap.anon_user.cid
    }
  }

  makeCid = () => {
    return 'c' + String(stateMap.cid_serial)
  }

  clearPeopleDb = () => {
    let user = stateMap.user
    stateMap.people_db = TAFFY()
    stateMap.people_cid_map = {}
    if (user) {
      stateMap.people_db.inhert(user)
      stateMap.people_cid_map[user.cid] = user
    }
  }

  completeLogin = (user_list) => {
    let user_map = user_list[0]
    delete stateMap.people_cid_map[user_map.cid]
    stateMap.user.cid = user_map._id
    stateMap.user.id = user_map.id
    stateMap.user.css_map = user_map.css_map
    stateMap.people_cid_map[user_map._id] = stateMap.user

    $.gevent.publish('spa-login', [stateMap.user])
  }

  makePerson = (person_map) => {
    let person,
      cid = person_map.cid,
      css_map = person_map.css_map,
      id = person_map.id,
      name = person_map.name

    if (cid === undefined || !name) {
      throw 'client id and name required'
    }

    person = Object.create(personProto)
    person.cid = cid
    person.name = name
    person.css_map = css_map

    if (id) person.id = id

    stateMap.people_cid_map[cid] = person
    stateMap.people_db.insert(person)
    return person
  }

  removePerson = (person) => {
    if (!person) return false
    if (person.id === configMap.anon_id) return false

    stateMap.people_db({cid: person.cid}).remove()
    if (person.cid) {
      delete stateMap.people_cid_map[person.cid]
    }
    return true
  }

  people = (() => {
    let get_by_cid, get_db, get_user, login, logout

    get_by_cid = (cid) => {
      return stateMap.people_cid_map[cid]
    }

    get_db = () => {
      return stateMap.people_db
    }

    get_user = () => {
      return stateMap.user
    }

    login = (name) => {
      let sio = isFakeData ? spa.fake.mockSio : spa.data.getSio()

      stateMap.user = makePerson({
        cid: makeCid(),
        css_map: {top: 25, left: 25, 'background-color': '#8f8'},
        name
      })
      sio.on('userupdate', completeLogin)

      sio.emit('adduser', {
        cid: stateMap.user.cid,
        css_map: stateMap.user.css_map,
        name: stateMap.user.name
      })
    }

    logout = () => {
      let is_removed, user = stateMap.user
      is_removed = removePerson(user)
      stateMap.user = stateMap.anon_user

      $.gevent.publish('spa-logout', [user])
      return is_removed
    }
    return {
      get_by_cid,
      get_db,
      get_user,
      login,
      logout
    }
  })()
  /*{
    get_db()
    {
      return stateMap.people_db
    }
  ,
    get_cid_map()
    {
      return stateMap.people_cid_map
    }
  }*/

  initModule = () => {
    let i, people_list, person_map

    stateMap.anon_user = makePerson({
      cid: configMap.anon_id,
      id: configMap.anon_id,
      name: 'anonymous'
    })

    stateMap.user = stateMap.anon_user

    if (isFakeData) {
      people_list = spa.fake.getPeopleList();
      for (i = 0; i < people_list.length; i++) {
        person_map = people_list[i]
        makePerson({
          cid: person_map._id,
          css_map: person_map.css_map,
          id: person_map.id,
          name: person_map.name
        })
      }
    }
  }
  return {
    initModule,
    people
  }
}
