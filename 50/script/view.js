/**
 * Created by Administrator on 2017/4/23 0023.
 */
(function(window){
    let naire = {}
    let panelList = [];

    function init(){

        let urlId = location.search.replace('?','');
        if(urlId.length&&typeof (urlId-0)=='number'){
            //编辑
            //console.log(urlId);
            getNaireData(urlId);
           /* for( let date in question ){
                console.log(date+'.'+question[date])
            }*/
            if( naire.state == 1 ){
                if( naire.endTime&&naire.endTime.getTime()<(new Date()).getTime()){
                    //console.log('已结束')
                    renderNaireData();

                    renderPanel();
                }else{
                    //console.log('看问卷')
                    renderNaire();
                }
            }else{                          // naire.state == 0
                renderNaire();
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
        for( let i=0; i<questionnaireData.length; i++　){
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
        //console.log(naire.question)
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

    /*
    *   渲染数据页面
    * */
    function renderNaireData(){
        let questionList = document.getElementsByClassName('questionList')[0];
        questionList.innerHTML = '';
        if( typeof naire.question=='object' ) {
            naire.question.forEach((question, num)=> {
                let questionItem = document.createElement('div');
                questionItem.setAttribute('class', 'questionItem');
                questionItem.setAttribute('data-num', num);
                if (question.type == 1) {
                    questionItem.innerHTML = `<div class="optionDataPanel"></div><h4 class="questionTitle">Q${num+1} <span data-canmodify="true" data-type="questionTitle">${question.title}</span></h4>`
                    let ul = document.createElement('ul');
                    ul.setAttribute('class', 'selectList');
                    question.option.forEach((select, n)=> {
                        ul.innerHTML +=`<li>
                            <span>${n+1}. ${select}</span>
                        </li>`
                    })
                    questionItem.appendChild(ul);
                    questionList.appendChild(questionItem)
                }else if(question.type == 2){
                    questionItem.innerHTML = `<div class="optionDataPanel"></div><h4 class="questionTitle">Q${num+1} <span data-canmodify="true" data-type="questionTitle">${question.title}</span></h4>`
                    let ul = document.createElement('ul');
                    ul.setAttribute('class', 'selectList');
                    question.option.forEach((select, n)=> {
                        ul.innerHTML +=`<li>
                            <span>${n+1}. ${select}</span>
                        </li>`
                    })
                    questionItem.appendChild(ul);
                    questionList.appendChild(questionItem)
                }else if(question.type == 3){
                    questionItem.innerHTML = `<div class="optionDataPanel textPanel"></div><h4 class="questionTitle">Q${num+1} <span data-canmodify="true" data-type="questionTitle">${question.title}</span></h4>`
                    questionList.appendChild(questionItem)
                }
                //questionList.appendChild(questionItem)
            })


        }

    }

    /*
    *   图表渲染
    * */
    function  renderPanel(){
        let panelList = document.getElementsByClassName('optionDataPanel');
        let myCharts = [];
        Array.prototype.forEach.call(panelList,(panel,num)=>{
            //console.log()
            if(naire.question[num].type==2){
                panel.style.height = parseInt(panel.parentNode.offsetHeight)-30+'px';
            }
            //console.log(panel.parentNode.offsetHeight)
            let myChart = echarts.init(panel);
            myChart.showLoading();
            myCharts.push(myChart);
        })


        //获取数据,有后台时为异步加载
        let promise = new Promise(function(resolve, reject) {
            let optionData = getOptionData();
            if(optionData.length) {
                resolve(optionData);
            }
        });

        promise.then((optionData)=>{
            optionData.forEach((data,num)=>{
                myCharts[num].hideLoading();
                myCharts[num].setOption(data)
            })
            /*myChart.hideLoading();
            myChart.setOption(optionData[0])
            myChart1.hideLoading();
            myChart1.setOption(optionData[1])
            myChart2.hideLoading();
            myChart2.setOption(optionData[2])*/

        })

    }

    /*
    *   随机数据
    * */
    function getOptionData(){

        let optionData = [];
        naire.question.forEach((question)=>{

            function randomData(num){
                let arr = [];
                for( let i=0; i<num; i++ ){
                    arr.push({value:parseInt(Math.random()*100),name:'选项'+(i+1)});
                }
                return arr;
            }

            if(question.type==1){
                let data = randomData(question.option.length);
                let option = {
                    series:[
                        {
                            name: '数据占比',
                            type: 'pie',
                            radius: '80%',
                            data: data,
                        }
                    ]
                    }
                optionData.push(option);
            }else if(question.type==2){
                let select = [],value=[];
                for( let i=0; i<question.option.length; i++ ){
                    select.push(('选项'+(i+1)))
                    value.push(parseInt(Math.random()*100));
                }
                let option = {
                    grid: {
                        left: '50px',
                        right: '4%',
                        top: '5px',
                        bottom: '20px',
                        ontainLabel: true
                    },
                    xAxis: {
                    },
                    yAxis: {
                        data:select.reverse()
                    },
                    series: [{
                        type: 'bar',
                        data: value.reverse()
                    }]
                };
                optionData.push(option);
            }else if(question.type == 3){
                let value;
                if(question.option) value=100;
                else value = parseInt(Math.random()*100);
                let option = {
                    grid: {
                        left: '80px',
                        right: '4%',
                        top:'10px',
                        ontainLabel: false
                    },
                    xAxis: {
                    },
                    yAxis:{
                        data:['有效回答占比',''],
                    },
                    series: [{
                        type: 'bar',
                        data: [value,100]
                    }]
                };
                optionData.push(option);
            }
        })
        return optionData;
    }

    window.onload = ()=>{
        init();
    }
})(window)