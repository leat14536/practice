/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Polygon} from 'shapes/polygon'
import {Point} from 'shapes/point'
import {game} from '../game'

export const leftBoundary = new Polygon()
export const rightBoundary = new Polygon()

leftBoundary.points.push(new Point(45, 235))
leftBoundary.points.push(new Point(45, game.context.canvas.height))
leftBoundary.points.push(new Point(-450, game.context.canvas.height))
leftBoundary.points.push(new Point(-450, 235))
leftBoundary.points.push(new Point(45, 235))

rightBoundary.points.push(new Point(508, 235))
rightBoundary.points.push(new Point(508, game.context.canvas.height))
rightBoundary.points.push(new Point(508 * 2, game.context.canvas.height))
rightBoundary.points.push(new Point(508 * 2, 235))
rightBoundary.points.push(new Point(508, 235))
