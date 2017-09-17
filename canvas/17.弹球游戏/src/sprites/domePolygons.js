/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Polygon} from 'shapes/polygon'
import {Point} from 'shapes/point'

const DOME_SIDES = 15
const DOME_X = 275
const DOME_Y = 235
const DOME_RADIUS = 232

function createDomePolygons(centerX, centerY, radius, sides) {
  let polygon, endTheta, midPointTheta
  let startTheta = 0
  const polygons = []
  const thetaDelta = Math.PI / sides
  const midPointRadius = radius * 1.5

  for (let i = 0; i < sides; ++i) {
    polygon = new Polygon()

    endTheta = startTheta + thetaDelta
    midPointTheta = startTheta + (endTheta - startTheta) / 2

    polygon.points.push(
      new Point(centerX + radius * Math.cos(startTheta),
        centerY - radius * Math.sin(startTheta)))

    polygon.points.push(
      new Point(centerX + midPointRadius * Math.cos(midPointTheta),
        centerY - midPointRadius * Math.sin(midPointTheta)))

    polygon.points.push(
      new Point(centerX + radius * Math.cos(endTheta),
        centerY - radius * Math.sin(endTheta)))

    polygons.push(polygon)

    startTheta += thetaDelta
  }
  return polygons
}

export const domePolygons = createDomePolygons(DOME_X, DOME_Y, DOME_RADIUS, DOME_SIDES)
