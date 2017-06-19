<template>
  <div id="app">
    <!-- header -->
    <header class="header">
      <div class="logo">我的音乐</div>

      <!--导航-->
      <div class="header-music-list"
           @click="showClassify=true"
            v-if="!showLyric">分类列表</div>
      <div class="header-play-list"
           @click="showPlayList=true">播放列表</div>
      <div class="login-box" v-if="!isLogin">
        <span  @click="toLogin()">登录</span>
        <span>/</span>
        <span @click="toRegister()">注册</span>
      </div>

      <!-- 登录 -->
      <div class="login-box" v-if="isLogin"
           @mouseover="showSpaner=true"
           @mouseleave="showSpaner=false">
        <span>你好  </span>
        <span> {{loginData.username}}</span>
        <span v-if="isAdmin">/</span>
        <span @click="logout()">退出</span>
        <div class="spinner" v-if="showSpaner">
          <li>上传</li>
          <li v-if="isAdmin">审核</li>
          <li v-if="isAdmin">管理</li>
        </div>
      </div>
    </header>

    <keep-alive>
      <!-- 分类列表和音乐列表 -->
      <container v-bind:showClassify="showClassify"
                 @playMusic="pushId"
                 @pushItem="pushItem"
                 v-if="!showLyric"></container>
    </keep-alive>

    <!-- 歌词面板 -->
    <keep-alive>
      <Lyric v-bind:current="playList[currentMusic]"
             v-if="showLyric"></Lyric>
    </keep-alive>

    <!-- 音乐播放面板 -->
    <MusicPanel v-bind:current="playList[currentMusic]"
                @prev="prevMusic"
                @next="nextMusic"
                @showLyric="toggleLyric"></MusicPanel>

    <!-- 登录面板 -->
    <Login v-if="showLoginPanel"
           @hide="showLoginPanel=false"
           @loginSuccess="getLoginData"
           v-bind:todo='loginMessage'></Login>

    <!-- 播放列表 -->
    <div class="playList" :class="{show:showPlayList}">
      <div class="listhd">播放列表({{playList.length}})
        <span class="clear" title="清空"
              @click="clearPlayList">清空</span>
      </div>
      <div class="playList-item"
           v-for="(item,index) in playList">
        <span class="wrap">
          <span title="移除"
                @click="delItem">×</span>
          <span v-if="index===currentMusic" class="currentPlay">▶</span>
        </span>
        <span @click="switchMusic(index)"
              class="details">
          <span>{{item.name}}</span>
          <span>{{item.ar[0].name}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Container from './components/container.vue';
import MusicPanel from './components/MusicPanel.vue';
import Login from './components/Login.vue';
import Lyric from './components/Lyric.vue';

export default {
  name: 'app',
  created(){
    //验证是否已登录
    this.logOn();

    //创建audio元素
    this.createAudio();

    //分类关闭
    this.$nextTick(()=>{
        this.$el.addEventListener('click',(e)=>{
          if(e.target.className.indexOf('header-music-list')===-1){
            this.showClassify = false;
          }
          if(e.target.className.indexOf('header-play-list')===-1){
            this.showPlayList = false;
          }
        })
    })
  },
  data(){
    return {
      showLoginPanel:false,
      loginMessage:'login',
      loginData:{
          username:'',
      },
      isLogin:false,
      isAdmin:false,
      showSpaner:false,
      showClassify:false,
      playList:[],
      currentMusic:0,
      showPlayList:false,
      showLyric:false
    }
  },
  methods:{

    createAudio(){
      var audio = document.createElement('audio');
      audio.setAttribute('autoplay','');
      audio.setAttribute('id','audio');
      document.body.appendChild(audio);
    },
    /*
    *   判断是否登陆
    * */
    logOn(){
      var self = this;
      this.$http({
        method: 'get',
        url: '/main/userInfo',
        success(data){
          if (data.isLogged) {
            self.loginData.username = data.username;
            self.isLogin = true;
            self.isAdmin = data.isAdmin;
          }
        },
        fail(e){
          console.log(e)
          console.log('login false')
        }
      });
    },
    /*
    *   去登陆
    * */
    toLogin(){
      this.loginMessage = 'login';
      this.showLoginPanel = true;
    },

    /*
     *   去注册
     * */
    toRegister(){
      this.loginMessage = 'register';
      this.showLoginPanel = true;
    },
    getLoginData(data){
      this.isLogin = true;
      this.loginData = data;
    },

    /*
    *   退出
    * */
    logout(){
      this.$http({
        method:'get',
        url:'/api/user/logout',
        success(data){
          if(!data.code){
            window.location.reload();
          }
        },
        fail(e){
          console.log(e);
          console.log('logout false')
        }
      })
    },

    pushId(item){
      //加入播放列表
      for( var i=0; i<this.playList.length; i++ ){
          if(this.playList[i].id===item.id){
            this.currentMusic = i;
            return;
          }
      }
      this.playList.unshift(item);
      this.currentMusic = 0;
    },

    pushItem(item){
      for( var i=0; i<this.playList.length; i++ ){
        if(this.playList[i].id===item.id){
          return;
        }
      }
      this.playList.push(item);
    },

    prevMusic(){
      if(this.playList.length<1) return;
      --this.currentMusic;
      if(this.currentMusic<0) this.currentMusic += this.playList.length;
    },

    nextMusic(){
      if(this.playList.length<1) return;
      ++this.currentMusic;
      if(this.currentMusic>=this.playList.length) this.currentMusic = this.playList.length%this.currentMusic;
    },

    clearPlayList(){
      this.playList = [];
      this.currentMusic=0;
    },

    /*
    *   切换到指定歌曲
    * */
    switchMusic(num){
      this.currentMusic = num;
    },

    /*
    *   删除指定歌曲
    * */
    delItem(num){
      this.playList.splice(num,1);
    },

    toggleLyric(){
        this.showLyric = !this.showLyric;
    }
  },
  components: {
    Container,
    MusicPanel,
    Login,
    Lyric
  },
}
</script>

<style>
  html,body,div,span,header,footer,h1,h2,h3,h4,h5,h6,a,img,ul,li,nav{
    padding:0;
    margin:0;
  }
  html,body{
    width: 100%;
    height:100%;
  }
  a{
    text-decoration: none;
  }
  #app{
    width:100%;
    height:100%;
  }
  /* 头部 */
  .header{
    width:100%;
    height:3em;
    line-height: 3em;
    background-color: #000;
    color:#fff;
    z-index: 10;
  }
  .logo{
    font-size:1.2em;
    font-weight: bold;
    margin-left: 1em;
    display: none;
  }
  .header-music-list{
    color:#fff;
    display: inline-block;
    margin-left:1em;
    height:3em;
    padding: 0 1em;
    cursor: pointer;
    font-size:0.5em;
  }
  .header-play-list{
    color:#fff;
    display: inline-block;
    margin-left:1em;
    height:3em;
    padding: 0 1em;
    cursor: pointer;
    font-size:0.5em;
  }
  .login-box{
    float:right;
    margin-right:1em;
    font-size: 0.5em;
  }
  .login-box span{
    cursor: pointer;
  }

  .spinner{
    width:20%;
    position: absolute;
    right:0;
    top:3em;
    z-index: 2;
    color:#000;
    background-color: #fff;
    list-style-type: none;
    border:1px solid #aaa;
  }
  .spinner li{
    padding-left: 10%;
  }
  .spinner li:hover{
    background-color: #eee;
  }

  /* 播放列表 */
  .playList{
    width:100%;
    height:50%;
    overflow-y: scroll;
    position: absolute;
    background-color: #000;
    opacity: 0.8;
    top:3em;
    left:0;
    z-index: 100;
    display:none;
  }
  .playList.show{
    display: block;
    animation: entered 0.3s;
  }
  @keyframes entered {
    from{  top:-50%  }
    to{  top:3em  }
  }
  .listhd{
    width:80%;
    margin:0 auto;
    height:2.5em;
    line-height:2.5em;;
    color:#fff;
  }
  .listhd .clear{
    float:right;
    cursor: pointer;
  }
  .playList-item{
    height:1.5em;
    width:80%;
    margin:0 auto;
    opacity: 0.5;
    color:#fff;
  }
  .playList-item .wrap{
    width:20%;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
  }
  .playList-item .currentPlay{
    float: right;
  }
  .playList-item .details{
    width:70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }



  /* 手机横屏 */
  @media only screen and (min-width:500px) {
    .login-box,.header-music-list,.header-play-list{
      font-size: 1em;
    }
  }

  /* ipad */
  @media only screen and (min-width:760px) {
    .header-music-list{
      display: none;
    }
    .logo{
      display: inline;
    }
    .playList{
      width:700px;
      left:50%;
      margin-left:-300px;
    }
  }

  /* 电脑屏幕,固定宽度 */
  @media only screen and (min-width:1024px) {
    .container{
      width:1000px;
      margin: 0 auto;
    }
  }
</style>
