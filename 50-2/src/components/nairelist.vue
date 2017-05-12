<template>
  <div class="tableBox">
    <div  v-if="naire.length">
      <table class="table">
      <thead class="thead">
      <tr>
        <th></th>
        <th>标题</th>
        <th>创建时间</th>
        <th>状态</th>
        <th>操作<router-link to="/newnaire"><input type="button" value="+ 新建问卷" id="newQuestionnaire"></router-link></th>
      </tr>
      </thead>
      <tbody id="tbody">
      <tr v-for="(item,index) in naire" >
        <td><input type="checkbox" class="checkBox" @click="selectItem(item)" v-model="item.checked" /></td>
        <td>{{item.title}}</td>
        <td>{{item.setTime | getTime}}</td>
        <td ><strong :class="['state',{public:item.state==1?true:false}]">{{item | setState}}</strong></td>
        <td>
          <router-link :to="{name:'newnaire',params:{'id':item.id}}" v-if="item.state==0">
            <input type="button" class="operateBtn" value="编辑" />
          </router-link>
          <input v-else type="button" class="disabled" value="编辑"/>
          <input type="button" class="operateBtn" value="删除" @click="delItem(item)"/>
          <router-link :to="{name:'viewdata',params:{'id':item.id}}">
            <input type="button" class="operateBtn" :value="setViewBtnValue(item.state)" />
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
      <div class="optionBox">
        <input type="checkbox" id="selectAll" @click='selectAllList' v-model="selectAll" />
        <label for="selectAll">全选</label>
        <input type="button" value="删除" class="operateBtn" @click="delAllSelect" />
      </div>
    </div>
    <div v-else class="addBtnBox">
      <router-link to="/newnaire">
        <input type="button" value="新建问卷" class="addBtn"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  const questionnaireData = [
    {
      id:1,
      state: 1,
      title: '这是我的第一份问卷',
      setTime: new Date(2017, 3, 19, 20, 34, 15),
      endTime: new Date(2017, 10, 1),
      question: [
        {
          title: '单选题',
          type: 1,
          option: ['选项1', '选项2', '选项3']
        },
        {
          title: '多选题',
          type: 2,
          option: ['选项1', '选项2', '选项3', '选项4']
        },
        {
          title: '文本题',
          type: 3,
          option: true,
        },
      ]
    },
    {
      id: 2,
      state: 0,
      title: '这是我的第一份问卷',
      setTime: new Date(2017, 3, 20, 20, 34, 15),
      endTime: new Date(2017, 10, 2),
      question: [
        {
          title: '单选题',
          type: 1,
          option: ['选项1', '选项2', '选项3']
        },
        {
          title: '多选题',
          type: 2,
          option: ['选项1', '选项2', '选项3', '选项4']
        },
        {
          title: '文本题',
          type: 3,
          option: true,
        },
      ]
    },
    {
      id: 3,
      state: 2,
      title: '这是我的第一份问卷',
      setTime: new Date(2017, 1, 20, 20, 34, 15),
      endTime: new Date(2017, 3, 5),
      question: [
        {
          title: '单选题',
          type: 1,
          option: ['选项1', '选项2']
        },
        {
          title: '单选题',
          type: 1,
          option: ['选项1', '选项2', '选项3', '选项4', '选项2', '选项3', '选项4', '选项1', '选项2', '选项3', '选项4']
        },
        {
          title: '多选题',
          type: 2,
          option: ['选项1', '选项2', '选项3', '选项4', '选项1', '选项2', '选项3', '选项4', '选项1', '选项2', '选项3', '选项4']
        },
        {
          title: '文本题',
          type: 3,
          option: true,
        },
        {
          title: '文本题',
          type: 3,
          option: false,
        },
        {
          title: '多选题',
          type: 2,
          option: ['选项1', '选项2']
        },
      ],
    },
  ]
  const sessionPath = 'questionnaireData';
  export default {
    name: 'nairelist',
    data(){
      let data;
      if (sessionStorage[sessionPath]) {
        data = JSON.parse(sessionStorage[sessionPath])
        data.forEach((item)=>{
          item.setTime = new Date(item.setTime);
          if( item.endTime ){
            item.endTime = new Date(item.endTime);
          }
        })
      } else {
        data = questionnaireData;
        sessionStorage[sessionPath] = JSON.stringify(data);
      }
      return {
        naire: data,
        selectAll: false
      }
    },
    filters:{             //过滤器
      getTime(date){
        let timeStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}`
        return timeStr;
      },
      setState(item){
        if(item.state==0){
          return '未发布'
        }else if(item.state==1||item.state==2){
          if(new Date().getTime()>item.endTime.getTime()){
            item.state = 2;
            return '已结束'
          }else{
            item.state = 1;
            return '发布中'
          }
        }
      },
    },
    methods:{             //绑定事件
      selectItem(item){   //单条选择
        if(item.checked==='undefined'){
          item.$set(this.naire[index],'checked',true);
        }
      },
      selectAllList(e){   //全选
        this.naire.forEach((item)=>{
          if(item.checked==='undefined'){
            item.$set(this.naire[index],'checked',this.selectAll);
          }else{
            item.checked = this.selectAll;
          }
        })
      },
      delAllSelect(e){    //删除所选
        let delArr = [];
        this.naire.forEach((item,index)=>{
          if(item.checked){
            delArr.unshift(index);
          }
        })
       if(delArr.length&&confirm("是否删除")){
          delArr.forEach((index)=>{
            this.naire.splice(index,1);
          })
       }
      },
      delItem(item){      //删除单条
        if(confirm("是否删除")){
          this.naire.splice(this.naire.indexOf(item),1);
        }
      },
      setViewBtnValue(state){
        if(state==2){
          return '查看数据';
        }else{
          return '查看问卷';
        }
      }
    },
    watch:{
      naire:function(){
        sessionStorage[sessionPath] = JSON.stringify(this.naire);

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and ( min-width:992px ){
    .tableBox{ width:900px }
    .table{ width:90% }
    .optionBox{ width:90% }
  }

  @media screen and (min-width:768px ){
    .tableBox{ width:80% }
    .table{ width:90% }
    .optionBox{ width:90% }
  }

  @media screen and ( max-width:768px ){
    .tableBox{ width:100% }
    .table{ width:100% }
    .optionBox{ width:100% }
  }

  .tableBox{
    background-color: #fff;
    margin:0 auto;
    padding:20px 15px;
  }

  .table{
    text-align: center;
    margin:0 auto;
    border-collapse:collapse;
    border-spacing:0;
  }

  #newQuestionnaire{
    float:right;
    border:none;
    padding:3px 8px;
    color:#fff;
    background-color: #ee7419;
  }

  #newQuestionnaire:hover {
    background-color: #eb9316;
  }

  .operateBtn{
    border:1px solid #a1a1a1;
    background-color:#fff;
    padding:3px 6px;
    margin-right:8px;
    border-radius: 3px;
  }

  .operateBtn:hover{
    background-color:#f07600;
    border-color:#c26206;
    color:#fff;
  }

  .thead th{
    height:50px;
    border-bottom: 2px solid #cacaca;
  }

  #tbody tr td{
    font-size:14px;
    padding:8px 0 ;
    border-top:1px solid #cacaca;
  }

  #tbody tr:hover{
    background-color:#fcf0e5;
  }

  .state{
    color:#626262;
  }

  .public{
    color:#64e555;
  }

  .optionBox{
    margin:15px auto;
  }

  .disabled{
    border:1px solid #a1a1a1;
    background-color:#eee;
    color:#ccc;
    padding:3px 6px;
    margin-right:8px;
    border-radius: 3px;
    cursor: not-allowed;
    outline: none;
  }

  .addBtnBox{
    text-align: center;
  }

  .addBtn{
    border:1px solid #a1a1a1;
    background-color:#fff;
    padding:10px 15px;
    font-size:20px;
    border-radius: 3px;
  }

  .addBtn:hover{
    background-color:#f07600;
    border-color:#c26206;
    color:#fff;
  }

</style>
