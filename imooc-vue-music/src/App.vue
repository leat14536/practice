<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'components/header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    name: 'app',
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="scss">
  @import './common/styles/variable.scss';

  #app {
    color: $color-theme;
  }
</style>
