<template>
  <div class="headers">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src=seller.avatar>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headers',
    props: {
      seller: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data () {
      return {};
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../common/styles/mixin";
  @import "../../common/styles/icon-style";

  .headers {
    color: #fff;
    background-color: #ccc;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        vertical-align: top;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
            vertical-align: top;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: sub;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('decrease_1')
            }
            &.discount {
              @include bg-image('discount_1')
            }
            &.guarantee {
              @include bg-image('guarantee_1')
            }
            &.invoice {
              @include bg-image('invoice_1')
            }
            &.special {
              @include bg-image('special_1')
            }
          }
          .text {
            font-size:10px;
            line-height: 24px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom:18px;
        padding:0 8px;
        height:24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          vertical-align: top;
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          margin-left:2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
  }
</style>
