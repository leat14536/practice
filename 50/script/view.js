/**
 * Created by Administrator on 2017/4/23 0023.
 */
(function(window){
    let naire = {}
    window.onload = ()=>{
        init();
    }

    function init(){
        surface = new surfaced(document.getElementsByClassName('surfaced')[0]);

        let urlId = location.search.replace('?','');
        if(urlId.length&&typeof (urlId-0)==='number'){
            //编辑
            console.log(urlId);
            getNaireData(urlId);
           /* for( let date in question ){
                console.log(date+'.'+question[date])
            }*/
            if( naire.state == 1 ){
                if( naire.endTime&&naire.endTime.getTime()<(new Date()).getTime()){
                    console.log('已结束')
                }else{
                    //console.log('看问卷')
                    renderNaire();
                }
            }
        }else{
            alert('数据出错,请返回');
        }
    }

    /*
    *   获取NaireData
    * */
    function getNaireData(urlId) {
        let questionnaireData = JSON.parse(sessionStorage.questionnaireData);
        for( i=0; i<questionnaireData.length; i++　){
            if(questionnaireData[i].id==urlId){
                naire = questionnaireData[i];
                if(naire.setTime){
                    naire.setTime = new Date(naire.setTime)
                }
                if(naire.endTime){
                    naire.endTime = new Date(naire.endTime)
                }
                return true;
            }
        }
        return false;
    }

    /*
    *   渲染问卷
    * */
    function renderNaire(){
        let questionList = document.getElementsByClassName('questionList')[0];
        questionList.innerHTML = '';
        console.log(naire.question)
        if( typeof naire.question=='object' ){
            naire.question.forEach((question,num)=>{
                let questionItem = document.createElement('div');
                questionItem.setAttribute('class','questionItem');
                questionItem.setAttribute('data-num',num);
                questionItem.innerHTML = ` <h4 class="questionTitle">Q${num+1} <span data-type="questionTitle">${question.title}</span></h4>`
                if(question.type==1||question.type==2){
                    let ul = document.createElement('ul');
                    ul.setAttribute('class','selectList');
                    let type = (question.type==1)?('radio'):('checkbox')
                    question.option.forEach((select,n)=>{
                        ul.innerHTML +=
                        `<li>
                            <input type=${type} name="item${num}" />
                            <span data-canmodify="true" data-type="select">${select}</span>
                            <span></span>
                        </li>`
                    })
                    questionItem.appendChild(ul);
                }else if( question.type==3 ){
                    let require = question.option?('required="required"'):('');
                    questionItem.innerHTML += `<textarea cols="50" rows="8" ${require} style="resize: none;"></textarea>`
                }
                questionList.appendChild(questionItem)
            })
        }
    }
})(window)