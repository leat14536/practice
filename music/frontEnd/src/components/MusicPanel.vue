<template>
  <div id="MusicPanel">
    <div class="wrap">
      <div class="btns">
        <span class="last"></span>
        <span :class='{"play":isPause,"stop":!isPause}' @click="pauseMusic()"></span>
        <span class="next"></span>
      </div>

      <div class="pic">
        <img :src=picSrc />
      </div>

      <div class="progress">
        <div class="music-word">aaaa</div>
        <div class="music-play">
          <div class="play-btn">
            <span class="now"></span>
          </div>
        </div>
      </div>
      <div class="progress-num">05:05/05:14</div>
    </div>
  </div>
</template>

<script>
  var audio = null;
  export default {
    name: 'MusicPanel',
    props:['current'],
    created(){
        this.$nextTick(()=> {
          this.bingWatcher();
        });
    },
    data(){
      return {
        currentUrl:'',
        isPause:false,
        picSrc:''
      }
    },
    methods:{
      /*
      *   当current改变时
      *   改变audio和展示img的url
      *   todo: 获取歌词
      * */
      bingWatcher(){
        var self = this;
        this.$watch('current',function(){
          self.loadMusic();
          self.loadPic();
        })
      },

      /*
      *   通过id获取音乐的url
      *   将url赋给audio
      * */
      loadMusic(){
        if(!audio)this.getAudio();

        if(typeof m==='number'&&!isNaN(-m)){
          return;
        }

        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/music/url?id="+this.current.id,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            var ret = JSON.parse(xmlhttp.responseText);

            this.currentUrl = ret.data[0].url;
            audio.src=this.currentUrl;
          }
        }
      },

      /*
      *   暂停/播放功能
      * */
      pauseMusic(){
        this.isPause = !this.isPause;
        if(this.isPause){
          audio.pause();
        }else{
          audio.play();
        }

      },

      /*
      *   获取audio
      * */
      getAudio(){
         audio = document.getElementById('audio');
      },

      /*
      *   加载图片
      * */
      loadPic(){
        this.picSrc = this.current.al.picUrl;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*
      播放音乐面板
  */
  #MusicPanel{
    position: fixed;
    width:100%;
    height:3em;
    background-color: #000;
    bottom:0;
    z-index: 10;
  }
  .wrap{
    width:100%;
    height:100%;
  }
  .btns{
    float:left;
    display: inline-block;
    margin-left: 1em;
    height:100%;
    padding-top:5px;
  }
  /*上一首*/
  .btns span{
    display: inline-block;
    background: url("http://s2.music.126.net/style/web2/img/frame/playbar.png?5fe3efede4f927e7aee9f431da3c0b5e") no-repeat;
  }
  .btns .last{
    background-position: 0 -130px;
    width:28px;
    height:28px;
    margin-bottom:3px;
  }
  .btns .last:hover{
    background-position: -30px -130px;
  }

  /*播放*/
  .btns .play{
    background-position: 0px -204px;
    width:36px;
    height:36px;
  }
  .btns .play:hover{
    background-position: -40px -204px;
  }

  /*暂停*/
  .btns .stop{
    background-position: 0px -165px;
    width:36px;
    height:36px;
  }
  .btns .stop:hover{
    background-position: -40px -165px;
  }

  /*下一首*/
  .btns .next{
    background-position: -80px -130px;
    width:28px;
    height:28px;
    margin-bottom:3px;
  }
  .btns .next:hover{
    background-position: -110px -130px;
  }

  /*图片*/
  #MusicPanel .pic{
    float:left;
    width:34px;
    height:34px;
    overflow: hidden;
    margin: 7px 7px auto 15px;
    background-color: #aaa;
    display: none;
  }

  #MusicPanel .pic img{
    width:34px;
    height:34px;
  }

  /*进度条*/
  .progress{
    display: inline-block;
    width:55%;
    height:34px;
    margin-left:0.7em;
    float:left;
    margin-top:7px;
  }
  .music-word{
    color:#fff;
    font-size: 0.9em;
    height:19px;
  }
  .music-play{
    width:100%;
    height:3px;
    background-color: #aaa;
    margin-top:5px;
  }
  .play-btn{
    width:15%;
    height:3px;
    background-color: red;
  }
  .play-btn .now{
    width:10px;
    height:10px;
    background-color: #fff;
    display: inline-block;
    float: right;
    margin-top: -4px;
    border-radius: 50%;
  }

  /* 进度时间 */
  .progress-num{
    float: left;
    color:#fff;
    margin-top:15px;
    margin-left:15px;
    font-size: 0.9em;
    display: none;
  }

  /* 手机横屏 */
  @media only screen and (min-width:500px) {
    .progress-num,#MusicPanel .pic{
      display: inline-block;
    }
  }

  /* ipad  */
  @media only screen and (min-width:760px) {

  }
  /* 电脑屏幕,固定宽度 */
  @media only screen and (min-width:1024px) {
    .wrap{
      width:1024px;
      margin:0 auto;
    }
  }
</style>
