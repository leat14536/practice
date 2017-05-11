
<template>
  <div id="calendar">
    <div class="ui-dataPanel-wrap">
      <div class="ui-dataPanel-switchPanel">
        <a href="javascript:;" class="ui-dataPanel-yearSub ui-dataPanel-switchLink" @click="setYear(-1)" >&lt&lt</a>
        <a href="javascript:;" class="ui-dataPanel-monthSub ui-dataPanel-switchLink" @click="setMonth(-1)">&lt</a>
        <span class="ui-dataPanel-date">{{year}}-{{month+1}}</span>
        <a href="javascript:;" class="ui-dataPanel-yearAdd ui-dataPanel-switchLink" @click="setYear(1)">&gt&gt</a>
        <a href="javascript:;" class="ui-dataPanel-monthAdd ui-dataPanel-switchLink" @click="setMonth(1)">&gt</a>
      </div>
      <table class="ui-dataPanel-subject">
        <thead class="ui-dataPanel-head">
          <tr>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
          </tr>
        </thead>
        <tbody class="ui-dataPanel-body">
          <tr v-for="i in 6">
            <td v-for="j in 7">
              <span v-if="isThisMonth(i,j)" class="ui-dataPanel-thisMonth" @click="sendDate(year,month,setThisDate(i,j))">{{setThisDate(i,j)}}</span>
              <span v-else class="ui-dataPanel-notThisMonth">{{setThisDate(i,j)}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calendar',
    data () {
      return {
        firstDate: null,              //面板第一天日期
        thisMonthFirstDay: null,      //本月第一天是周几 {0-6}
        thisMonthDays: null,          //本月有几天
        year: null,                   //年份
        month: null,                  //月份
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.getData();
      })
    },
    filters:{
    },
    methods:{
      setThisDate(i,j){
        let num = (i-1)*7+j-1,date;
        if( num<this.thisMonthFirstDay ){
          date = this.firstDate+num;
        }else if( num<this.thisMonthFirstDay+this.thisMonthDays ){
          date = num-this.thisMonthFirstDay+1;
        }else{
          date = num-this.thisMonthFirstDay-this.thisMonthDays+1;
        }
        return date;
      },
      isThisMonth(i,j){
        let num = (i-1)*7+j-1;
        if( num<this.thisMonthFirstDay ){
          return false;
        }else if( num<this.thisMonthFirstDay+this.thisMonthDays ){
          return true;
        }else {
          return false;
        }
      },
      getData(){
        let date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();           //month {0-11}
      },
      setYear(num){
        this.year += num;
      },
      setMonth(num){
        let month = this.month+num;
        if(month<0){
          month = 11;
          this.year--;
        }
        if(month>11){
          month = 0;
          this.year++;
        }
        this.month = month;
      },
      sendDate(year,month,day){
        this.$emit('sendTime',...arguments)
      }
    },
    watch: {
      year:function(val){
        let date = new Date( val, this.month, 1 )
        this.thisMonthFirstDay = date.getDay();
        date.setDate(0);
        this.firstDate = date.getDate()-this.thisMonthFirstDay+1;
        date = new Date( val, this.month+1, 0);
        this.thisMonthDays =  date.getDate();
      },
      month: function(val){
        let date = new Date( this.year, val, 1 )
        this.thisMonthFirstDay = date.getDay();
        date.setDate(0);
        this.firstDate = date.getDate()-this.thisMonthFirstDay+1;
        date = new Date( this.year, val+1, 0);
        this.thisMonthDays =  date.getDate();
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #calendar{
    position: relative;
  }

  .ui-dataPanel-wrap{
    position: absolute;
    left:90px;
    top:15px;
  }

  .ui-dataPanel-subject{
    border-spacing: 0;
    width:240px;
    height:240px;
    text-align: center;
  }

  .ui-dataPanel-switchPanel{
    width:240px;
    height:40px;
    background-color: #e77408;
    color:#fff;
    border-bottom: none;
    box-sizing: border-box;
  }

  .ui-dataPanel-monthAdd,.ui-dataPanel-yearAdd{
    float:right;
  }

  .ui-dataPanel-yearSub, .ui-dataPanel-monthSub, .ui-dataPanel-yearAdd, .ui-dataPanel-monthAdd{
    margin:5px;
  }

  .ui-dataPanel-switchLink{
    text-decoration: none;
    display:inline-block;
    width:25px;
    height:25px;
    color:#fff;
    font-size:12px;
    line-height:25px;
    text-align: center;
    border-radius: 10px;
  }

  .ui-dataPanel-date{
    margin-left:18px;
  }

  .ui-dataPanel-head{
    background-color:#fff;
    font-weight: bold;
    line-height:50px;
    cursor: default;
  }

  .ui-dataPanel-select{
    background-color:#28a4c9;
    border-radius: 5px;
    color:#fff;
  }

  .ui-dataPanel-body{
    background-color:#fff;
    color:#ccc;
    cursor: default;
  }

  .ui-dataPanel-thisMonth,  .ui-dataPanel-notThisMonth{
    display: inline-block;
    width:100%;
    height:31px;
    line-height: 31px;
  }

  .ui-dataPanel-thisMonth{
    cursor: pointer;
    color:#000;
  }



  .ui-dataPanel-thisMonth:hover{
    background-color:#fcf0e5;
  }
</style>
