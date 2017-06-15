<template>
  <div id="Lyric">
    <div class="lyric-items"
         v-if="lyric">
      <div class="wrap-side">
        <div class="lyric-wrap">
          <div v-if="lyric.ti" class="ti">{{lyric.ti}}</div>
          <div v-if="lyric.ar" class="ar">{{lyric.ar}}</div>
          <div v-for="(item,index) in lyric"
               :class="{on:index===currentLine,
                        blank:!item.lyric.length}">
            {{item.lyric}}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="lyric-items">无歌词</div>
    <img :src="current.al.picUrl" class="img"/>
  </div>
</template>

<script>
  let audio,timer,lyricBox,wrap,side;
  export default {
    name: 'Lyric',
    props:['current'],
    created(){
      this.$nextTick(()=> {
        this.bindWatch();
        this.getLyric()
      })
    },
    data(){
      return{
        lyric:[],
        currentTime:0,
        currentLine:0
      }
    },
    methods:{
      bindWatch(){
        if(!audio) audio = document.getElementById('audio');

        //切换歌曲
        this.$watch('current',function(){
          this.currentTime = 0;
          this.currentLine = 0;
          if(!this.current) return;
          if(!audio) audio = document.getElementById('audio');
          this.getLyric();
        });

        //滑到歌词相应位置
        this.$watch('currentLine',function(nvl,val){
          this.switchLine();
        })

      },
      getLyric(){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/lyric?id="+this.current.id,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            this.lyric=[];
            this.resetLyric(JSON.parse(xmlhttp.responseText))
          }
        }
      },
      switchLine(){
        if(!wrap) wrap = this.$el.querySelector('.lyric-wrap');

        wrap.style.top = -this.currentLine*2+'em';
      },
      resetLyric(data){
        //无歌词
        if(data.nolyric)return;

        var lyricData = data.lrc.lyric.split('\n')
        var reg = /\[\d*:\d*.\d*\]/g;
        var lyric = [];

        lyricData.forEach((str)=>{
          var timeStr = str.match(reg);
          if(!timeStr){

            //歌名
            var ti = str.match(/\[ti:(.*?)\]/)
            if(ti){
              lyric.ti = ti[1];
              return;
            }

            //歌手
            var ar =  str.match(/\[ar:(.*?)\]/)
            if(ar)lyric.ar = ar[1];
            return;
          }

          timeStr = timeStr[0];
          var minutes = timeStr.match(/\[(\d*)/)[1]-0;
          var seconds = timeStr.match(/\:(\d*)./)[1]-0;
          lyric.push({
            time:minutes*60+seconds,
            lyric:str.replace(reg,'')
          });
        });

        this.lyric= lyric;
        this.setInterval();
      },
      setInterval(){
        clearInterval(timer);
        if(!this.lyric)return;
        if(!audio)return;
        timer = setInterval(()=>{
          let lyric=this.lyric,i;
          this.currentTime = audio.currentTime;
          for( i=lyric.length;--i>=0; ){
            if(lyric[i].time<this.currentTime){
              this.currentLine = i;
              break;
            }
          }
          if(!i)this.currentLine=0;
        },200)
      }
    }
  }
</script>

<style scoped>
  #Lyric{
    width:100%;
    height:100%;
    background: rgba(125,125,112,0.5) no-repeat;
    overflow: hidden;
    position: relative;
  }
  .lyric-items{
    color:#333;
    text-align: center;
    line-height: 2em;
    z-index: 10;
    padding-bottom: 5em;
    position: relative;
    top:0;
    left:0;
  }
  .lyric-items div{

  }
  .lyric-items .on{
    color:#000;
    font-size: 1.5em;
  }
  .lyric-items .ti{
    font-size:1.5em;
  }
  .lyric-items .ar{
    font-size:1em;
    margin-bottom: 3em;
  }
  .blank{
    height:2em;
  }
  .wrap-side{
    margin-top:5em;
    position: relative;
    width:100%;
    height:100%;
  }
  .lyric-wrap{
    position: relative;
    transition: top 0.3s ease;
  }
  .img{
    width:100%;
    height:100%;
    top:0;
    left:0;
    position: absolute;
    filter:blur(65px);
    opacity: 0.5;
    z-index: 1;
    pointer-events: none;
  }
</style>
