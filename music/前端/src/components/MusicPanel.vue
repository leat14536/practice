<template>
  <div id="MusicPanel">
    <div class="wrap">
      <div class="btns">
        <span class="last"></span>
        <span class="play"></span>
        <span class="next"></span>
      </div>
      <div class="pic">
        <img src="http://p1.music.126.net/tfa811GLreJI_S0h9epqRA==/3394192426154346.jpg?param=34y34"/>
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
  export default {
    name: 'MusicPanel',
    props:['currentID'],
    created(){
        this.$nextTick(()=> {
          this.bingWatcher();
        });
    },
    data(){
      return {

      }
    },
    methods:{
      bingWatcher(){
        var self = this;
        this.$watch('currentID',function(){
          self.getMusicUrl();
        })
      },
      getMusicUrl(){
        console.log('play : '+this.currentID);
        if(typeof m==='number'&&!isNaN(-m)){
          return;
        }

        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/music/url?id="+this.currentID,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            console.log(JSON.parse(xmlhttp.responseText));
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.music-panel{
    line-height: 50px;
    width: 100%;
    min-width: 800px;
    height: 50px;
    border: 1px solid #666;
    position: fixed;
    bottom: 0;
    background-color: #fff;
  }
  .last-music,.next-music{
    display: inline-block;
    width:30px;
    height:30px;
    border-radius: 50%;
    background-color: #c62f2f;
  }
  .play-music{
    display: inline-block;
    width:35px;
    height:35px;
    border-radius: 50%;
    background-color: #c62f2f;
  }
  .last-music,.next-music,.play-music{
    line-height: 50px;
  }
  .play-list{
    float:right;
    margin-right:50px;
    cursor: pointer;
  }*/
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
    display: none;
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

  /*
      进度时间
  */
  .progress-num{
    float: left;
    color:#fff;
    margin-top:15px;
    margin-left:15px;
    font-size: 0.9em;
    display: none;
  }

  /*
      手机横屏
  */
  @media only screen and (min-width:500px) {
    .progress-num,#MusicPanel .pic{
      display: inline-block;
    }
  }

  /*
      ipad
  */
  @media only screen and (min-width:760px) {

  }
  /*
      电脑屏幕,固定宽度
  */
  @media only screen and (min-width:1024px) {
    .wrap{
      width:1024px;
      margin:0 auto;
    }
  }
</style>
