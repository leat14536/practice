<template>
  <div class="tableBox">
    <table class="table">
      <thead class="thead">
      <tr>
        <th></th>
        <th>标题</th>
        <th>创建时间</th>
        <th>状态</th>
        <th>操作<input type="button" value="+ 新建问卷" id="newQuestionnaire"></th>
      </tr>
      </thead>
      <tbody id="tbody">

        <tr v-for="item in naire" >
          <td><input type="checkbox" class="checkBox" ref="checkbox"/> </td>
          <td>{{item.title}}</td>
          <td>{{item.setTime | getTime}}</td>
          <td ><strong :class="['state',{public:item.state==1?true:false}]">{{item | setState}}</strong></td>
          <td>
            <input type="button" :class="[{'operateBtn':item.state==0?true:false},{'disabled':item.state==0?false:true}]" value="编辑" />
            <input type="button" class="operateBtn" value="删除" v-on:click="delItem"/>
            <input type="button" class="operateBtn" value="查看数据" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="optionBox">
      <input type="checkbox" id="selectAll" v-on:click='selectAll' />
      <label for="selectAll">全选</label>
      <input type="button" value="删除" class="operateBtn"v-on:click="delAllSelect"/>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'nairelist',
    data(){
      let questionnaireData = [
        {
          id: 0,
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
          id: 1,
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
          id: 2,
          state: 1,
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
          ]
        },
      ]
      let data;
      if (!data) {
        if (sessionStorage.questionnaireData) {
          data = JSON.parse(sessionStorage.questionnaireData)
          data.setTime = new Date(data.setTime)
          data.endTime = new Date(data.endTime)
        } else {
          data = questionnaireData;
        }
      }
      return {
        naire: data
      }
    },
    filters:{
      getTime(date){
        let time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        return time;
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

      }
    },
    methods:{
      selectAll(e){
        if(e.target.checked){
          this.$refs.checkbox.forEach((input)=>{
            input.checked = 'checked'
          })
        }else{
          this.$refs.checkbox.forEach((input)=>{
            input.checked = null;
          })
        }
      },
      delAllSelect(e){
        let delArr=[];
        this.$refs.checkbox.forEach((input,index)=>{
          if(input.checked){
            delArr.unshift(index);
          }
        })
        if(delArr.length){
          //弹出确认框
          //这里简化 使用浏览器自带弹出框
          let ret = confirm("确认要删除？")
          if(ret){
            delArr.forEach((delIndex)=>{
              this.$refs.checkbox[delIndex].checked = null;
              this._data.naire.splice(delIndex,1);
            })
          }
        }
      },
      delItem(e){
        console.log(e.target.parentNode.parentNode);
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

</style>
