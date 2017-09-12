/**
 * Created by Administrator on 2017/9/10 0010.
 */
self.onmessage = function (event) {
  const imagedata = event.data
  const data = imagedata.data
  const length = data.length
  const width = imagedata.width

  for (let i = 0; i < length; i++) {
    if ((i + 1) % 4 !== 0) {
      if ((i + 4) % (width * 4) === 0) {
        data[i] = data[i - 4]
        data[i + 1] = data[i - 3]
        data[i + 2] = data[i - 2]
        data[i + 3] = data[i - 1]
        i += 4
      } else {
        data[i] = 2 * data[i] - data[i + 4] - 0.5 + data[i + 4]
      }
    }
  }

  self.postMessage(imagedata)
}
