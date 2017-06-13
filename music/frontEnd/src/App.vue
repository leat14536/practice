<template>
  <div id="app">
    <!-- header -->
    <header class="header">
      <div class="logo">我的音乐</div>

      <!--导航-->
      <div class="header-music-list"
           @click="showClassify=true">分类列表</div>
      <div class="header-play-list">播放列表</div>
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

    <!-- 分类列表和音乐列表 -->
    <container v-bind:showClassify="showClassify"
               @playMusic="pushId"></container>

    <!-- 音乐播放面板 -->
    <!--v-bind:currentPicUrl="playList[currentMusic].al.picUrl"-->
    <MusicPanel v-bind:current="playList[currentMusic]"
                ></MusicPanel>

    <!-- 登录面板 -->
    <Login v-if="showLoginPanel"
           @hide="showLoginPanel=false"
           @loginSuccess="getLoginData"
           v-bind:todo='loginMessage'></Login>
  </div>
</template>

<script>
import Container from './components/container.vue';
import MusicPanel from './components/MusicPanel.vue';
import Login from './components/Login.vue';
export default {
  name: 'app',
  created(){
    //验证是否已登录
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","/api/",true);
    xmlhttp.send();

    var promise = new Promise((res,rej)=>{
      xmlhttp.onreadystatechange = (e)=>{
        if(xmlhttp.readyState===4&&xmlhttp.status===200){
          res(JSON.parse(xmlhttp.responseText))
        }
      }
    })

    promise.then((data)=>{
        if (data.isLogged) {
          this.loginData.username = data.username;
          this.isLogin = true;
          this.isAdmin = data.isAdmin;
        }
    })

    //分类关闭
    this.$nextTick(()=>{
        this.$el.addEventListener('click',(e)=>{
          if(e.target.className.indexOf('header-music-list')===-1){
            this.showClassify = false;
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
      currentMusic:0
    }
  },
  methods:{

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
    //退出
    logout(){
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET","/api/api/user/logout",true);
      xmlhttp.send();

      xmlhttp.onreadystatechange = (e)=>{
        if(xmlhttp.readyState===4&&xmlhttp.status===200){
          if(!xmlhttp.responseText.code){
              window.location.reload();
          }
        }
      }
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
      console.log(this.playList);
    }
  },
  components: {
    Container,
    MusicPanel,
    Login
  },
}
</script>

<style>
  html,body,div,span,header,footer,h1,h2,h3,h4,h5,h6,a,img,ul,li{
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
  /*
      头部
  */
  .header{
    width:100%;
    height:3em;
    line-height: 3em;
    background-color: #000;
    color:#fff;
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
  }
  .header-play-list{
    color:#fff;
    display: inline-block;
    margin-left:1em;
    height:3em;
    padding: 0 1em;
    cursor: pointer;
  }
  .login-box{
    float:right;
    display: inline-block;
    margin-right:1em;
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
  /*
      手机横屏
  */
  @media only screen and (min-width:500px) {
    .progress-num,.musicPanel .pic{
      display: inline-block;
    }
  }

  /*
      ipad
  */
  @media only screen and (min-width:760px) {
    .header-music-list{
      display: none;
    }
    .logo{
      display: inline;
    }
  }
  /*
      电脑屏幕,固定宽度
  */
  @media only screen and (min-width:1024px) {
    .container{
      width:1000px;
      margin: 0 auto;
    }
  }
</style>
