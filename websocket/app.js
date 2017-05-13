/**
 * Created by Administrator on 2017/5/5 0005.
 */
var express = require('express');
var app = express();

var server = app.listen(8000,()=>{
    console.log('Example app listening at 127.0.0.1:8000');
});
var io = require('socket.io')(server);

app.use(express.static('views'));

app.get('/', (req,res)=>{
    res.render('index')
})

io.on('connection', (client)=>{
    console.log('connection');
    var i=0;

    client.on('message',(data)=>{                       //服务器message事件, 客户端使用emit('message',val)时触发,参数为emit的第二个参数
        setTimeout(()=>{
            i++;
            client.emit('message',i+' : '+data);        //向客户端发送消息,客户端on('message')接收
        },2000);
    })

    client.on('disconnect', function(){                 //客户端使用socket.close();时触发,关闭连接
        console.log('disconnect')
    });
});