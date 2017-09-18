/**
 * Created by Administrator on 2017/9/6 0006.
 */
import {Game} from './assets/game'
import {$} from 'plugins/util'
import {ballSprite} from './sprites/ballShape'
import {loadImage} from './api/loadImage'
import {getLaunchImage} from './api/getLaunchImage'
import {pushShape} from './api/pushShape'
import {startAnimate, paintUnderSprites, keyListeners} from './gameOptions'
import COREHTML5 from 'plugins/COREHTML5'
import {actuatorSprite} from './sprites/actuatorSprite'
import {globalData, BALL_LAUNCH_TOP, BALL_LAUNCH_LEFT} from './global'

const pausedToast = $('#pausedToast')
const progressbar = new COREHTML5.Progressbar(300, 23, 'rgba(0,0,0,0.5)', 100, 130, 250)
const progressDiv = $('#progressDiv')
const loadingToast = $('#loadingToast')
// const loadingToastTitle = $('#loadingToastTitle')
const showPolygonsOnlyToast = $('#showPolygonsOnlyToast')
const showPolygonsOnlyCheckbox = $('#showPolygonsOnlyCheckbox')
const scoreToast = $('#scoreToast')
const gameOverToast = $('#gameOverToast')
const newGameButton = $('#newGameButton')

progressDiv.style.display = 'block'
progressDiv.appendChild(progressbar.domElement)

const game = new Game('pinball', '#canvas')

// gameOptions
game.startAnimate = startAnimate
game.paintUnderSprites = paintUnderSprites
game.addSprite(actuatorSprite)
game.addSprite(ballSprite)
game.on('gameover', () => (gameOverToast.style.display = 'block'))
game.on('togglePause', (paused) => (pausedToast.style.display = paused ? 'inline-block' : 'none'))

keyListeners.forEach(keyListener => game.addKeyListener(keyListener))

globalData.game = game

loadImage(game)
pushShape()

// 预加载进度
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
    actuatorSprite.visiable = true

    ballSprite.top = BALL_LAUNCH_TOP
    ballSprite.left = BALL_LAUNCH_LEFT

    getLaunchImage(game)

    game.start()
  }
}, 16)

// 事件监听
document.addEventListener('keydown', game.keyPressed.bind(game))

newGameButton.addEventListener('click', () => {
  gameOverToast.style.display = 'none'
  startNewGame()
})

showPolygonsOnlyCheckbox.addEventListener('change',
  () => {
    globalData.showPolygonsOnly = showPolygonsOnlyCheckbox.checked
    actuatorSprite.visiable = !showPolygonsOnlyCheckbox.checked
    showPolygonsOnlyCheckbox.blur()
  })

pausedToast.addEventListener('click', () => {
  game.togglePaused()
  pausedToast.style.display = 'none'
})

function startNewGame() {
  showPolygonsOnlyToast.style.display = 'block'
  globalData.gameOver = false
  globalData.liveLeft = 3
  globalData.loading = false
  gameOverToast.style.display = 'none'
}
