/**
 * Created by Administrator on 2017/7/28 0028.
 */
(function (window, factory) {
    window.ClearanceMap = factory()
})(window, function () {
    let typeMap = {
        1: 'mine',
        2: 'blank'
    }

    let ClearanceMap = function (transverse, portrait, mine) {
        this.transverse = transverse
        this.portrait = portrait
        this.mine = mine

        this.init(transverse, portrait, mine)
        this.addEvent()
    }

    ClearanceMap.prototype = {
        init(transverse, portrait, mine) {
            transverse = transverse || this.transverse
            portrait = portrait || this.portrait
            mine = mine || this.mine

            this.mineMap = getMineMap(transverse, portrait, mine)
            this.dom = this.createNode(transverse, portrait)
        },
        createNode(transverse, portrait) {
            let wrap = document.querySelector('#app')
            wrap.innerHTML = ''

            let frag = document.createDocumentFragment()
            for (let i = 0; i < transverse; i++) {
                let ul = document.createElement('ul')
                for (let j = 0; j < portrait; j++) {
                    let li = document.createElement('li')
                    li.setAttribute('data-coordinate', i + '-' + j)
                    ul.appendChild(li)
                }
                frag.appendChild(ul)
            }
            wrap.appendChild(frag)

            return wrap
        },
        addEvent() {
            let wrap = this.dom
            wrap.addEventListener('click', (e) => {
                if (e.target.tagName.toLowerCase() === 'li') {
                    let coordinate = e.target.getAttribute('data-coordinate').split('-')
                    if (this.testMine(...coordinate)) {
                        // 踩雷 重来
                        setTimeout(() => {
                            alert('boom')
                            this.init()
                        })
                    } else {
                        //不是雷 显示
                        let ret = this.testMineMap(...coordinate)
                        let tg = this.dom.querySelector('[data-coordinate="' + coordinate.join('-') + '"]')
                        tg.className = 'open'
                        if (typeof ret === 'number') {
                            this.mineMap[coordinate[0]][coordinate[1]].open = true
                            tg.innerHTML = ret
                        } else {
                            this.analysis(ret)
                        }
                    }
                }
            })
        },
        testMine(x, y) {
            if (!this.mineMap[x][y].open && this.mineMap[x][y].type === typeMap[1]) {
                return true
            }
            return false
        },
        testMineMap(x, y){
            x = x | 0
            y = y | 0

            let ret = 0
            let blankRet = []
            for (let i = x - 1; i <= x + 1; i++) {
                if (!(i >= 0 && i < this.transverse)) continue
                for (let j = y - 1; j <= y + 1; j++) {
                    if (!(j >= 0 && j < this.portrait)) continue
                    if (x !== i || y !== j) {
                        if (this.mineMap[i][j].type === typeMap[1]) {
                            ret++
                        } else if (!this.mineMap[i][j].open) blankRet.push({x: i, y: j})
                    }
                }
            }
            return ret ? ret : blankRet
        },
        analysis(arr) {
            let blankArray = []
            arr.forEach(({x, y}) => {
                if (this.mineMap[x][y].open) return

                let ret = this.testMineMap(x, y)
                let tg = this.dom.querySelector('[data-coordinate="' + x + '-' + y + '"]')
                this.mineMap[x][y].open = true
                tg.className = 'open'
                if (typeof ret === 'number') {
                    tg.innerHTML = ret
                } else {
                    blankArray.push(...ret)
                }
            })
            blankArray.length && this.analysis(blankArray)
        }
    }

    return ClearanceMap
})