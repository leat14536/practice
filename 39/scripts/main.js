window.onload = ()=>{
  addTab();
  new freezeForm(document.getElementsByClassName('tab')[0]);
}

const quantity = 10;
const names = ['A','B','C','D','E','F','G','H','I','J','K'];
function addTab(){
  let head = [{
    lable:'姓名',
    name: 'name',
    sortable: false,
    method: null,
  },{
    lable:'语文',
    name:'chinese',
    sortable:true,
    method: sortFrom,
  },{
    lable:'数学',
    name:'math',
    sortable:true,
    method: null,
  },{
    lable:'英语',
    name:'english',
    sortable:true,
    method: null,
  },{
    lable:'总分',
    name:'score',
    sortable:true,
    method: null,
  }];

  let form = [];
  let str = '小';
  for( let i=0; i<quantity; i++ ){
    let obj = {
      name: str+names[i],
      chinese:parseInt(Math.random()*50+50),
      math: parseInt(Math.random()*50+50),
      english: parseInt(Math.random()*50+50),
    }
    obj.score = obj.chinese + obj.math + obj.english;
    form.push(obj);
    obj = {};
  }
  form.push(...form);
  form.push(...form);
  return new sortForm( head, form, document.getElementsByClassName('tab')[0] );
}

//排序函数
function sortFrom(a,b){
  return a-b;
}
