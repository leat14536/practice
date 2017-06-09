/**
 * Created by Administrator on 2017/4/15 0015.
 */
/*
*   排序表格
*
*   使用方法
*   new sortForm(head,obi,dom)
*   head(Array[obi,obi....]) 表头信息 包括{lable: 表头名,name:分类,sortable:true(表示可排序),method:排序接口(可选)}
*   formList(Array[obi,obi....]) 表格信息 与表头信息对应, {分类:值,name:所属分类,与head中的name 对应
*   dom是table节点
*
* */

(function(window){
  'use strict'
  function sortForm(head,formList,dom) {
    this.thead = null;
    this.formNodeList = [];
    this.par = dom;
    renderHead(head,this);
    renderForm(this,formList);
  }

  let current = null;
  const sortStyle = '√'
  function renderHead(head,sortForm){
    let tr = document.createElement('tr');
    head.forEach(function(obj){
      let th = document.createElement('th');
      th.innerHTML = obj.lable;
      th.setAttribute('data',obj.name);
      tr.appendChild(th);
      if(obj.sortable) {
        addEv(th, sortForm,obj.method);
        let sortSpan = document.createElement('span');
        sortSpan.innerHTML = sortStyle;
        th.appendChild(sortSpan);
      }
    })
    sortForm.par.appendChild(tr);
    sortForm.theadList = tr.childNodes;

    function addEv(dom,sortForm,fnSort){
      document.addEventListener('click',(e)=>{
        let target = e.target||e.srcElement;
        if(target==dom){
          sort(target,sortForm,fnSort);
        }
      });
    }
    function sort(target,sortForm,fnSort){
      if(current!=target.getAttribute('data')){
        current = target.getAttribute('data');
        //排序渲染
        let num = 0;
        for( let i=0; i<sortForm.formNodeList[0].childNodes.length; i++ ){
          if(sortForm.formNodeList[0].childNodes[i].getAttribute('data')==current){
            num = i;
            break;
          }
        }
        sortForm.formNodeList.sort(function(a,b){
          if(typeof fnSort==='function'){return fnSort(a.childNodes[num].innerHTML,b.childNodes[num].innerHTML)}
          else return Number(b.childNodes[num].innerHTML)-Number(a.childNodes[num].innerHTML);
        })
      }else{
        //反向渲染
        current = null;
        sortForm.formNodeList.reverse();
      }
      sortForm.formNodeList.forEach(function(obj){
        sortForm.par.appendChild(obj);
      })
    }
  }

  function renderForm(sortForm,formList){
    let valueList = [];
    for( let i=0; i<sortForm.theadList.length; i++ ){
      valueList.push(sortForm.theadList[i].getAttribute('data'));
    }
    for( let i=0; i<formList.length; i++){
      let tr = document.createElement('tr');
      valueList.forEach(function(str){
        let td = document.createElement('td');
        td.innerHTML = formList[i][str];
        td.setAttribute('data',str)
        tr.appendChild(td);
      })
      sortForm.par.appendChild(tr);
      sortForm.formNodeList.push(tr);
    }
  }





  window.sortForm = sortForm;
})(window)
