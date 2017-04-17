/**
 * Created by Administrator on 2017/4/17 0017.
 */
var https = require('https');
var fs = require('fs')

var options = {
    key: fs.readFileSync('ssh_key.pem'),
    cert: fs.readFileSync('ssh_cert.pem')
}

https.createServer(options, function(req, res){
    res.writeHead(200)
    res.end('Hello Imooc')
}).listen(8080);