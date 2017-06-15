/**
 * Created by Administrator on 2017/6/10 0010.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User')
var jsonFile = require('jsonfile')

var responseData;

router.use((req,res,next)=>{
    responseData = {
        isLogged:false,
        username:'',
        isAdmin:false
    }
    next();
})

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/main/userInfo',(req,res)=>{
    console.log(req.userInfo);
    res.json(req.userInfo);
})

router.get('/main/singerList',(req,res)=>{
    jsonFile.readFile('singerList.json', function(err, jsonData) {
        if (err) throw err;
        res.json(jsonData);
    })
})





module.exports = router;