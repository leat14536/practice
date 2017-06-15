<template>
  <div id="MusicPanel" v-if="current">
    <div class="wrap">
      <!-- 控制音乐播放/暂停/下一首 -->
      <div class="btns">
        <span class="last" @click="prev"></span>
        <span :class='{"play":isPause,"stop":!isPause}' @click="pauseMusic()"></span>
        <span class="next" @click="next"></span>
      </div>

      <!-- 音乐图片 -->
      <div class="pic">
        <img :src=picSrc
             @click="showLyric" />
      </div>

      <!-- 音乐播放面板 -->
      <div class="progress">
        <div class="music-word">{{current.name}} {{current.ar[0].name}}</div>
        <div class="music-play" @click="switchProgress($event)">
          <div class="play-btn">
            <span class="now"></span>
          </div>
        </div>
      </div>
      <div class="progress-num">
        <span>{{currentTime}}</span>
        <span>/</span>
        <span>{{duration}}</span>
      </div>
    </div>

    <!-- 显示歌词面板 -->
    <div class="lyric-btn">
      <img v-if="current"
           :src=picSrc
           class="btn-pic"
           @click="showLyric">
    </div>
  </div>
</template>

<script>
  var audio = null,
      timer=null;
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
        picSrc:'',
        currentTime:'00:00',
        duration:'00:00',
        currentPercentage:0,
        musicBar:null
      }
    },
    methods:{
      /*
      *   当current改变时
      *   改变audio和展示img的url
      * */
      bingWatcher(){
        var self = this;
        this.$watch('current',function(nvl){
          if(!this.current){
            clearInterval(timer);
            audio.pause();
            return;
          }
          self.loadMusic();
          self.loadPic();
        })

        this.$watch('currentPercentage',function(nvl){
          if(!this.current)return;
          if(nvl>=100){
              this.next();
              return;
          }
          this.$el.querySelector('.play-btn').style.width = nvl+'%';
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

        this.$http({
          method:'get',
          url:'/music/url?id='+this.current.id,
          success(data){
            this.currentUrl = data.data[0].url;
            audio.src=this.currentUrl;
            this.setInterval();
          },
          fail(){
            console.log('false')
          },
          ctx:this
        })
      },

      /*
      *   计时器,用于显示进度
      * */
      setInterval(){
        clearInterval(timer);
        timer = setInterval(()=>{
          this.duration = this.getTime(Math.floor(audio.duration));
          this.currentTime = this.getTime(Math.floor(audio.currentTime));
          this.currentPercentage = audio.currentTime/audio.duration*100;
        },200);
      },

      /*
      *   传入时间() 返回字符串  例:61 => '01:01'
      * */
      getTime(seconds){
        if(typeof seconds!=='number'||isNaN(-seconds)) return'00:00';
        var minutes = Math.floor(seconds/60);
        if(minutes<10)  minutes = '0'+minutes;
        var seconds = seconds%60;
        if(seconds<10) seconds = '0'+seconds;
        return minutes+':'+seconds;
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
      },

      /*
      *   上一首/下一首
      * */
      prev(){
        this.$emit('prev');
      },
      next(){
        this.$emit('next');
      },

      /*
      *   点击进度条切换进度
      * */
      switchProgress(e){
        if(!this.musicBar) this.musicBar = this.$el.querySelector('.music-play');
        if(!this.current) return;
        var clientRect = this.musicBar.getBoundingClientRect();
        audio.currentTime = Math.floor(((e.pageX-clientRect.left)/clientRect.width)*audio.duration);
      },

      showLyric(){
        this.$emit('showLyric')
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
    background: url("/api/public/images/playbar.png") no-repeat;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .music-play{
    width:100%;
    height:3px;
    background-color: #aaa;
    margin-top:5px;
  }
  .play-btn{
    width: 0;
    height: 3px;
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

  /* 显示歌词面板 */
  .lyric-btn{
    width:2.5em;
    height:2.5em;
    position: fixed;
    right:0;
    bottom: 4em;
    border-radius: 0.5em;
    background-color: #aaa;
    overflow: hidden;
  }
  .lyric-btn .btn-pic{
    width:2.5em;
    height:2.5em;
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
    .lyric-btn{
      display: none;
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
