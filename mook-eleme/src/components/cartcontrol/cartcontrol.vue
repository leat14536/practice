<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="desceaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    methods: {
      addCart (e) {
        if (!e._constructed) return;
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', e.target);
      },
      desceaseCart (e) {
        if (!e._constructed) return;
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/styles/icon-style";

  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      &.move-enter-active, .move-leave-active {
        transition: all 0.4s linear;
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.move-enter, .move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      color: rgb(147, 153, 159);

    }
    .cart-add {
      display: inline-block;
      font-size: 24px;
      padding: 6px;
      line-height: 24px;
      color: rgb(0, 160, 220)
    }
  }
</style>
