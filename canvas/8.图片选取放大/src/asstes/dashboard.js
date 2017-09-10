/**
 * Created by Administrator on 2017/9/7 0007.
 */
const CENTROID_RADIUS = 10
const CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.5)'
const CENTROID_FILL_STYLE = 'rgba(80, 190, 240, 0.6)'

const RING_INNER_RADIUS = 35
const RING_OUTER_RADIUS = 55

const ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)'
const ANNOTATIONS_TEXT_SIZE = 12

const TICK_WIDTH = 10
const TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)'
const TICK_SHORT_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)'

const TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.5)'

const GUIDEWIRE_STROKE_STYLE = 'goldenrod'
const GUIDEWIRE_FILL_STYLE = 'rgba(250, 250, 0, 0.6)'

export default class Dashboard {
  constructor(x = 400, y = 250, radiu = 150) {
    this.x = x
    this.y = y
    this.radiu = radiu
  }

  draw(ctx, loc) {
    const radiu = this.radiu
    const x = this.x
    const y = this.y
    drawCentroid()
    drawCentroidGuidewire()

    drawRing()
    drawTickInnerCircle()
    drawTicks()
    drawAnnotations()

    function drawCentroid() {
      ctx.beginPath()
      ctx.save()
      ctx.strokeStyle = CENTROID_STROKE_STYLE
      ctx.fillStyle = CENTROID_FILL_STYLE
      ctx.arc(loc.x, loc.y, CENTROID_RADIUS, 0, Math.PI * 2, false)
      ctx.stroke()
      ctx.fill()
      ctx.restore()
    }

    function drawCentroidGuidewire() {
      let angle = -Math.PI / 4
      let radius, endpt

      radius = radiu + RING_OUTER_RADIUS
      if (loc.x >= x) {
        endpt = {
          x: x + radius * Math.cos(angle),
          y: y + radius * Math.sin(angle)
        }
      } else {
        endpt = {
          x: x - radius * Math.cos(angle),
          y: y - radius * Math.sin(angle)
        }
      }

      ctx.save()
      ctx.strokeStyle = GUIDEWIRE_STROKE_STYLE
      ctx.fillStyle = GUIDEWIRE_FILL_STYLE

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(endpt.x, endpt.y)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = TICK_LONG_STROKE_STYLE
      ctx.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false)
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    }

    function drawRing() {
      drawRingOuterCircle()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.arc(x, y, radiu + RING_INNER_RADIUS, 0, Math.PI * 2, false)

      ctx.fillStyle = 'rgba(100, 140, 230, 0.1)'
      ctx.fill()
      ctx.stroke()
    }

    function drawRingOuterCircle() {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3
      ctx.shadowBlur = 6
      ctx.strokeStyle = TRACKING_DIAL_STROKING_STYLE
      ctx.beginPath()
      ctx.arc(x, y, radiu + RING_OUTER_RADIUS, 0, Math.PI * 2, true)
      ctx.stroke()
    }

    function drawTickInnerCircle() {
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.arc(x, y, radiu + RING_INNER_RADIUS - TICK_WIDTH, 0, Math.PI * 2, false)
      ctx.stroke()
      ctx.restore()
    }

    function drawTick(angle, radius, cnt) {
      const tickWidth = cnt % 2 === 0 ? TICK_WIDTH : TICK_WIDTH / 2

      ctx.beginPath()

      ctx.moveTo(x + Math.cos(angle) * (radius - tickWidth), y + Math.sin(angle) * (radius - tickWidth))

      ctx.lineTo(x + Math.cos(angle) * (radius), y + Math.sin(angle) * (radius))

      ctx.strokeStyle = TICK_SHORT_STROKE_STYLE
      ctx.stroke()
    }

    function drawTicks() {
      let radius = radiu + RING_INNER_RADIUS
      let ANGLE_MAX = 2 * Math.PI
      let ANGLE_DELTA = Math.PI / 64

      ctx.save()

      for (let angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, cnt++) {
        drawTick(angle, radius, cnt)
      }
      ctx.restore()
    }

    function drawAnnotations() {
      const radius = radiu + RING_INNER_RADIUS
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.save()
      ctx.fillStyle = ANNOTATIONS_FILL_STYLE
      ctx.font = ANNOTATIONS_TEXT_SIZE + 'px Helvetica'

      for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 8) {
        ctx.beginPath()
        ctx.fillText((angle * 180 / Math.PI).toFixed(0),
          x + Math.cos(angle) * (radius - TICK_WIDTH * 2),
          y - Math.sin(angle) * (radius - TICK_WIDTH * 2)
        )
      }
      ctx.restore()
    }
  }
}
