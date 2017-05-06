/**
 * Created by Administrator on 2017/5/5 0005.
 */
var express = require('express');
var app = express();

var server = app.listen(8000,()=>{
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
var io = require('socket.io')(server);

app.use(express.static('views'));

app.get('/', function(req,res){
    res.render('index')
})

io.on('connection', function(client){
    var i=0;

    client.on('message',(data)=>{                   //服务器message事件, 客户端使用emit('message',val)时触发,参数为emit的第二个参数
        setTimeout(()=>{
            i++;
            client.emit('message',i+' : '+data);    //向客户端发送消息,客户端on('message')接收
        },3000);
    })

    client.on('disconnect', function(){             //客户端使用socket.close();时触发,关闭连接
        console.log('disconnect')
    });
});