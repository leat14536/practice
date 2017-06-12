/**
 * Created by Administrator on 2017/6/10 0010.
 */
var express = require('express');
var router = express.Router();

router.get('/user',(req, res, next)=>{
    res.send('aaaa');
})


module.exports = router;