/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var config = require('./config/index');
var opn = require('opn')

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller',(req,res)=>{
  res.json({
    errno: 0,
    data: seller,
  })
});

apiRoutes.get('/goods',(req,res)=>{
  res.json({
    errno: 0,
    data: goods,
  })
});

apiRoutes.get('/ratings',(req,res)=>{
  res.json({
    errno: 0,
    data: ratings,
  })
});

app.use('/api',apiRoutes);

app.use(express.static('./dist'));

var server = app.listen(port, (err)=>{
  if(err){
    console.log(err);
    return;
  }
  var url = 'http://localhost:' + port + '/?id=12345#/goods';
  console.log(url);
  opn(url);
})
