<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive"
            @click="select(2,$event)"
            :class="{active:selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive"
            @click="select(0,$event)"
            :class="{active:selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative"
            @click="select(1,$event)"
            :class="{active:selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle" @click="toggleContent($event)"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITY = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      onlyContent: Boolean
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITY;
        });
      }
    },
    methods: {
      select (type, e) {
        if (!e._constructed) return;
        this.$emit('ratingtype-select', type);
      },
      toggleContent (e) {
        if (!e._constructed) return;
        this.$emit('onlyContent-toggle', !this.onlyContent);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/styles/icon-style";
  @import "../../common/styles/mixin";

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        line-height: 16px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        &.active {
          color: #fff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
</style>
