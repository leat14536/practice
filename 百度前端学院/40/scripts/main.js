
window.onload = ()=>{
  let wrap = document.getElementsByClassName('ui-dataPanel-wrap')[0];
  let calendarWrap = new calendar(wrap);
  calendarWrap.setChangeCallBack(function(...date){
    document.getElementsByClassName('datePanel')[0].innerHTML = date.join('-') ;
    calendarWrap.toggle();
  })
  let dateBtn = document.getElementsByClassName('formBox')[0].onclick = ()=>{
    calendarWrap.toggle();
  }
}
