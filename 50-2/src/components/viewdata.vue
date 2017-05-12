<!--state为1或0时显示问卷样例-->
<!--state为2时显示回答数据(前端随机模拟)-->
<template>
  <div class="viewdata">
    <h4 class="titBox">
      <span class="center">
        <span>{{naire.title}}</span>
      </span>
    </h4>
    <div class="questionBox">
      <div class="questionList">
        <div class="questionList">
          <div v-for="(item,index) in naire.question" class="questionItem">
            <naire-chart v-if="naire.state==2" :type="item.type" :option="item.option"></naire-chart>
            <div v-if="item.type==1||item.type==2">
              <h4>Q{{index+1}}
                <span>{{item.title}}</span>
              </h4>
              <ul class="selectList">
                <li  v-for="(option,optIndex) in item.option">
                  <input v-if="item.type==1" type="radio" :name="'option'+index" class="checkOpt">
                  <input v-else-if="item.type==2" type="checkbox" :name="'option'+index" class="checkOpt">
                  <span>{{option}}</span>
                </li>
              </ul>
            </div>
            <div v-else-if="item.type==3">
              <h4>Q{{index+1}}
                <span>{{item.title}}</span>
              </h4>
              <textarea cols="40" rows="8" style="resize:none" :required="item.option" class="textBox"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formBox">
      <router-link to="/">
        <input class="btn" type="button" value="返回" />
      </router-link>
    </div>
  </div>
</template>

<script>
  import naireChart from './naireChart'

  const sessionPath = 'questionnaireData';
  export default {
    name: 'viewdata',
    data () {
      return {
        naire: {
          id: null,
          state: null,
          title: null,
          setTime:  null,
          endTime:  null,
          question: []
        }
      }
    },
    components: {
      naireChart
    },
    created(){
      this.$nextTick(()=>{
        this.getData(this.$route.params.id);
      })
    },
    methods:{
      getData(id){
        let sessData,flag=true;
        if( sessionStorage[sessionPath] ){
          sessData = JSON.parse(sessionStorage.questionnaireData);
          for( let i=0; i<sessData.length; i++ ){
            if(sessData[i].id==id){
              this.naire = sessData[i];
              flag = !flag;
              break;
            }
          }
        }
        if(flag) {
          alert('问卷数据出错,点击返回');
          window.location.href = ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and ( min-width:992px ){
    .viewdata{ width:900px }
  }

  @media screen and (min-width:768px ){
    .viewdata{ width:80% }
  }

  @media screen and ( max-width:768px ){
    .viewdata{ width:100% }
  }

  .viewdata{
    background-color: #fff;
    margin:0 auto;
    box-shadow: 2px 2px 5px #888888;
    padding:30px 0;
  }

  .titBox{
    margin:15px;
    font-size:18px;
    text-align: center;
  }

  .center{
    display: inline-block;
    padding: 2px;
    margin:0 auto;
  }

  .questionBox{
    width:90%;
    border-top:2px solid #efefef;
    border-bottom:2px solid #efefef;
    margin:0 auto;
  }

  .questionItem{
    min-height:200px;
    width:90%;
    padding:15px;
    margin:15px auto;
  }

  .questionItem:hover{
    background-color:#fcf0e5;
  }

  .selectList{
    list-style-type: none;
    padding:12px 16px;
    font-size:14px;
    line-height:25px;
    margin:0;
  }

  .textBox{
    margin-top:15px;
  }

  .formBox{
    margin-top:15px;
    text-align: center;
    outline: none;
    border:
  }

  .btn{
    border:1px solid #a1a1a1;
    background-color:#fff;
    padding:3px 6px;
    margin-right:8px;
    border-radius: 3px;
  }

  .btn:hover{
    background-color:#f07600;
    border-color:#c26206;
    color:#fff;
  }
</style>
