/**
 * Created by Administrator on 2017/4/17 0017.
 */
var http = require('http');

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('hello')
    res.end()
}).listen(8888);