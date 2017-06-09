/**
 * Created by Administrator on 2017/3/30 0030.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value;
    var value = document.getElementById('aqi-value-input').value;
    //console.log(`${city},${value}`);
    var cityReg = /(^[\u4e00-\u9fa5]+$)|(^[a-zA-Z]+$)/;
    var valueReg = /^([1-9]?\d*)$/;
    if(cityReg.test(city)&&valueReg.test(value)){
        aqiData[city] = value;
    }else{
        alert('输入格式错误')
    }
    renderAqiList();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tb = document.getElementById('aqi-table');
    tb.innerHTML = '';
    var flag;
    for( var aqi in aqiData ){
        if(aqi&&!flag) {
            flag = 1;
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>';
            tb.appendChild(tr);
        }
        tr = document.createElement('tr');
        tr.innerHTML = '<td>' + aqi + '</td><td>' + aqiData[aqi] + '</td><button>删除</button>';
        tb.appendChild(tr);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(nodeStr) {
    console.log(nodeStr);
   delete aqiData[nodeStr];
    renderAqiList();
}

function init() {
    window.onload = function(){
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        document.getElementById('add-btn').onclick = function(){
            addBtnHandle();
        }
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        document.getElementById('aqi-table').addEventListener('click',function(ev){
            ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == "button"){
                delBtnHandle.call(null,target.parentNode.firstChild.firstChild.nodeValue);
            }
        })
    }

}

init();