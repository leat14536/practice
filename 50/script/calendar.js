/**
 * Created by Administrator on 2017/4/15 0015.
 */
/*
*    var xxx = new calendar();
*    xxx.toggle() 显示/隐藏
*    xxx.setChangeCallBack(callback) 传入一个回调函数,每次选中时调用,callback传入值为当前选中的 year,month,day
*
*    init() 添加切换事件 日期选中事件
*    render() 渲染日期面板 接收2个参数(可选),年份和日期,渲染当前月份的日期
* */

(function(window){
  let datePanelDom,yearSub,yearAdd,monthSub,monthAdd,dateBody,selectClass;
  let nowDate = new Date();
  let nowYear = nowDate.getFullYear();
  let nowMonth = nowDate.getMonth();
  let nowDay = nowDate.getDate();
  let changeCallBack = null;

  function calendar(dom){
    datePanelDom = dom;
    init();
  }

  calendar.prototype = {
    toggle(){
      if(datePanelDom.style.display == 'block'){
        datePanelDom.style.display = 'none';
      }else{
        datePanelDom.style.display = 'block';
      }
    },
    setChangeCallBack(callback){
      changeCallBack = callback;
    }
  }

  function init(){
    //render(2016,5);
    yearSub = datePanelDom.getElementsByClassName('ui-dataPanel-yearSub')[0];
    yearAdd = datePanelDom.getElementsByClassName('ui-dataPanel-yearAdd')[0];
    monthSub = datePanelDom.getElementsByClassName('ui-dataPanel-monthSub')[0];
    monthAdd = datePanelDom.getElementsByClassName('ui-dataPanel-monthAdd')[0];
    dateBody = datePanelDom.getElementsByClassName('ui-dataPanel-body')[0];
    nowDatePanle = datePanelDom.getElementsByClassName('ui-dataPanel-date')[0];
    selectClass = 'ui-dataPanel-select'
    datePanelDom.addEventListener('click',(e)=>{
      let target = e.target||e.srcElement;
      e.preventDefault();
      if(target.tagName=='A') {
        switch (target) {
          case(yearSub):nowYear--;
            break;
          case(yearAdd):nowYear++;
            break;
          case(monthSub):nowMonth--;
            break;
          case(monthAdd):nowMonth++;
            break;
        }
        render();
      }else if(target.tagName=='TD') {
        if (target.innerHTML) {
          [].forEach.call(dateBody.childNodes, function (tr) {
            [].forEach.call(tr.childNodes, function (td) {
              if (typeof td.getAttribute('class') === 'string') {
                let tdClass = td.getAttribute('class');
                let idx = tdClass.indexOf(selectClass);
                if (idx != -1) {
                  let arr = tdClass.split('');
                  arr.splice(idx, selectClass.length);
                  td.setAttribute('class', arr.join('').trim());
                }
              }
            })
          });
          if (target.getAttribute('class'))
            target.setAttribute('class', target.getAttribute('class') + ' ' + selectClass);
          else
            target.setAttribute('class', selectClass);
          nowDay = target.innerHTML - 0;
          if (changeCallBack) changeCallBack(nowYear, nowMonth + 1, nowDay);
        }
      }
    })

    render();
    function render(year,month){
      let cnt = 0;
      year = year||nowYear;
      month = month||nowMonth;

      if(typeof year==='number'&&typeof month==='number'){
        let d = new Date(year,month+1,0);
        let dayNum = d.getDate();
        d.setDate(1);
        let firstDay = d.getDay();
        let cnt = -firstDay;
        dateBody.innerHTML = '';
        for( let i=0; i<6; i++ ){
          let tr = document.createElement('tr');
          for( let j=0; j<7; j++ ){
            cnt++;
            let td = document.createElement('td');
            if(cnt>0&&cnt<=dayNum) td.innerHTML = cnt;
            else if(cnt>dayNum)break;
            tr.appendChild(td);
          }
          dateBody.appendChild(tr);
          if(cnt>dayNum)break;
        }

        nowDatePanle.innerHTML = d.getFullYear()+'-'+(d.getMonth()+1);
        nowYear = d.getFullYear();
        nowMonth = d.getMonth();
      }
    }



  }
  window.calendar = calendar;
})(window)
