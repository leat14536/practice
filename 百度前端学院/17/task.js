/**
 * Created by Administrator on 2017/3/30 0030.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var aqi = document.getElementsByClassName('aqi-chart-wrap')[0];
    //console.log(aqi)
    aqi.innerHTML = '';
    if(pageState.nowSelectCity<0){
        return;
    }
    initAqiChartData();
    if(pageState.nowGraTime=='day'){
        rend(12,10,13);
    }else if(pageState.nowGraTime=='week'){
        rend(30,300,45);
    }else{
        rend(50,500,60);
    }
    function rend(wid,star,leg) {
        var cnt = 0;
        for( var i in chartData ){
            var div = document.createElement('div');
            div.setAttribute('title','日期:'+i+'\n颗粒度:'+chartData[i]);
            div.setAttribute('style','width:'+wid+'px;height:'+chartData[i]+'px;background-color:rgb('+parseInt(Math.random()*1000%225)+','+parseInt(Math.random()*1000%225)+','+parseInt(Math.random()*1000%225)+');left:'+(star+leg*cnt)+'px;')
            div.setAttribute('class','aqi');
            aqi.appendChild(div);
            cnt++;
        }
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
    // 确定是否选项发生了变化
    if(target.value==pageState.nowGraTime){
        return;
    }
    // 设置对应数据
    pageState.nowGraTime = target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(select) {
    // 确定是否选项发生了变化
    if(select.selectedIndex==0){
        return;
    }
    // 设置对应数据
    pageState.nowSelectCity = select.options[select.selectedIndex].value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var form = document.getElementById('form-gra-time');
    form.addEventListener('click',function(ev){
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if( target.name=='gra-time'){
            //alert('radio'+target.value);
            graTimeChange(target);
        }
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityList = document.getElementById('city-select');
    cityList.innerHTML += '<option selected="selected">请选择</option>';
    for (var i in aqiSourceData) {
        var city = document.createElement('option');
        city.innerHTML = i;
        cityList.appendChild(city);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var select = document.getElementById('city-select');
    select.onchange = function(){
        citySelectChange(select);
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};
    var cityData = aqiSourceData[pageState.nowSelectCity];
    switch(pageState.nowGraTime){
        case('day'):
            chartData = cityData;
            break;
        case('week'):
            setWee();
            break;
        case('month'):
            setMon();
            break;
    }
    function setWee(){
        var i = 0;
        var size = 0;
        var end;
        for( var atr in cityData ){
            if(i==0) {
                var str = atr;
            }
            size += cityData[atr];
            end = atr;
            i++;
            if(i==7){
                str += '--'+atr;
                chartData[str] = parseInt(size/7);
                size = 0;
                i = 0;
            }
        }
        if(i!=0){
            str += '--'+end;
            chartData[str] = parseInt(size/i);
        }
    }
    function setMon(){
        var size = 0;
        var end,mon='01',i=0,str,flag;
        var reg = /[-]([\d]+)[-]/;

        for( var atr in cityData ){
            if(!flag){
                flag = 1;
                mon = atr.match(reg)[1];
                str = atr;
            }
            if(mon!=atr.match(reg)[1]){
                str += '--' + end;
                chartData[str] = parseInt(size / i);
                mon = atr.match(reg)[1];
                size = 0;
                i = 0;
                str = atr;
            }
            i++;
            end = atr;
            size+=cityData[atr];
        }
        str += '--'+end;
        chartData[str] = parseInt(size/i);
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}
window.onload = function(){
    init();
   // console.log(aqiSourceData);
}
