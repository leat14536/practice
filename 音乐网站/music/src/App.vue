<template>
  <div id="app">
    <header class="header">
      <div class="logo">
        <span>在线音乐</span>
      </div>
      <div class="login">
        <a href="#">
          <span>登录</span>
        </a>
        <span>|</span>
        <a href="#">
          <span>注册</span>
        </a>
      </div>
      <span></span>
    </header>
    <container></container>
    <div class="music-panel">
      <span class="last-music"></span>
      <span class="play-music"></span>
      <span class="next-music"></span>
      <input type="range"  min="1" max="100" step="1" value="5">
      <span class="play-list">播放列表</span>
    </div>
  </div>
</template>

<script>
import Container from './components/container.vue'
export default {
  name: 'app',
  /*created(){
    this.getData();
  },*/
  data(){
    return {
      'music-list':null
    }
  },
  /*methods:{
    getData(){
      axios.get('http://localhost:3000')
        .then(res=>{
          this.$set(this.$data,'music-list',res.data)
        })
    },
    show(){
      console.log(this.$data);
    }
  },*/
  components: {
    Container
  }
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
    min-width:800px;
    min-height:600px;
    overflow: hidden;
  }
  .header{
    position: fixed;
    height:50px;
    width:100%;
    min-width: 300px;
    background-color: #c62f2f;
    color:#fff;
    z-index: 999;
  }
  .logo{
    float: left;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    margin-left:30px;
  }
  .login{
    float: right;
    line-height: 50px;
    margin-right: 30px;
  }
  .music-panel{
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
  }
</style>
