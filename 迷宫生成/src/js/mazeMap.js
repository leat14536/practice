/* eslint-disable import/no-duplicates */
import Canvas from './canvas'
import Route from './route'

const RECT_TYPE = {
  blank: 0,
  rect: 1,
  room: 2,
  connect: 3
}

const DIR = {
  up(x, y) {
    return [x, y - 2]
  },
  down(x, y) {
    return [x, y + 2]
  },
  left(x, y) {
    return [x - 2, y]
  },
  right(x, y) {
    return [x + 2, y]
  }
}

const CORRIDOR_DIR = {
  up(x, y) {
    return [x, y + 1]
  },
  down(x, y) {
    return [x, y - 1]
  },
  left(x, y) {
    return [x + 1, y]
  },
  right(x, y) {
    return [x - 1, y]
  }
}
/* eslint-disable */
const CONNECT_TYPE = {
  transverse: 0,
  portrait: 1
}

let cid = 0

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getTag(x, y) {
  if (x.cid > y.cid) {
    return `${y.cid}-${x.cid}`
  }
  return `${x.cid}-${y.cid}`
}

export default class MazeMap {
  constructor({width, height, room, roomMinSize, roomMaxSize, draw, el} = {
    width: 51,
    height: 31,
    room: 200,
    roomMinSize: 3,
    roomMaxSize: 7,
    draw: true,
    el: '.wrap'
  }) {
    this.width = width
    this.height = height
    this.room = []
    this.routes = []
    this.contectPoints = []
    let canvas = draw ? this.initCanvas(el) : null
    this.canvas = canvas

    // 获取初始地图
    this.createEmptyMap(width, height)

    // 随机房间
    this.randomRoom(room, roomMinSize, roomMaxSize + 2)

    // 用路径填满地图
    this.setRoute()

    canvas && this.drawRoom()
    canvas && this.drawRoute()
    // 连接地图和房间
    this.findPoints()
    this.connect()
  }

  initCanvas(el) {
    let width = this.width
    let height = this.height
    let wrap = document.querySelector(el)
    let canvas = new Canvas({
      width,
      height
    })
    wrap.appendChild(canvas.getCanvas())
    return canvas
  }

  drawRoom() {
    let canvas = this.canvas
    this.room.forEach((item) => {
      canvas.drawRoom(...item)
    })
  }

  drawRoute() {
    let cache = []
    let next
    const canvas = this.canvas
    this.routes.forEach((routes) => {
      let route = routes[0]
      canvas.drawRect(...route.get(), ...route.get())
      do {
        route.last && canvas.drawRect(...route.get(), ...route.last.get())
        while (route.next.length > 0) {
          route.next.length > 1 && cache.push(...route.next.slice(1))
          next = route.next[0]
          canvas.drawRect(...route.get(), ...next.get())
          route = next
        }
        route = cache.pop()
      } while (route)
    })
  }

  drawPoint() {
    let canvas = this.canvas
    let points = this.contectPoints
    for (let item in points) {
      points[item].forEach(({x, y}) => {
        canvas.drawOneRect(x, y)
      })
    }
  }

  createEmptyMap() {
    const width = this.width
    const height = this.height

    let ret = []
    for (let i = 0; i < width; i++) {
      ret[i] = []
      for (let j = 0; j < height; j++) {
        ret[i][j] = {
          type: RECT_TYPE['blank']
        }
      }
    }
    this.map = ret
  }

  randomRoom(room, min, max) {
    min = Math.ceil(min / 2)
    max = Math.ceil(max / 2)
    const width = this.width
    const height = this.height
    let i = 0
    let x, y, w, h
    while (i < room) {
      i++
      x = random(0, (width + 1) / 2) * 2 + 1
      y = random(0, (height + 1) / 2) * 2 + 1
      w = (random(min, max) - 1) * 2 + 1
      h = (random(min, max) - 1) * 2 + 1
      this.validator(x, y, w, h) && this.setRoom(x, y, w, h)
    }
  }

  validator(x, y, w, h) {
    const map = this.map
    // 超出地图
    if (x + w > map.length || y + h > map[0].length) {
      return false
    }
    for (let i = x; i < x + w; i += 2) {
      for (let j = y; j < y + h; j += 2) {
        if (map[i][j].type !== RECT_TYPE['blank']) {
          return false
        }
      }
    }
    return true
  }

  setRoom(x, y, w, h) {
    let i, j
    let map = this.map
    cid++
    for (i = x; i < w + x; i++) {
      for (j = y; j < h + y; j++) {
        map[i][j] = {
          type: RECT_TYPE.room,
          cid
        }
      }
    }
    let room = [x, y, w, h]
    room.cid = cid
    this.room.push(room)
  }

  setRoute() {
    const width = this.width
    const height = this.height
    let routes = this.routes
    let i, j
    for (i = 1; i < width; i += 2) {
      for (j = 1; j < height; j += 2) {
        if (this.validatorRoute(i, j)) {
          routes.push(this.fillRoute(++cid, new Route(i, j)))
        }
      }
    }
  }

  validatorRoute(x, y) {
    const map = this.map
    const width = this.width
    const height = this.height
    if (x < 1 || x >= width || y < 1 || y >= height) {
      return false
    }

    if (map[x][y].type === RECT_TYPE.blank) {
      return true
    }
    return false
  }

