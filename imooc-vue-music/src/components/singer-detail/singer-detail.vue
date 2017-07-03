<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'singer-detail',
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log(this.singer)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/styles/variable.scss';

  .singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-top {
    transform: translate3d(100%, 0, 0);
  }
</style>
