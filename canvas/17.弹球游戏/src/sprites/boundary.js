/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Polygon} from 'shapes/polygon'
import {Point} from 'shapes/point'
import {CANVAS_HEIGHT} from '../global'

export const leftBoundary = new Polygon()
export const rightBoundary = new Polygon()

leftBoundary.points.push(new Point(45, 235))
leftBoundary.points.push(new Point(45, CANVAS_HEIGHT))
leftBoundary.points.push(new Point(-450, CANVAS_HEIGHT))
leftBoundary.points.push(new Point(-450, 235))

rightBoundary.points.push(new Point(508, 235))
rightBoundary.points.push(new Point(508, CANVAS_HEIGHT))
rightBoundary.points.push(new Point(508 * 2, CANVAS_HEIGHT))
rightBoundary.points.push(new Point(508 * 2, 235))
