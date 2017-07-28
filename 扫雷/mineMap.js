/**
 * Created by Administrator on 2017/7/28 0028.
 */
((window, factory) => {
    window.getMineMap = factory
})(window, (x, y, num) => {
    let typeMap = {
        1: 'mine',
        2: 'blank'
    }

    if (num < x * y) {
        let i, rx, ry, ret = [];

        for (i = 0; i < x; i++) {
            ret[i] = Array.apply(null, {length: y}).map(() => {
                return {
                    open: false,
                    type: typeMap[2]
                }
            })
        }
        i = 0
        while (i < num) {
            rx = Math.floor(Math.random() * x)
            ry = Math.floor(Math.random() * y)
            if (ret[rx][ry].type !== typeMap[1]) {
                ret[rx][ry].type = typeMap[1]
                i++
            }
        }
        return ret
    }
})