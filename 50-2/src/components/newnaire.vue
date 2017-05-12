<!--新建问卷和修改问卷-->

<template>
  <div id="newnaire">
    <h4 class="titBox">
      <span class="center">
        <span @click="modify(naire,'title',$event)">{{naire.title}}</span>
      </span>
    </h4>
    <div class="questionBox">
      <div class="questionList">
        <div v-for="(item,index) in naire.question" class="questionItem">
          <div v-if="item.type==1||item.type==2">
            <h4>Q{{index+1}}
              <span @click="modify(item,'title',$event)">{{item.title}}</span>
            </h4>
            <ul class="selectList">
              <li  v-for="(option,optIndex) in item.option">
                <input v-if="item.type==1" type="radio" :name="'option'+index" class="checkOpt">
                <input v-else-if="item.type==2" type="checkbox" :name="'option'+index" class="checkOpt">
                <span @click="modify( item.option, optIndex, $event )">{{option}}</span>
                <span class="selectOperate">
                  <a v-if="optIndex" class="operate" @click="optionMoveUp(item.option,optIndex)">上移</a>
                  <a v-if="optIndex!=item.option.length-1" @click="optionMoveUp(item.option,optIndex+1)" class="operate">下移</a>
                  <a class="operate" @click="delOperate( item.option, index )">删除</a>
                </span>
              </li>
              <li>
                <span class="queOperate">
                  <a class="operate" @click="addOption(item)">添加选项</a>
                  <a class="operate" v-if="index" @click="questionMoveUp( naire.question, index )">上移</a>
                  <a class="operate" v-if="index!=naire.question.length-1"  @click="questionMoveUp( naire.question, index+1 )">下移</a>
                  <a class="operate" @click="copyQuestion(naire.question, index)">复用</a>
                  <a class="operate" @click="delQuestion(naire.question, index)">删除</a>
                </span>
              </li>
            </ul>
          </div>
          <div v-else-if="item.type==3">
            <h4>Q{{index+1}}
              <span @click="modify(item,'title',$event)">{{item.title}}</span>
              <span style="float:right;font-size:14px;font-weight: normal">
                <input type="checkbox" name="'option'+index" v-model="item.option" />
                是否必填
              </span>
            </h4>
            <textarea cols="50" rows="8" style="resize:none" :required="item.option" class="textBox"></textarea>
            <div class="textSelectBox">
              <span class="textSelect">
                  <a class="operate" v-if="index" @click="questionMoveUp( naire.question, index )">上移</a>
                  <a class="operate" v-if="index!=naire.question.length-1"  @click="questionMoveUp( naire.question, index+1 )">下移</a>
                  <a class="operate" @click="copyQuestion(naire.question, index)">复用</a>
                  <a class="operate" @click="delQuestion(naire.question, index)">删除</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="addBox">
        <div class="addBtnBox"  :class="[{'addBtnBoxShow':addQuestionState}]">
          <button class="btn" @click="addRadio">单选</button>
          <button class="btn" @click="addCheckbox">多选</button>
          <button class="btn" @click="addText">文本题</button>
        </div>
        <div class="addQuestion" @click="addQuestionState=!addQuestionState">添加问题</div>
      </div>
    </div>
    <div class="formBox">
      问卷截止日期: <span class="endTime" @click="showCalendar = !showCalendar">{{naire.endTime | endTimeFilte}}</span>
      <button class="save" @click="saveNaire">保存问卷</button>
      <button class="issue" @click="issusNaire">发布问卷</button>
    </div>
    <calendar @sendTime="setEndTime" v-if="showCalendar"></calendar>
    <input id="modify" type="text" v-model="valueStorage" :style="iptNodeStyle" @blur="select" />
  </div>
</template>

