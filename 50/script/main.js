/**
 * Created by Administrator on 2017/4/19 0019.
 */
(function(){
    /*
    *   表格数据
    *   state 两种状态 0 未发布 1 发布中
    *   title 标题
    *   setTime 问卷建立时间
    *   endTime 问卷结束时间
    *   question 问题列表
    *       num: 题目编号
    *       title:题目
    *       type: 题目类型 1单选 2多选 3文本
    *       option: [str,str...] 记录选项及顺序 文本题无此项
    * */
    let questionnaireData = [
        {
            state : 1,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,4,19,20,34,15),
            endTime : new Date(2017,10,1),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    options: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    options: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                },
            ]
        },{
            state : 0,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,4,20,20,34,15),
            endTime : new Date(2017,10,2),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    options: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    options: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                },
            ]
        },{
            state : 1,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,2,20,20,34,15),
            endTime : new Date(2017,3,5),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    options: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    options: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                },
            ]
        },
    ]
    let stateStr = {
        0: '未发布',
        1: '发布中',
        2: '已结束',
    }
    let newQuestionnaire = 'newQuestionnaire';                      //新建问卷id
    let selectAll = 'selectAll';                                    //全选id
    let deleteAllSelect = 'deleteAllSelect'                         //选择删除id
    let btnDel = 'del';
    let btnEdit = 'edit';
    let btnWatch = 'watch';
    let newQueURL = 'newQuestionNaire.html'                         //新建问卷跳转页面

    /*
    *   利用表格数据渲染头页面
    * */
    function render(){
        sessionStorage.questionnaireData=JSON.stringify(questionnaireData);

        let container = document.getElementsByClassName('container')[0]
        if(questionnaireData.length){
            let tbody = document.getElementById('tbody');
            tbody.innerHTML = '';
            questionnaireData.forEach((obj,num)=>{
                let stateStr,viewState,editState;
                let NowDate = new Date();
                if(typeof obj.setTime==='string') {
                    obj.setTime = new Date(obj.setTime)
                }
                if(typeof obj.endTime==='string'){
                    obj.endTime = new Date(obj.endTime)
                }
                if(obj.state){
                    if(obj.endTime.getTime()<NowDate.getTime()){
                        stateStr = '<strong class="text-muted">已结束</strong>'
                    }else{
                        stateStr = '<strong class="text-success">发布中</strong>'
                    }
                    editState = 'disabled="disabled"';
                }else{
                    stateStr = '<strong class="text-muted">未发布</strong>'
                    viewState = 'disabled="disabled"'
                }

                tbody.innerHTML += `<tr class="questionNaireData">
                    <td><input type="checkbox" class="checkBox" data-code=${num} /> </td>
                    <td>${obj.title}</td>
                    <td>${obj.setTime.getFullYear()}-${obj.setTime.getMonth()}-${obj.setTime.getDate()} ${obj.setTime.getHours()}:${obj.setTime.getMinutes()}:${obj.setTime.getSeconds()}</td>
                    <td >${stateStr}</td>
                    <td>
                        <input type="button" class="btn btn-default btn-xs" value="编辑" data-code=${num} ${editState} name=${btnEdit} />
                        <input type="button" class="btn btn-default btn-xs" value="删除" data-code=${num} name=${btnDel} />
                        <input type="button" class="btn btn-default btn-xs" value="查看数据" data-code=${num} ${viewState} name=${btnWatch} />
                    </td>
                </tr>`

            })
        }else{
            container.innerHTML = `<input type="button" class="btn btn-warning btn-lg center-block" id=${newQuestionnaire} value="+ 新建问卷" />`;
        }
    }

    /*
    *   添加点击事件
    * */
    function bodyAddEv(){
       document.body.addEventListener('click',function(e){
           let target = e.target||e.srcElement;
           switch (target.id){
               case(newQuestionnaire):
                   //新建问卷
                   window.location.href = newQueURL;
                   break;
               case(selectAll):
                   selectAllCheckBox(e);
                   break;
               case(deleteAllSelect):
                   deleteAllselect();
                   break;
               default:
                   if(target.type==='button'){
                       let num = target.getAttribute('data-code');
                       let operation = target.getAttribute('name')
                       switch(operation) {
                           case(btnDel):
                               questionnaireData.splice(num, 1)
                               render();
                               break;
                           case(btnEdit):
                               //跳转操作页面
                               break;
                           case (btnWatch):
                               //跳转观看数据页面
                               break;
                       }

                   }

           }
       })



        /*
        *   全选
        * */
        function selectAllCheckBox(e){
            let target = e.target||e.srcElement;
            let checkBox = document.getElementsByClassName('checkBox');
            if(target.checked) {
                Array.prototype.forEach.call(checkBox, (node)=> {
                    node.checked = true;
                })
            }else{
                Array.prototype.forEach.call(checkBox, (node)=> {
                    node.checked = false;
                })
            }
        }

        /*
        *   删除选中问卷
        * */
        function deleteAllselect(){
            let checkBox = document.getElementsByClassName('checkBox');
            let deleteArr = [];
            Array.prototype.forEach.call(checkBox,(node,i)=>{
                if(node.checked)deleteArr.unshift(i);
            })
            deleteArr.forEach((num)=>{
                questionnaireData.splice(num,1);
            })
            render();
        }


    }

    /*
    *   获取questionnaireData
    * */
    function getQuestionnaireData(){
        if(sessionStorage.questionnaireData) {
            questionnaireData = JSON.parse(sessionStorage.questionnaireData)
            console.log(JSON.parse(sessionStorage.questionnaireData))
        }
    }





    window.onload = function(){
        getQuestionnaireData();
        render();
        bodyAddEv();
    }
})();