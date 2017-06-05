/**
 * Created by Administrator on 2017/6/5 0005.
 */
var express = require('express');
var path = require('path');

app = express();

app.set('view engine','html');
app.engine('.html',require('ejs').__express);
app.use(express.static(path.join(__dirname,'public')))

/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/
app.get('/data.js',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/data.js'));
})
app.get('/',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.sendFile(path.join(__dirname,'./public/data.json'));
})
app.listen(3000,()=>{
    console.log('3000');
})