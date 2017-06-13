<template>
  <div id="container">
    <!--<div class="nav-left">
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
      </div>
    </div>-->

    <!-- 分类列表 -->
    <nav class="classify-list"
         :class="{entered:showClassify}">
      <div class="classify-item"
           @click="changeCurrentList(index)"
           :class="{select:index===now}"
           v-for="(item,index) in typeList.playlists">{{item.name}}</div>
    </nav>

    <!-- 歌曲列表 -->
    <nav class="music-list">
      <div class="list-head">
        <span></span>&nbsp;
        <span>歌曲</span>&nbsp;
        <span>歌手</span>&nbsp;
        <span>操作</span>
      </div>
      <div class="music-list-items"
           v-if="musicData[now]" >
        <div class="music-list-item"
             v-for="(item,index) in musicData[now].names">
          <span>{{index+1}}</span>&nbsp;
          <span @click="saveMusicId(item)">{{item.name}}</span>&nbsp;
          <span>{{item.ar[0].name}}</span>&nbsp;
          <span>操作</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'container',
    created(){
      //获取分类列表
      this.getTypeList();
      this.$nextTick(()=>{
          console.log(this.showClassify);
      })
    },
    props:['showClassify'],
    data(){
      return {
        singerList:[],
        musicData:[],
        nowActive:0,
        isLogin:false,
        isAdmin:false,
        now:0,
        typeList:[],
        list:[]
      }
    },
    methods:{
      renderMusicList(){
        if(!this.musicData[this.now]){
            this.getMusicList();
        }
      },
      getMusicList(){
        var now = this.now;
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/playlist/detail?id="+this.typeList.playlists[this.now].id,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            //this.musicData[now] = JSON.parse(xmlhttp.responseText);
            //this.musicData = this.musicData.slice();
            var musicLists = JSON.parse(xmlhttp.responseText);

            this.musicData[now] = {
              names: musicLists.playlist.tracks,
              ids: musicLists.playlist.trackIds
            }
            //console.log(this.musicData[now])
            this.musicData = this.musicData.slice();
          }
        }
      },
      getTypeList(){
        //获取分类列表
        var xmlhttp=new XMLHttpRequest();
        //xmlhttp.open("GET","/api/main/singerList",true);
        xmlhttp.open("GET","/api/top/playlist/highquality?limit=10",true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            //this.singerList = JSON.parse(xmlhttp.responseText);
            //console.log(JSON.parse(xmlhttp.responseText))
            this.typeList = JSON.parse(xmlhttp.responseText);
            this.renderMusicList();
            //console.log(this.typeList);
          }
        }
      },
      changeCurrentList(index){
        this.now = index;
        this.getMusicList();
      },
      saveMusicId(item){
        this.$emit('playMusic',item);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container{
    width:100%;
    height:100%;
    position: relative;
    padding-bottom: 100px;
  }

  /*
      音乐列表
  */
  .music-list{
    width:100%;
    height:100%;
  }
  .list-head{
    height:3em;
    line-height: 3em;
    background-color: #f2f2f6;
    margin:0 auto;
    text-align: justify;
  }
  .music-list-item:after,.list-head:after{
    display: inline-block;
    content: '';
    width:100%;
    overflow: hidden;
  }
  .list-head span{
    text-align: center;
    display: inline-block;
    width:27%;
    height:2em;
    line-height:2em;
  }

  .music-list-item:nth-child(even){
    height:2em;
    line-height: 2em;
    background-color: #f2f2f6;
    color:#666;
    margin:0 auto;
    text-align: justify;
  }

  .music-list-item:nth-child(odd){
    height:2em;
    line-height: 2em;
    background-color: #fff;
    color:#666;
    margin:0 auto;
    text-align: justify;
  }

  .music-list-item span{
    text-align: center;
    display: inline-block;
    width:27%;
    height:2em;
    line-height:2em;
    cursor:pointer;
    /*  暂时这样设置 */
    overflow: hidden;
  }
  .list-head span:first-child,.music-list-item span:first-child{
    width:10%;
  }


  /*
      分类列表
  */
  .classify-list{
    position: absolute;
    top:0;
    left:-30%;
    width:30%;
    background-color: #fff;
    border:1px solid #ccc;
    z-index: 2;
    padding:1em 1em;
    line-height: 2em;
    display: none;
  }
  .classify-item{
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    cursor: pointer;
  }
  .classify-item.select{
    background-color: #eee;
  }
  .classify-list.entered{
    animation: entered 0.3s ease;
    animation-fill-mode : forwards;
    display:block;
  }
  @keyframes entered {
    from{  left:-30%  }
    to{  left:0;  }
  }
  .music-list-items{
    padding-bottom: 60px;
  }

  /*
      手机横屏
  */
  @media only screen and (min-width:500px) {

  }

  /*
      ipad
  */
  @media only screen and (min-width:760px) {
    .classify-list{
      width:20%;
      position: relative;
      left:0;
      top:0;
      float: left;
      box-sizing: border-box;
    }
    .music-list{
      width:78%;
      float: left;
      box-sizing: border-box;
      margin-left: 2%;
    }
    .classify-list{
      display: block;
      margin-left: 0;
    }
  }

  /*
      电脑屏幕,固定宽度
  */
  @media only screen and (min-width:1024px) {
    #container{
      width:1024px;
      margin: 0 auto;
    }
  }
</style>
