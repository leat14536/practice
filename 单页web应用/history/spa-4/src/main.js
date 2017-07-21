/**
 * Created by Administrator on 2017/7/11 0011.
 */

require('babel-polyfill')
require('./styles/main.scss')

import {spa} from './js/spa.js'
import $ from 'jquery'
import gevent from 'jquery.event.gevent'

gevent($)

function log() {
  console.log.apply(null, arguments)
}

$(document).ready(() => {
  spa.initModule($('#spa'))
  // test db
  /*
  let peopleDb = spa.model.people.get_db()

  let peopleList = peopleDb().get()

  log(peopleList)
  log(peopleDb())
  peopleDb().each((person, idx) => {
    log(person.name)
  })

  let person = peopleDb({cid: 'id_03'}).first()

  log('--------------')
  log(person.name)
  log(JSON.stringify(person.css_map))
  log(person.get_is_anon())

  person = peopleDb({id: 'a0'}).first()

  log(person.get_is_anon())

  log(person.name)

  var personCidMap = spa.model.people.get_cid_map()

  log(personCidMap['a0'].name)

  */

  // test gevent
  /*let $t = $('<div/>')

  $.gevent.subscribe($t, 'spa-login', () => {
    console.log(arguments)
    log('Hello', arguments)
  })

  $.gevent.subscribe($t, 'spa-logout', () => {
    log('Goodbye', arguments)
  })

  let currentUser = spa.model.people.get_user()
  log(currentUser.get_is_anon())

  let peopleDb = spa.model.people.get_db()

  peopleDb().each((person, idx) => {
    log(person.name)
  })

  spa.model.people.login('Alfred')
  currentUser = spa.model.people.get_user()
  log(currentUser.get_is_anon())
  log(currentUser.id)
  log(currentUser.cid)

  peopleDb().each((person, idx) => {
    log(person.name)
  })

  setTimeout(() => {
    spa.model.people.logout()

    peopleDb().each((person, idx) => {
      console.log(person.name)
    })

    currentUser = spa.model.people.get_user()
    log(currentUser.get_is_anon())
  },4000)*/
})