  fillRoute(cid, route, last) {
    let next
    let randomDir
    let general
    let routes = []
    let routeData = route.get()
    let map = this.map
    let corridorData

    map[routeData[0]][routeData[1]] = {
      type: RECT_TYPE.rect,
      cid
    }

    !last && routes.push(route)

    while (1) {
      general = this.getGenerals(...route.get())

      if (!general.length) break
      else if (general.length === 1) randomDir = 0
      else randomDir = random(0, general.length)

      routeData = general[randomDir]
      next = new Route(...routeData, route)
      map[routeData[0]][routeData[1]] = {
        type: RECT_TYPE.rect,
        cid
      }

      corridorData = CORRIDOR_DIR[routeData.type](routeData[0], routeData[1])
      map[corridorData[0]][corridorData[1]] = {
        type: RECT_TYPE.rect,
        cid
      }

      route.pushNext(next)
      route = next
      routes.push(route)
    }

    for (let i = routes.length - 2; i >= 0; i--) {
      routes.push(...this.fillRoute(cid, routes[i], routes[i + 1]))
    }
    routes.cid = cid
    return routes
  }

  getGenerals(x, y) {
    return Object.entries(DIR).reduce((general, currentDir, index) => {
      let coordinate = currentDir[1](x, y)
      this.validatorRoute(...coordinate) && general.push(coordinate)
      coordinate.type = currentDir[0]
      return general
    }, [])
  }

  findPoints() {
    let i, j, point
    let points = {}
    const width = this.width
    const height = this.height
    for (i = 1; i < width - 1; i++) {
      for (j = 1; j < height - 1; j++) {
        point = this.validatorConnect(i, j)
        if (point) {
          if (!points[point.tag]) points[point.tag] = []
          points[point.tag].push(point)
        }
      }
    }
    this.contectPoints = points
  }

  validatorConnect(x, y) {
    const map = this.map
    const [l, r, u, d] = [map[x - 1][y], map[x + 1][y], map[x][y - 1], map[x][y + 1]]
    if (map[x][y].type === RECT_TYPE.blank) {
      if (validate(l, r)) {
        return {
          x,
          y,
          type: CONNECT_TYPE.transverse,
          tag: getTag(l, r)
        }
      }
      if (validate(u, d)) {
        return {
          x,
          y,
          type: CONNECT_TYPE.portrait,
          tag: getTag(u, d)
        }
      }
    }
    return false

    function validate(x, y) {
      return x.cid && y.cid && x.cid !== y.cid && x.type !== RECT_TYPE.blank && y.type !== RECT_TYPE.blank
    }
  }

  connect() {
    let points = Object.assign({}, this.contectPoints)
    let rooms = this.room.slice(0)
    let map = this.map
    let room = rooms.pop()
    let cachePoint = []
    const canvas = this.canvas
    let minCid
    let maxCid

    while (room) {

      // 获取房间周围的可连接点
      let connect = this.getRoomConnect(room)

      // 随机取一个
      let point = connect[random(0, connect.length)]

      // remove掉所有 point相关的点
      removePoint(point)

      if(point.cid1 < point.cid2) {
        minCid = point.cid1
        maxCid = point.cid2
      } else {
        minCid = point.cid2
        maxCid = point.cid1
      }

      for(let key in points) {
        if(key.indexOf(maxCid) > -1) {
          cachePoint.push(key)
        }
      }

      cachePoint.forEach((key) => {
        let val = points[key]
        let cids = key.replace(maxCid, minCid).split('-')
        let tag = getTag({cid: cids[0]},{cid: cids[1]})
        if(points[tag]) {
          points[tag].push(...val)
        } else {
          points[tag] = val
        }
        delete points[key]
      })
      debugger
     /* setConnect(point)
      removePoint(point)
      connect.forEach((point) => {
        if (random(0, 20) === 0) {
          setConnect(point)
        }
        removePoint(point)
      }) */
      room = rooms.pop()
    }

    /* if (Object.keys(points).length) {
      debugger
      for (let item in points) {
        points[item].forEach((point) => {
          canvas.drawOneRect(point.x, point.y, 'blue')
        })
      }
    } */

    function setConnect({x, y}) {
      map[x][y].type = RECT_TYPE.connect
      canvas.drawOneRect(x, y)
    }

    function removePoint({cid1, cid2, x, y}) {
      if (!cid1 || !cid2) {
        // 这里不知道为什么有 bug
        // 先放下
        return
      }
      let cid = cid1 < cid2 ? `${cid1}-${cid2}` : `${cid2}-${cid1}`
      if(points[cid]) {
        points[cid].forEach((item) => {
          canvas.drawOneRect(item.x, item.y, '#ff0')
        })
        delete points[cid]
      }
    }
  }

  getRoomConnect([x, y, w, h]) {
    let i, j
    let points = []
    const map = this.map
    for (i = x; i < w + x; i++) {
      if (validate(i, y - 2)) {
        points.push({
          x: i,
          y: y - 1,
          cid1: map[i][y].cid,
          cid2: map[i][y - 2].cid
        })
      }
      if (validate(i, y + h + 1)) {
        points.push({
          x: i,
          y: y + h,
          cid1: map[i][y + h + 1].cid,
          cid2: map[i][y + h - 1].cid
        })
      }
    }

    for (j = y; j < h + y; j++) {
      if (validate(x - 2, j)) {
        points.push({
          x: x - 1,
          y: j,
          cid1: map[x][j].cid,
          cid2: map[x - 2][j].cid
        })
      }
      if (validate(x + w + 1, j)) {
        points.push({
          x: x + w,
          y: j,
          cid1: map[x + w - 1][j].cid,
          cid2: map[x + w + 1][j].cid
        })
      }
    }

    return points

    function validate(x, y) {
      if (x >= map.length - 1 || y >= map[0].length - 1 || x <= 1 || y <= 1) {
        return false
      }
      if (map[x][y].type !== RECT_TYPE.blank && map[x][y].type !== RECT_TYPE.connect) {
        return true
      }
      return false
    }
  }
}
