/**
 * Created by Administrator on 2017/4/18 0018.
 */
let express = require('express')
let port = process.env.PORT || 8000
let app = express();

app.set('views','./views')
app.set('view engine','jade')
app.listen(port)

console.log('started on localhost:'+port)

// index page
app.get('/',(req,res)=>{
    res.render('index',{
        title: '问卷列表'
    })
})

// newList page
app.get('/add',(req,res)=>{
    res.render('newList',{
        title: '问卷添加'
    })
})

// viewData page
app.get('/view',(req,res)=>{
    res.render('viewData',{
        title: '问卷数据查看'
    })
})

// edit page
app.get('/edit',(req,res)=>{
    res.render('edit',{
        title: '问卷修改'
    })
 })
