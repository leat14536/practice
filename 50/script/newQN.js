/**
 * Created by Administrator on 2017/4/20 0020.
 */
(function(window){
    window.onload = ()=>{
        questionNaireInit();
        datePanel();
        questionBox();
        addEv();
    }

    let surface;                                //悬浮层

    let QnData = {};                             //单个问卷对象
    let radioTitle = '这是一道单选题';
    let multiselectTitle = '这是一道复选题'
    let textTitle = '这是一道文本题'
    let MainURL = '50.html';

    /*
    *   初始化新问卷对象,初始化悬浮层
    * */
    function questionNaireInit(){
        surface = new surfaced(document.getElementsByClassName('surfaced')[0]);

        let urlId = location.search.replace('?','');
        if(urlId.length&&typeof urlId-0==='number'){
            //编辑
            if(judgeEdit(urlId)){
                document.getElementsByTagName('title')[0].innerHTML = '修改问卷';
                render();
                return;
            }
        }

        //新建

        QnData.id = Date.parse(new Date());
        QnData.state = 0;
        QnData.title = '这里是标题';
        QnData.setTime = new Date();
        QnData.endTime = null;
        QnData.question = [];

    }

    /*
     *  验证是否为编辑
     * */
    function judgeEdit(urlId){
        questionnaireData = JSON.parse(sessionStorage.questionnaireData);
        for( i=0; i<questionnaireData.length; i++　){
            if(questionnaireData[i].id==urlId){
                QnData = questionnaireData[i];
                if(QnData.setTime){
                    QnData.setTime = new Date(QnData.setTime)
                }
                if(QnData.endTime){
                    QnData.endTime = new Date(QnData.endTime)
                }
                return true;
            }
        }
        return false;
    }

    /*
    *   添加问题下移动画
    * */
    function questionBox(){
        let addBox = document.getElementsByClassName('addBox')[0]
        let addBtn = document.getElementsByClassName('addBtn')[0];
        let cnt = 0;
        let state = 0;
        let timer;
        addBtn.onclick = ()=>{
            clearInterval(timer)
            if(state){
                state = 0;
                timer = setInterval(()=> {
                    cnt -= 2;
                    addBox.style.height = addBox.offsetHeight - 2 + 'px';
                    addBtn.style.top = cnt + 'px';
                    if (cnt <= 0) {
                        clearInterval(timer);
                    }
                }, 10);
            }else {
                state = 1;
                timer = setInterval(()=> {
                    cnt += 2;
                    addBox.style.height = addBox.offsetHeight + 2 + 'px';
                    addBtn.style.top = cnt + 'px';
                    if (cnt >= 54) {
                        clearInterval(timer);
                    }
                }, 10);
            }
        }
    }

    /*
    *   日期面板
    * */
    function datePanel(){
        let wrap = document.getElementsByClassName('ui-dataPanel-wrap')[0];
        let calendarWrap = new calendar(wrap);
        calendarWrap.setChangeCallBack(function(...date){
            QnData.endTime = new Date(date[0],date[1]-1,date[2])
            document.getElementsByClassName('endTime')[0].innerHTML = date.join('-') ;
            calendarWrap.toggle();
        })
        let dateBtn = document.getElementsByClassName('endTime')[0].onclick = ()=>{
            calendarWrap.toggle();
        }
    }

    /*
    *   点击修改
    *       可点击修改的元素带 data-canModify=true
    * */
    function addEv(){
        let ipt = document.createElement('input');
        let value;
        ipt.setAttribute('type','text');
        document.body.addEventListener('click',(e)=>{
            let target = e.target||e.srcElement;
            if(target.getAttribute('data-canModify')){
                value = target.innerHTML;
                target.innerHTML = '';
                target.appendChild(ipt);
                ipt.value = value;
                ipt.focus();
            }else if(target.getAttribute('data-question-type')){
                addQuestion(target.getAttribute('data-question-type'));
            }else if(target.tagName.toLowerCase()=='button'){
                let btnType = target.getAttribute('data-btnType')
                //console.log('BtnType:'+target.getAttribute('data-btnType'));
                let parDivNum,tmp,selectNum;                                        //题号 tmp 选项号
                switch(btnType){
                    case('save'):
                        //保存
                        if(QnData.question.length>=1&&QnData.question.length<=10){
                            //存储数据
                            saveQstData();
                            //console.log('保存');

                            changeSurfaced('保存成功,是否返回首页')
                            surface.show();

                        }else{
                            alert('题目数量应大于1且小于10');
                        }
                        break;
                    case('issue'):
                        //发布
                        if(QnData.question.length>=1&&QnData.question.length<=10){
                            //判断结束时间
                            let nowDate = new Date();
                            if(QnData.endTime) {
                                if (QnData.endTime.getTime() > nowDate.getTime()) {
                                    //存储数据
                                    QnData.state = 1;
                                    saveQstData();
                                    //发布问卷
                                    changeSurfaced('发布成功,是否返回首页',QnData.endTime)
                                    surface.show();
                                    //console.log('发布')
                                } else {
                                    alert('问卷截止时间不能早于当前');
                                }
                            }else{
                                alert('请填写问卷截止日期')
                            }
                        }else{
                            alert('题目数量应大于1且小于10');
                        }
                        break;
                    case('copy'):
                        //复用
                        parDivNum = getNum(target);
                        if( QnData.question.length<10) {
                            let NewQuestion = {};
                            for (let item in  QnData.question[parDivNum]) {
                                if (typeof QnData.question[parDivNum][item] == 'object') {
                                    NewQuestion[item] = []
                                    for (let j = 0; j < QnData.question[parDivNum][item].length; j++) {
                                        NewQuestion[item][j] = QnData.question[parDivNum][item][j]
                                    }
                                } else {
                                    NewQuestion[item] = QnData.question[parDivNum][item];
                                }
                            }
                            //QnData.question.push(NewQuestion);
                            QnData.question.splice( parDivNum,0,NewQuestion)
                            render();
                        }else{
                            alert('题目不得多于10个')
                        }
                        break;
                    case('questionDel'):
                        //删除问题
                        parDivNum = getNum(target);
                        QnData.question.splice(parDivNum,1);
                        render();
                        break;
                    case('addSelect'):
                        //添加选项
                        parDivNum = getNum(target);
                        QnData.question[parDivNum].option.push('选项'+(QnData.question[parDivNum].option.length+1))
                        render();
                        break;
                    case('selectDel'):
                        //删除选项
                        parDivNum = getNum(target);
                        if( QnData.question[parDivNum].option.length<3){
                            alert('选项不得少于2个')
                        }else {
                            selectNum = target.parentNode.getAttribute('data-select')-0;
                            QnData.question[parDivNum].option.splice(selectNum, 1);
                        }
                        render();
                        break;
                    case('questionUp'):
                        //问题上移
                        parDivNum = getNum(target);
                        tmp = QnData.question[parDivNum];
                        QnData.question[parDivNum] = QnData.question[parDivNum-1];
                        QnData.question[parDivNum-1] = tmp;
                        render();
                        break;
                    case('questionDown'):
                        parDivNum = getNum(target);
                        tmp = QnData.question[parDivNum];
                        QnData.question[parDivNum] = QnData.question[parDivNum+1];
                        QnData.question[parDivNum+1] = tmp;
                        render();
                        break;
                    case('selectUp'):
                        //选项上移
                        parDivNum = getNum(target);
                        selectNum = target.parentNode.getAttribute('data-select')-0;
                        tmp = QnData.question[parDivNum].option[selectNum];
                        QnData.question[parDivNum].option[selectNum] = QnData.question[parDivNum].option[selectNum-1];
                        QnData.question[parDivNum].option[selectNum-1] = tmp;
                        render();
                        break;
                    case('selectDown'):
                        parDivNum = getNum(target);
                        selectNum = target.parentNode.getAttribute('data-select')-0;
                        tmp = QnData.question[parDivNum].option[selectNum];
                        QnData.question[parDivNum].option[selectNum] = QnData.question[parDivNum].option[selectNum+1];
                        QnData.question[parDivNum].option[selectNum+1] = tmp;
                        render();
                        break;
                    case('surfacedTrue'):
                        window.location.href = MainURL;
                        break;
                    case('surfacedFalse'):
                        surface.close();
                        break;
                    //$$$
                }
            }else if( target.type=='checkbox' ){
                if(target.getAttribute('data-checkType')=='require'){
                    parDivNum = getNum(target);
                    QnData.question[parDivNum].option = target.checked;
                    //console.log(QnData.question[parDivNum]);
                }
            }
        })

        ipt.onblur = (e)=>{
            let newValue = ipt.value;
            let parNode = ipt.parentNode;
            newValue = newValue.trim();
            if(newValue.length){
                parNode.innerHTML=newValue;
                switch(parNode.getAttribute('data-type')){
                    case('title'):
                        QnData.title = newValue;
                        break;
                    case('questionTitle'):
                        parDivNum = getNum(parNode);
                        QnData.question[parDivNum].title = newValue;
                        break;
                    case('select'):
                        parDivNum = getNum(parNode);
                        selectNum = parNode.parentNode.lastChild.getAttribute('data-select')-0;
                        QnData.question[parDivNum].option[selectNum] = newValue;
                        break;
                }
            }else{
                parNode.innerHTML=value;
            }
        }

        function getNum(target){
            let divPar = target.parentNode;
            while(divPar.tagName.toLowerCase()!='div'){
                divPar = divPar.parentNode;
            }
            return divPar.getAttribute('data-num')-0;
        }

        function changeSurfaced(str,endtime){
            document.getElementsByClassName('message')[0].innerHTML = str;
            if(endtime){
                document.getElementsByClassName('showEndtime')[0].innerHTML = '( 结束时间: '+endtime.getFullYear()+'-'+(endtime.getMonth()+1)+'-'+(endtime.getDate())+' 0:00:00 )';
            }else{
                document.getElementsByClassName('showEndtime')[0].innerHTML = '';
            }
        }


        //获取全局数据,验证保存
        function saveQstData(){
            let replaceNum=0;
            questionnaireData = JSON.parse(sessionStorage.questionnaireData)
            if(typeof questionnaireData=='object'){
                for( replaceNum; replaceNum<questionnaireData.length; replaceNum++ ){
                    if(questionnaireData[replaceNum].id == QnData.id) break;
                }
                questionnaireData[replaceNum] = QnData;
                sessionStorage.questionnaireData = JSON.stringify(questionnaireData)
            }else{
                //找不到数据时重新设置
                sessionStorage.questionnaireData = JSON.stringify([QnData]);
            }
        }
    }

    /*
    *   添加问题
    * */
    function addQuestion(questionType){
        if(QnData.question.length<10) {
            questionType-=0
            switch (questionType) {
                case(1):
                    addRadioQue();
                    break;
                case(2):
                    addMultiselectQue();
                    break;
                case(3):
                    addTextQue();
                    break;
            }
            render();
        }else{
            alert('题目数量不能大于10')
        }

        function addRadioQue(){
            let question = {
                num :  QnData.question.length+1,
                title : radioTitle,
                type : 1,
                option : ['选项1','选项2','选项3','选项4'],
            }
            QnData.question.push(question);
        }

        function addMultiselectQue(){
            let question = {
                num : QnData.question.length+1,
                title : multiselectTitle,
                type : 2,
                option : ['选项1','选项2','选项3','选项4'],
            }
            QnData.question.push(question);
        }

        function addTextQue(){
            let question = {
                num : QnData.question.length+1,
                title : textTitle,
                type : 3,
                option: true,
            }
            QnData.question.push(question);
        }
    }

    /*
    *   渲染界面
    * */
    function render(){

        let questionList = document.getElementsByClassName('questionList')[0];
        questionList.innerHTML = '';

        QnData.question.forEach((question,num)=>{
            let questionItem = document.createElement('div');
            questionItem.setAttribute('class','questionItem');
            questionItem.setAttribute('data-num',num);
            let moveUp='',moveDown='';
            if(num==0) moveUp = 'disabled="disabled"';
            if(num==QnData.question.length-1) moveDown = 'disabled="disabled"';

            if(question.type==1||question.type==2) {
                questionItem.innerHTML+=`<h4 class="questionTitle">Q${num+1} <span data-canModify=true data-type="questionTitle">${question.title}</span></h4>`

                let ul= document.createElement('ul')
                ul.setAttribute('class','selectList');
                let selectType;
                let str='';
                if(question.type==1)selectType='radio';
                else if(question.type==2)selectType='checkBox';

                question.option.forEach((select, i)=> {
                    let selectMoveUp, selectMoveDown;
                    if (i == 0) selectMoveUp = 'disabled="disabled"';
                    if (i == question.option.length - 1) selectMoveDown = 'disabled="disabled"';
                    //$$选项
                    str += `<li>
                            <input type=${selectType} name="item${num+1}" />
                            <span data-canModify=true data-type="select">${select}</span>
                            <span class="selectOperation" data-select=${i}>
                                <button class="btn btn-default btn-xs" ${selectMoveUp} data-btnType="selectUp">上移</button>
                                <button class="btn btn-default btn-xs" ${selectMoveDown} data-btnType="selectDown">下移</button>
                                <button class="btn btn-default btn-xs" data-btnType="selectDel">删除</button>
                            </span>`
                })
                str += `<li>
                            <span class="queOperation">
                                <button class="btn btn-default btn-xs" data-btnType="addSelect">添加选项</button>
                                <button class="btn btn-default btn-xs" ${moveUp} data-btnType="questionUp">上移</button>
                                <button class="btn btn-default btn-xs" ${moveDown} data-btnType="questionDown">下移</button>
                                <button class="btn btn-default btn-xs" data-btnType="copy">复用</button>
                                <button class="btn btn-default btn-xs" data-btnType="questionDel">删除</button>
                            </span>
                        </li>`
                ul.innerHTML = str;
                questionItem.appendChild(ul);
            }else if(question.type==3){
                let checked;
                if(question.option)checked = 'checked'

                questionItem.innerHTML+=`<h4 class="questionTitle">Q${num+1} <span data-canModify=true data-type="questionTitle">${question.title}</span> <span style="float:right;font-size: 14px"><input type="checkbox" name="required${num+1}" ${checked} data-checkType="require" /><lable for="required${num+1}">是否必填</lable></span></h4>`
                let area = document.createElement('textarea');
                area.setAttribute('cols','50');
                area.setAttribute('rows','8');
                if(question.option)area.setAttribute('required','');
                area.style.resize = 'none';
                questionItem.appendChild(area);
                questionItem.innerHTML += `<div class="textSelectBox" data-num=${num}><span class="textSelect">
                                <button class="btn btn-default btn-xs" ${moveUp} data-btnType="questionUp">上移</button>
                                <button class="btn btn-default btn-xs" ${moveDown} data-btnType="questionDown">下移</button>
                                <button class="btn btn-default btn-xs" data-btnType="copy">复用</button>
                                <button class="btn btn-default btn-xs" data-btnType="questionDel">删除</button>
                            </span></div>`
            }

            questionList.appendChild(questionItem)
        })
    }
})(window);