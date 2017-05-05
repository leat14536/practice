/**
 * Created by Administrator on 2017/5/5 0005.
 */
var bodyParser = require('body-parser');
var swig = require('swig');
var express = require('express');
var app = express();

var server = app.listen(3000);
var io = require('socket.io')(server);


app.use( bodyParser.urlencoded({extended:true}) );

app.engine('html', swig.renderFile);
app.set('views','./views');
app.set('view engine','html');



app.get('/', function(req,res){
    res.render('index')
})

io.on('connection', function(client){
    var i=0;

    client.on('send',(data)=>{
        setTimeout(()=>{
            i++;
            client.emit('message',i+' : '+data);
        },3000);
    })

    client.on('disconnect', function(){
        console.log('disconnect')
    });
});