<script>
  import calendar from './calendar';
  const sessionPath = 'questionnaireData';
  export default {
    name: 'newnaire',
    data () {
      return {
        naire: {
          id: new Date().getTime(),
          state: 0,
          title: '这是我的第一份问卷',
          setTime: new Date(),
          endTime: null,
          question: [],
        },
        addQuestionState: false,                //控制 添加问题下滑的class
        valueStorage: '',                       //存储需要改变的值
        iptNodeStorage:null,                    //存储input节点
        iptNodeStyle: { display:'none' },       //input的style
        modifyNodeStorge:null,                  //存储修改之前的节点
        modifyAddress: {                        //修改之前的obj和key
          obj: null,
          key: null,
        },
        showCalendar: false,                    //日历面板是否显示
      }
    },
    filters:{
      endTimeFilte(date){
        if(date){
          let str = date.getFullYear()+'-'+(1+date.getMonth())+'-'+date.getDate();
          return str;
        }
        return '';
      }
    },
    created(){
      this.$nextTick(()=>{
        if( typeof this.$route.params.id!='undefined' ){
          this.setData(this.$route.params.id);
        }
      })
    },
    mounted(){
      this.$nextTick(()=>{
        this.getIptNode();
      })
    },
    methods: {
      setData(id){
        let sessData,flag=true;
        if( sessionStorage[sessionPath] ){
          sessData = JSON.parse(sessionStorage.questionnaireData);
          for( let i=0; i<sessData.length; i++ ){
            if(sessData[i].id==id){
              this.naire = sessData[i];
              this.naire.setTime = new Date(this.naire.setTime);
              if(this.naire.endTime){
                this.naire.endTime = new Date(this.naire.endTime);
              }
              flag = !flag
              break;
            }
          }
        }
        if(flag) {
          alert('问卷数据出错');
          window.location.href = ''
        }
      },
      getIptNode(){
        this.iptNodeStorage = this.$el.lastChild;
      },
      modify( obj, key, e ){
        this.modifyNodeStorge = e.target;
        this.valueStorage = obj[key];
        this.iptNodeStyle.display = 'inline-block';
        e.target.parentNode.replaceChild( this.iptNodeStorage, e.target );
        this.modifyAddress.obj = obj;
        this.modifyAddress.key = key;
        this.$nextTick(()=>{
          this.iptNodeStorage.focus();
        })
      },
      select(e){
        if(this.valueStorage.trim().length){
          this.modifyAddress.obj[this.modifyAddress.key] = this.valueStorage;
        }
        e.target.parentNode.replaceChild( this.modifyNodeStorge, e.target );
        this.valueStorage = '';
        this.iptNodeStyle.display = 'none';
      },
      addRadio(){
        if(this.naire.question.length<10) {
          this.naire.question.push({
            title: '单选题',
            type: 1,
            option: ['选项1', '选项2', '选项3', '选项4']
          });
        }else{
          alert('题目数量不能大于10')
        }
      },
      addCheckbox(){
        if(this.naire.question.length<10) {
          this.naire.question.push({
            title: '多选题',
            type: 2,
            option: ['选项1', '选项2', '选项3', '选项4']
          });
        }else{
          alert('题目数量不能大于10')
        }
      },
      addText(){
        if(this.naire.question.length<10) {
          this.naire.question.push({
            title: '文本题',
            type: 3,
            option: true,
          });
        }else{
          alert('题目数量不能大于10')
        }
      },
      optionMoveUp( arr, index ){
        let tmp = arr[index];
        arr.splice(index, 1, arr[index-1]);
        arr.splice(index-1, 1, tmp);
      },
      questionMoveUp( arr, index ){
        let tmp = arr[index];
        arr.splice( index, 1, arr[index-1] );
        arr.splice( index-1, 1, tmp );
      },
      delQuestion( questions, index ){
        questions.splice( index, 1 )
      },
      copyQuestion( questions, index ){
        if(questions.length<10){
          let question = questions[index];
          let newQuestion = {};
          for( let item in question ){
            if(question[item] instanceof Array){
              newQuestion[item] = [];
              for( let i=0; i<question[item].length; i++ ){
                newQuestion[item][i] = question[item][i];
              }
            }else{
              newQuestion[item] = question[item];
            }
          }
          questions.splice( index, 0, newQuestion );
        }else{
          alert('题目数量不能大于10')
        }
      },
      delOperate( options, index ){
        if(options.length<3){
          alert('选项数量不能少于2');
        }else{
          options.splice( index, 1 );
        }
      },
      addOption(item){
        if (item.option.length > 9) {
          alert('选项数量不能多于10');
        } else {
          item.option.push('选项' + (item.option.length + 1))
        }
      },
      setEndTime( year, month, date ){
        let endTime = new Date(year, month, date);
        if(endTime.getTime()<new Date().getTime()){
          alert('结束日期不能早于当前');
        }else {
          this.showCalendar = false;
          this.naire.endTime = endTime;
        }
      },
      saveNaire(){
        if( this.naire.question.length>=1 && this.naire.question.length<=10 ) {
          this.upLoad();
          if(confirm("已保存,是否发布?\n"+(this.naire.endTime?this.getEndTime():''))){
            this.issusNaire();
          }else{
            window.location.href=''
          }
        }else{
          alert('题目数量应大于1小于10');
        }
      },
      issusNaire(){
        if(this.naire.endTime){
          this.naire.state = 1 ;
          this.upLoad();
          alert('发布成功,点击返回主界面')
          window.location.href=''
        }else{
          alert('请设置结束时间');
        }
      },
      getEndTime(){
        let str = '',date=this.naire.endTime;
        str = date.getFullYear()+'-'+(1+date.getMonth())+'-'+(date.getDate()-1)+' 23:59:59';
        return str;
      },
      upLoad(){
        let data = [];
        if (sessionStorage[sessionPath]) {
          data = JSON.parse(sessionStorage.questionnaireData);
          let flag = true;
          for( let i=0; i<data.length; i++ ){
            if(data[i].id==this.naire.id){
              data.splice(i,1,this.naire);
              flag = false;
              break;
            }
          }
          if(flag){
            data.push(this.naire);
          }
        } else {
          data = [this.naire];
        }
        sessionStorage[sessionPath] = JSON.stringify(data)
      }
    },
    components: {
      calendar
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and ( min-width:992px ){
    #newnaire{ width:900px }
  }

  @media screen and (min-width:768px ){
    #newnaire{ width:80% }
  }

  @media screen and ( max-width:768px ){
    #newnaire{ width:100% }
  }

  #newnaire{
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

  .addBtnBox{
    transition: height 0.5s;
    width:90%;
    height:0;
    margin:0 auto;
    margin-top:15px;
    text-align: center;
    border:1px solid #efefef;
  }

  .addBtnBoxShow{
    transition: height 0.5s;
    height:54px;
  }

  .addQuestion{
    position: relative;
    width:90%;
    height:78px;
    background-color: #efefef;
    margin:0 auto;
    margin-bottom: 15px;
    text-align: center;
    font-size:20px;
    line-height: 78px;
    cursor: pointer;
  }

  .addQuestion:hover{
    background-color:#ccc;
  }

  .btn{
    margin-top:15px
  }

  .formBox{
    width:90%;
    margin:0 auto;
    margin-top:15px;
  }

  .endTime{
    vertical-align: bottom;
    display:inline-block;
    width:150px;
    height:23px;
    text-align: center;
    border:1px solid #ccc;
  }

 .save, .issue{
   float:right;
   border:1px solid #a1a1a1;
   background-color:#fff;
   padding:3px 6px;
   margin-right:8px;
   border-radius: 3px;
   outline: none;
 }

  .save:hover, .issue:hover{
    background-color:#f07600;
    border-color:#c26206;
    color:#fff;
  }

  .questionItem{
    width:90%;
    padding:15px;
    margin:15 auto;
  }

  .questionItem:hover{
    background-color:#fcf0e5;
  }

  .questionTit{
    margin:0;
  }

  .selectList{
    list-style-type: none;
    padding:12px 16px;
    font-size:14px;
    line-height:25px;
    margin:0;
  }

  .selectOperate{
    float: right;
    line-height:14px;
    visibility: hidden;
  }

  .selectList li:hover{
    text-decoration: underline;
  }

  .selectList li:hover .selectOperate{
    visibility: visible;
  }

  .checkOpt{
    margin-right:8px;
  }

  .queOperate{
    visibility: hidden;
  }

  .selectList:hover .queOperate{
    visibility: visible;
  }

  .queOperate{
    float:right;
  }

  .operate{
    font-size:12px;
    color:#aaa;
    cursor: pointer;
  }

  .operate:hover{
    text-decoration: underline;
    color:#666;
  }

  .textSelectBox{
    height:20px;
  }

  .textSelect{
    display:none;
    float:right;
  }

  .questionItem:hover .textSelect{
    display: block;
  }

  .textBox{
    margin-top:15px;
  }
</style>
