/* eslint-disable import/no-duplicates */
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

const CONNECT_TYPE = {
  transverse: 0,
  portrait: 1
}

function getTag(x, y) {
  if (x.cid > y.cid) {
    return `${getNormalizeCid(y.cid)}-${getNormalizeCid(x.cid)}`
  }
  return `${getNormalizeCid(x.cid)}-${getNormalizeCid(y.cid)}`
}

function getNormalizeCid(cid) {
  return (cid + '').padStart(4, '0')
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export default function maze({width, height, room, minSize, maxSize} = {
  width: 51,
  height: 31,
  room: 200,
  minSize: 3,
  maxSize: 7
}) {
  /* eslint-disable */
  let cid = 0
  let map = []
  let rooms = []
  let routes = []
  let contectPoints = {}
  let connectPoints = []
  let uselessPoints = []

  createEmptyMap()
  randomRoom(minSize, maxSize + 2)
  setRoute()
  findPoints()
  connect()
  recallUselessPoint()

  map.getPoints = () => {
    return {
      rooms,
      routes,
      connectPoints,
      uselessPoints
    }
  }

  return map

  function createEmptyMap() {
    let ret = []
    for (let i = 0; i < width; i++) {
      ret[i] = []
      for (let j = 0; j < height; j++) {
        ret[i][j] = {
          type: RECT_TYPE.blank
        }
      }
    }
    map = ret
  }

  function randomRoom(minSize, maxSize) {
    const min = Math.ceil(minSize / 2)
    const max = Math.ceil(maxSize / 2)
    let i = 0
    let x, y, w, h
    while (i < room) {
      i++
      x = random(0, (width + 1) / 2) * 2 + 1
      y = random(0, (height + 1) / 2) * 2 + 1
      w = (random(min, max) - 1) * 2 + 1
      h = (random(min, max) - 1) * 2 + 1
      testRoom(x, y, w, h) && setRoom(x, y, w, h)
    }
  }

  function testRoom(x, y, w, h) {
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

  function setRoom(x, y, w, h) {
    let i, j
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
    rooms.push(room)
  }

  function setRoute() {
    let i, j
    for (i = 1; i < width; i += 2) {
      for (j = 1; j < height; j += 2) {
        if (testRoute(i, j)) {
          routes.push(fillRoute(++cid, new Route(i, j)))
        }
      }
    }
  }

  function testRoute(x, y) {
    if (x < 1 || x >= width || y < 1 || y >= height) {
      return false
    }

    if (map[x][y].type === RECT_TYPE.blank) {
      return true
    }
    return false
  }

  function fillRoute(cid, route, last) {
    let next
    let randomDir
    let general
    let routes = []
    let routeData = route.get()
    let corridorData

    map[routeData[0]][routeData[1]] = {
      type: RECT_TYPE.rect,
      cid
    }

    !last && routes.push(route)

    while (1) {
      general = getGenerals(...route.get())

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
      routes.push(...fillRoute(cid, routes[i], routes[i + 1]))
    }
    routes.cid = cid
    return routes
  }

  function getGenerals(x, y) {
    return Object.entries(DIR).reduce((general, currentDir) => {
      let coordinate = currentDir[1](x, y)
      testRoute(...coordinate) && general.push(coordinate)
      coordinate.type = currentDir[0]
      return general
    }, [])
  }

  function findPoints() {
    let i, j, point
    let points = {}
    for (i = 1; i < width - 1; i++) {
      for (j = 1; j < height - 1; j++) {
        point = testConnect(i, j)
        if (point) {
          if (!points[point.tag]) points[point.tag] = []
          points[point.tag].push(point)
        }
      }
    }
    contectPoints = points
  }

  function testConnect(x, y) {
    function test(x, y) {
      return x.cid && y.cid && x.cid !== y.cid && x.type !== RECT_TYPE.blank && y.type !== RECT_TYPE.blank
    }

    const [l, r, u, d] = [map[x - 1][y], map[x + 1][y], map[x][y - 1], map[x][y + 1]]
    if (map[x][y].type === RECT_TYPE.blank) {
      if (test(l, r)) {
        return {
          x,
          y,
          type: CONNECT_TYPE.transverse,
          tag: getTag(l, r)
        }
      }
      if (test(u, d)) {
        return {
          x,
          y,
          type: CONNECT_TYPE.portrait,
          tag: getTag(u, d)
        }
      }
    }
    return false
  }

  function connect() {
    let points = Object.assign({}, contectPoints)
    let cachePoint
    let minCid
    let maxCid

    while (Object.keys(points).length) {
      // 随即获取连接点
      let point = randomConnect()

      // 设为连接点
      // remove掉两个区域直接连接点
      setConnect(point)
      removePoint(point)

      // 合并两个区域
      minCid = point.cid1
      maxCid = point.cid2

      cachePoint = []
      for (let key in points) {
        if (key.indexOf(maxCid) > -1) {
          cachePoint.push(key)
        }
      }

      cachePoint.forEach((key) => {
        let val = points[key]
        let cids = key.replace(maxCid, minCid).split('-')
        let tag = getTag({cid: parseInt(cids[0], 10)}, {cid: parseInt(cids[1], 10)})
        if (points[tag]) {
          points[tag].push(...val)
        } else {
          points[tag] = val
        }
        delete points[key]
      })
    }

    function randomConnect() {
      let keys = Object.keys(points)
      let x = random(0, keys.length)
      let y = random(0, points[keys[x]].length)
      let ret = Object.assign({}, points[keys[x]][y])
      ret.cid1 = keys[x].split('-')[0]
      ret.cid2 = keys[x].split('-')[1]
      return ret
    }

    function setConnect(point) {
      // 存储点 设为可连接
      connectPoints.push(point)
      map[point.x][point.y].type = RECT_TYPE.connect
    }

    function removePoint({cid1, cid2}) {
      let cid = cid1 + '-' + cid2
      if (points[cid]) {
        // 移除每个点时都有小概率开放
        points[cid].forEach((item) => {
          if (random(0, 30) === 0) setConnect(item)
        })
        delete points[cid]
      }
    }
  }

  function recallUselessPoint() {
    let uselessPoint = []

    // 寻找到所有周围3个点是空白的过道
    findUselessPoint()
    while (uselessPoint.length) {
      uselessPoints.push(...uselessPoint)
      uselessPoint = removeUselessPoint()
    }

    function findUselessPoint() {
      let i, j
      for (i = 1; i < width; i += 2) {
        for (j = 1; j < height; j += 2) {
          testPoint(i, j, uselessPoint)
        }
      }
    }

    function testPoint(i, j, points) {
      if (map[i][j].type !== RECT_TYPE.rect && map[i][j].type !== RECT_TYPE.connect) return
      let count = 0
      let next, x, y
      for (let key in CORRIDOR_DIR) {
        [x, y] = CORRIDOR_DIR[key](i, j)
        if (map[x][y].type === RECT_TYPE.blank) count++
        else next = [x, y]
      }
      if (count === 3) {
        points.push(Object.assign({next, x: i, y: j}, map[i][j]))
      }
    }

    function removeUselessPoint() {
      let cache = []
      uselessPoint.forEach(({x, y, next}) => {
        map[x][y].type = RECT_TYPE.blank
        testPoint(...next, cache)
      })
      return cache
    }
  }
}
