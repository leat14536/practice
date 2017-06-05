<template>
  <div id="container">
    <div class="nav-left">
      <div class="list">
        <div class="title">分类</div>
        <a href="#" v-for="(item,index) in musicList">
          <div class="list-item"
               :class="{'active':nowActive===index}"
               @click="nowActive=index">{{item.name}}</div>
        </a>
      </div>
      <div class="list">
        <div class="title">操作</div>
        <a href="#">
          <div class="list-item">管理播放列表</div>
        </a>
        <a href="#" v-if="isLogin">
          <div class="list-item">管理我的歌单</div>
        </a>
        <a href="#" v-if="isLogin">
          <div class="list-item">上传</div>
        </a>
      </div>
      <div class="list" v-if="isAdmin">
        <div class="title">管理员操作</div>
        <a href="#">
          <div class="list-item">前往管理界面</div>
        </a>
      </div>
    </div>
    <div class="nav-right">
      <div class="music-list">
        <ul class="music-list-header">
          <li> </li>&nbsp;
          <li>歌曲</li>&nbsp;
          <li>歌手</li>&nbsp;
          <li>时长</li>&nbsp;
        </ul>
        <ul class="music-list-container" v-if="musicList.length>0">
          <li class="music-item" v-for="(item,index) in musicList[nowActive].list">
              <span>
                <span>{{index+1}}</span>
                <span class="option">播,表,下</span>
              </span>&nbsp;
              <span>{{item.name}}</span>&nbsp;
              <span>{{item.singer}}</span>&nbsp;
              <span>{{item.time}}</span>&nbsp;
          </li>
        </ul>
        <!--<table class="list">
          <thead>
            <tr>
              <th></th>
              <th>歌曲</th>
              <th>歌手</th>
              <th>时长</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>aaaa</td>
              <td>王苏</td>
              <td>04:04</td>
            </tr>
          </tbody>
        </table>-->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'container',
    created(){
      this.getData();
    },
    data(){
      return {
        'musicList':[],
        'nowActive':0,
        'isLogin':false,
        'isAdmin':false
      }
    },
    methods:{
      getData(){
        axios.get('http://localhost:3000')
          .then(res=>{
            //this.$set(this.$data,'musicList',res.data)
            this.musicList = res.data;
            console.log(this.$data)
            this.init();
          })
      },
      init(){
        /*this.isActive = this.musicList.map(()=>{
          return 0;
        })*/
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container{
    width:100%;
    height:100%;
    min-width: 1000px;
    min-height: 600px;
    margin-top:50px;
    border:1px solid #666;
    position: relative;
  }
  .nav-left{
    box-sizing: border-box;
    float:left;
    width:20%;
    height:100%;
    min-height: 600px;
    background-color: #f5f5f7;
    border-right:1px solid #e1e1e2;
  }
  .nav-right{
    box-sizing: border-box;
    float:left;
    width:80%;
    //height:100%;
  }
  .list{
    width:100%;
    margin:15px auto;
    text-indent: 15px;
  }
  .title{
    cursor: default;
    font-size:14px;
    color:#7d7d7d;
    margin-bottom: 10px;
  }
  .list-item{
    text-indent: 1.5em;
    color:#5c5c5c;
    text-decoration: none;
    line-height: 30px;
  }
  .active{
    background-color: #e8e9ec;
    border-left:2px solid #c62f2f;
    color:#000;
  }
  .music-list-header{
    height:30px;
    line-height: 30px;
  }
  .music-list-header,.music-list-container{
    list-style-type: none;
    text-align: justify;
  }
  .music-list-header li{
    display: inline-block;
    text-align: center;
    width:20%;
    font-size:18px;
    background-color: fbfbfb;
  }
  .music-item>span{
    display: inline-block;
    width:20%;
    text-align: center;
  }
  .music-item>span:first-child{
    text-align: left;
    text-indent: 25px;
  }

  .music-item{
    width:100%;
    text-align: justify;
    cursor: default;
    height:30px;
    background-color: #fff;
  }
  .option{
    display: none;
  }
  .music-item:hover> span .option{
    display: inline-block;
    margin-left: 15px;
  }
</style>
