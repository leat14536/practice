<template>
  <div id="Lyric">
  </div>
</template>

<script>
  let audio;
  export default {
    name: 'Lyric',
    props:['current'],
    created(){
      this.$nextTick(()=> {
        this.bindWatch();
      })
    },
    data(){
      return{

      }
    },
    methods:{
      bindWatch(){
        this.$watch('current',function(){
          if(!this.current) return;
          if(!audio) audio = document.getElementById('audio');
          this.getLyric();
        })
      },
      getLyric(){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","/api/lyric?id="+this.current.id,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = (e)=>{
          if(xmlhttp.readyState===4&&xmlhttp.status===200){
            this.resetLyric(JSON.parse(xmlhttp.responseText))
          }
        }
      },
      resetLyric(data){
        if(data.nolyric) return;
        console.log(data.lrc.lyric.match(/\n/g));
      }
    }
  }
</script>

<style scoped>
  #Lyric{
    width:100%;
    height:100%;
    background-color: red;
  }
</style>
