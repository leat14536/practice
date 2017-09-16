/**
 * Created by Administrator on 2017/9/6 0006.
 */
/* eslint-disable */
import {game} from './game'
import {$} from 'plugins/util'
import {ballSprite} from './sprites/ballMover'
import {loadImage} from './api/loadImage'
import {pushShape} from './api/pushShape'
import COREHTML5 from 'plugins/COREHTML5'
import {globalData} from './global'

const progressbar = new COREHTML5.Progressbar(300, 23, 'rgba(0,0,0,0.5)', 100, 130, 250)
const progressDiv = $('#progressDiv')
progressDiv.style.display = 'block'
progressDiv.appendChild(progressbar.domElement)
const loadingToast = $('#loadingToast')
const loadingToastTitle = $('#loadingToastTitle')
const showPolygonsOnlyToast = $('#showPolygonsOnlyToast')
const showPolygonsOnlyCheckbox = $('#showPolygonsOnlyCheckbox')
const scoreToast = $('#scoreToast')

loadImage()
pushShape()

// 图片加载
const loadTimer = setInterval(() => {
  const percentage = game.loadImages()
  progressbar.draw(percentage)
  if (percentage === 100) {
    clearInterval(loadTimer)

    progressDiv.style.display = 'none'
    loadingToast.style.display = 'none'

    showPolygonsOnlyToast.style.display = 'block'
    showPolygonsOnlyToast.style.left = '290px'
    // readoutToast.style.display = 'block'
    scoreToast.style.display = 'inline'

    globalData.launching = true
    globalData.loading = false

    globalData.score = 0
    scoreToast.innerText = '0'

    ballSprite.visiable = true
    // actuatorSprite.visible = true

    game.start()
  }
}, 16)
