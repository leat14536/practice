/**
 * Created by Administrator on 2017/6/10 0010.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User')

//统一返回格式
var responseData;

router.use((req,res,next)=>{
    responseData = {
        code: 0,
        message: '',
    }
    next();
})

router.get('/',(req, res, next)=>{
})

/*
 *   用户注册
 * */
router.post('/user/register',(req, res)=>{
    var username = req.body.username,
        password = req.body.password,
        repassword = req.body.repassword;

    //验证逻辑
    if( username==='' ){
        responseData.code='1';
        responseData.message='用户名不能为空';
        res.json(responseData);
        return;
    }

    if( password==='' ){
        responseData.code='2';
        responseData.message='密码不能为空';
        res.json(responseData);
        return;
    }

    if( password!==repassword ){
        responseData.code='3';
        responseData.message='两次密码输入不一致';
        res.json(responseData);
        return;
    }

    //数据库查询是否已注册
    User.findOne({
        username
    }).then((userInfo)=>{
        if(userInfo){
            //已存在用户
            responseData.code=4;
            responseData.message='该用户名已注册';
            res.json(responseData);
            return;
        }
        var user = new User({
            username,
            password
        });
        return user.save();
    }).then((newUserInfo)=>{
        responseData.message='注册成功';
        res.json(responseData);
    })
})

router.post('/user/login',( req, res, next )=>{
    var username = req.body.username,
        password = req.body.password;

    if(username===''||password===''){
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }

    //查询用户名密码是否一致
    User.findOne({
        username,
        password
    }).then((userInfo)=>{
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }

        //登录成功
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        var cookie = JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        })
        req.cookies.set('userInfo',cookie);
        res.json(responseData);
    })
})

/*
*   注销
* */
router.get('/user/logout',( req, res, next )=>{
    req.cookies.set('userInfo',null);
    res.json(responseData);
})
module.exports = router;


































