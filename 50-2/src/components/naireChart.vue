
<template>
  <div class="naireChart" @click="randomData">{{type}}<div>{{option}}</div></div>
</template>

<script>
  import ECharts from 'ECharts'

  export default {
    name: 'naireChart',
    data () {
      return {
        len: null,
        optionData:[],
        optionKey:[],
      }
    },
    props:['type','option'],
    created(){
      this.$nextTick(()=>{
        this.randomData();
        this.eChartRender();
      })
    },
    methods:{
      randomData(){
        if(this.type==1){
          this.option.forEach((option,index)=>{
            this.optionData[index] = {value:parseInt(Math.random()*100),name:'选项'+(index+1)};
          })
        }else if(this.type==2){
          this.$el.style.height = this.option.length*25+'px';
          this.option.forEach((option,index)=>{
            this.optionData[index] = {value:parseInt(Math.random()*100),name:'选项'+(index+1)};
            this.optionKey[index] = '选项'+(index+1)
          })
        }else if(this.type==3){
          if(this.option){
            this.optionData = [100];
          }else{
            this.optionData = [parseInt(Math.random()*100)];
          }
        }
      },
      eChartRender(){
        let myChart = ECharts.init(this.$el);
        let option
        if(this.type==1) {
           option = {
            title: {
              text: '单选题',
              textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
              },
              x: 'center'
            },
            tooltip: {
              show: 'true',
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [{
                name: '选项占比',
                type: 'pie',
                radius: '60%',
                data: this.optionData,
              }]
          };
        }else if(this.type==2){
          option = {
            title:{
              text:'复选题',
              textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
              },
              x: 'center'
            },
            tooltip:{},
            grid: {
              left: '50px',
              right: '4%',
              top: '20px',
              bottom: '20px',
              ontainLabel: true
            },
            xAxis: {
              min:0,
              max:100
            },
            yAxis: {
              data:this.optionKey.reverse(),
            },
            series: [{
              name: '人数',
              type: 'bar',
              bar:{
                barMaxWidth:2,
              },
              data: this.optionData.reverse(),
            }]
          }
        }else if(this.type==3) {
          option = {
            title:{
              text:'有效回答占比',
              textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
              },
              x: 'center'
            },
            tooltip:{},
            grid: {
              left: '50px',
              right: '4%',
              top: '50',
              bottom: '50px',
              ontainLabel: true
            },
            xAxis: {
              min:0,
              max:100
            },
            yAxis: {
              data:['文本题'],
            },
            series: [{
              name: '有效回答占比',
              type: 'bar',
              bar:{
                barMaxWidth:2,
              },
              data: this.optionData,
            }]
          }
        }
        myChart.setOption(option);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.naireChart{
  min-height:150px;
  width:230px;
  float:right;
  margin-top:20px;
}
</style>
