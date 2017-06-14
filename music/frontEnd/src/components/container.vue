<template>
  <div id="container">
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
          <span>
            <span title="加入播放列表"
                  @click="pushItem(item)">+</span>
          </span>
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
        list:[],
        showLyric:false
      }
    },
    methods:{
      renderMusicList(){
        if(!this.musicData[this.now]){
            this.getMusicList();
        }
      },

      /*
      *   获取音乐列表
      * */
      getMusicList(){
        var now = this.now;
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/playlist/detail?id="+this.typeList.playlists[this.now].id,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            var musicLists = JSON.parse(xmlhttp.responseText);

            this.musicData[now] = {
              names: musicLists.playlist.tracks,
              ids: musicLists.playlist.trackIds
            }
            this.musicData = this.musicData.slice();
          }
        }
      },

      /*
      *   获取分类列表
      * */
      getTypeList(){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/top/playlist/highquality?limit=10",true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            this.typeList = JSON.parse(xmlhttp.responseText);
            this.renderMusicList();
          }
        }
      },

      /*
      *   切换当前音乐列表
      * */
      changeCurrentList(index){
        this.now = index;
        this.getMusicList();
      },


      saveMusicId(item){
        this.$emit('playMusic',item);
      },

      pushItem(item){
        this.$emit('pushItem',item);
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

  /* 音乐列表 */
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
    width:100%;
    overflow: hidden;
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
    text-overflow: ellipsis;
    white-space: nowrap;

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
    text-overflow: ellipsis;
    white-space: nowrap;
    /*  暂时这样设置 */
    overflow: hidden;
  }
  .list-head span:first-child,.music-list-item span:first-child{
    width:10%;
  }


  /* 分类列表 */
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

  /* 手机横屏 */
  @media only screen and (min-width:500px) {

  }

  /* ipad */
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

  /* 电脑屏幕,固定宽度 */
  @media only screen and (min-width:1024px) {
    #container{
      width:1024px;
      margin: 0 auto;
    }
  }
</style>
