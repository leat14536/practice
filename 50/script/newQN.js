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

    let QnData = {};                             //单个问卷对象
    let radioTitle = '这是一道单选题';
    let multiselectTitle = '这是一道复选题'
    let textTitle = '这是一道文本题'

    /*
    *   初始化新问卷对象
    * */
    function questionNaireInit(){
        QnData.state = 0;
        QnData.title = '这里是标题';
        QnData.setTime = new Date();
        QnData.endTime = null;
        QnData.question = [];
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
                ipt.setAttribute('value',value);
                target.innerHTML = '';
                target.appendChild(ipt);
                ipt.focus()
            }else if(target.getAttribute('data-question-type')){
                addQuestion(target.getAttribute('data-question-type'));
            }
        })
        ipt.onblur = (e)=>{
            let newValue = ipt.value;
            let parNode = ipt.parentNode;
            newValue = newValue.trim();
            if(newValue.length){
                parNode.innerHTML=newValue;
            }else{
                parNode.innerHTML=value;
            }
        }
    }

    /*
    *   添加问题
    * */
    function addQuestion(questionType){
        if(questionArr.length<10) {
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
                num : questionArr.length+1,
                title : radioTitle,
                type : 1,
                option : ['选项1','选项2','选项3','选项4'],
            }
            QnData.question.push(question);
        }

        function addMultiselectQue(){
            let question = {
                num : questionArr.length+1,
                title : multiselectTitle,
                type : 2,
                option : ['选项1','选项2','选项3','选项4'],
            }
            QnData.question.push(question);
        }

        function addTextQue(){
            let question = {
                num : questionArr.length+1,
                title : textTitle,
                type : 3,
            }
            QnData.question.push(question);
        }
    }

    /*
    *   渲染问题界面
    * */
    function render(){

    }
})(window);