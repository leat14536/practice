<template>
  <transition name="slide">
    <musiclist :title="title" :bgImage="bgImage"></musiclist>
  </transition>
</template>

<script>
  import Musiclist from 'components/musiclist/musiclist'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    components: {
      Musiclist
    }
  }
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
