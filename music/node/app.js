/**
 * Created by Administrator on 2017/6/10 0010.
 */
let express = require('express');
let swig = require('swig');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let Cookies = require('cookies');
var User = require('./models/User')
//第一个参数表示后缀
app.engine('html',swig.renderFile);

//目录
app.set('views','./views');

app.set('view engine','html');

app.set('trust proxy', 'loopback, linklocal, uniquelocal')

swig.setDefaults({cache:false});

app.use( bodyParser.urlencoded({extended:true}) );


app.use( ( req, res, next )=>{
    req.cookies = new Cookies( req, res );
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取登录用户类型
            User.findById(req.userInfo._id).then((userInfo)=>{
                req.userInfo.isAdmin = false;
                if(userInfo) req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e){
            throw error(e);
        }
    }else{
        next();
    }
})

//静态文件托管
app.use('/public',express.static( __dirname+ '/public'));

app.use('/admin',require('./router/admin'));
app.use('/api',require('./router/api'));
app.use('/',require('./router/main'));

//网易云接口
//歌单接口
app.use('/artist/album', require('./router/artist_album'));

//音乐url接口
app.use('/music/url', require('./router/musicUrl'))

mongoose.connect('mongodb://localhost:27018/blog',(err)=>{
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功');
        app.listen(9001,()=>{
            console.log('9001')
        });
    }
});