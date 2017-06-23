<template>
  <div id="app">
    <v-headers :seller="seller"></v-headers>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" class="tab-btn">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-btn">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-btn">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import headers from './components/header/headers';

  const ERR_OK = 0;

  export default{
    name: 'app',
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http({
        url: '/seller',
        success (data) {
          if (data.errno === ERR_OK) {
            this.seller = data.data;
          }
        },
        ctx: this
      });
    },
    components: {
      'v-headers': headers
    }
  };
</script>

<style lang="scss">
  //@import "./common/styles/index.scss";
  @import "./common/styles/mixin.scss";

  #app {
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .tab-item {
        flex: 1;
        text-align: center;
        .tab-btn {
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          &.router-link-active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }


</style>
