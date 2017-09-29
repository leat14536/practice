/**
 * Created by Administrator on 2017/9/29 0029.
 */

var express = require('express')
var apiRouter = require('./build/dev-router.js')

const app = express()

app.use('/api', apiRouter)
app.use(express.static('./dist'))

const port = 8888
module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
