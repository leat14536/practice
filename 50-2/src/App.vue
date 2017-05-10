<template>
  <div id="app">
    <header class="header">
      <nav class="header-container">
        <div class="theme">问卷管理</div>
        <a href="" class="myQuestionnaires">我的问卷</a>
      </nav>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  header, div, nav, span, table, thead, tbody, th, tr, td, nav, input, label, body, html, h1, h2, h3, h4, h5, h6{
    padding:0;
    margin:0;
  }

  a{
    text-decoration: none;
  }

  body, html{
    height:100%;
  }

  .header{
    width:100%;
    height:50px;
    line-height: 50px;
    background-color:#ee7419;
    color:#fff;
  }

  .theme{
    font-weight: bold;
    float:left;
    margin-left:20px;
    padding:0 15px;
  }

  .myQuestionnaires{
    float:left;
    color:#fff;
    padding:0 15px;
  }

  .container{
    width:100%;
    height:100%;
    background-color:#efefef;
    padding-top:50px;
  }


  .thead th{
    border-bottom:2px solid #ccc;
    border-left:none;
    border-right:none;
    padding:8px;
  }

  #app{
    width:100%;
    height:100%;
  }

</style>
