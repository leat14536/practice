/**
 * Created by Administrator on 2017/4/19 0019.
 */
(function(){
    /*
    *   表格数据
    *   id: 问卷私有id
    *   state 两种状态 0 未发布 1 发布中
    *   title 标题
    *   setTime 问卷建立时间
    *   endTime 问卷结束时间
    *   question 问题列表
    *       num: 题目编号
    *       title:题目
    *       type: 题目类型 1单选 2多选 3文本
    *       type = 1||2时 option: [str,str...] 记录选项及顺序 文本题无此项
    *       type = 3 时 option: true必填 false选填
    * */
    let questionnaireData = [
        {
            id: 0,
            state : 1,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,3,19,20,34,15),
            endTime : new Date(2017,10,1),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    option: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    option: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                    option: true,
                },
            ]
        },{
            id: 1,
            state : 0,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,3,20,20,34,15),
            endTime : new Date(2017,10,2),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    option: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    option: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                    option: true,
                },
            ]
        },{
            id: 2,
            state : 1,
            title : '这是我的第一份问卷',
            setTime: new Date(2017,1,20,20,34,15),
            endTime : new Date(2017,3,5),
            question : [
                {
                    num: 1,
                    title: '单选题',
                    type: 1,
                    option: ['选项1','选项2','选项3']
                },
                {
                    num: 1,
                    title: '多选题',
                    type: 2,
                    option: ['选项1','选项2','选项3','选项4']
                },
                {
                    num: 1,
                    title: '文本题',
                    type: 3,
                    option: true,
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
    let viewDataURL = 'view.html';

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
                        editState = 'disabled="disabled"';
                        viewState = "查看数据"
                    }else{
                        stateStr = '<strong class="text-success">发布中</strong>'
                        editState = 'disabled="disabled"';
                        viewState = "查看问卷"
                    }
                }else{
                    stateStr = '<strong class="text-muted">未发布</strong>'
                    editState = '';
                    viewState = "查看问卷"
                }

                let Minutes = obj.setTime.getMinutes();
                if(Minutes<10) Minutes = '0'+Minutes;
                let Seconds = obj.setTime.getSeconds();
                if(Seconds<10) Seconds = '0'+Seconds;

                tbody.innerHTML += `<tr class="questionNaireData">
                    <td><input type="checkbox" class="checkBox" data-code=${num} /> </td>
                    <td>${obj.title}</td>
                    <td>${obj.setTime.getFullYear()}-${obj.setTime.getMonth()+1}-${obj.setTime.getDate()} ${obj.setTime.getHours()}:${Minutes}:${Seconds}</td>
                    <td >${stateStr}</td>
                    <td>
                        <input type="button" class="btn btn-default btn-xs" value="编辑" data-code=${num} ${editState} name=${btnEdit} />
                        <input type="button" class="btn btn-default btn-xs" value="删除" data-code=${num} name=${btnDel} />
                        <input type="button" class="btn btn-default btn-xs" value=${viewState} data-code=${num}  name=${btnWatch} />
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
                               //设置编辑选项
                               //sessionStorage.questionnaireDataEdit = questionnaireData[target.getAttribute('data-code')].id;
                               //console.log(sessionStorage.questionnaireDataEdit)
                               window.location.href = newQueURL+'?'+questionnaireData[target.getAttribute('data-code')].id;
                               //转到编辑页面
                               break;
                           case (btnWatch):
                               //sessionStorage.questionnaireDataEdit = questionnaireData[target.getAttribute('data-code')].id;
                               //观看数据页面
                               window.location.href = viewDataURL+'?'+questionnaireData[target.getAttribute('data-code')].id;
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