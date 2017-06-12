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
    console.log(req.userInfo)
    if(req.userInfo) {
        User.findOne({
            _id: req.userInfo._id,
            username: req.userInfo.username
        }).then((userInfo)=>{
            if(userInfo){
                responseData.isLogged = true;
                responseData.username = userInfo.username;
                responseData.isAdmin = req.userInfo.isAdmin
            }
            res.json(responseData);
        })
    }
})

router.get('/main/singerList',(req,res)=>{
    jsonFile.readFile('singerList.json', function(err, jsonData) {
        if (err) throw err;
        res.json(jsonData);
    })
})





module.exports = router;