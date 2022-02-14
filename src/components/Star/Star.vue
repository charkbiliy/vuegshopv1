<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc,index) in starClass" :key="index" :class="sc"></span>
  </div>
</template>

<script>
const CLASS_ON = "on"
const CLASS_OFF = "off"
const CLASS_HALF = "half"
export default {
  props: {
    score: Number,
    size: Number,
  },
  data() {
    return {
      
    };
  },
  computed:{
      //3.2 三个黄星，0个半星，两个黑星
      //3.6 三个黄星，一个半星，一个黑星
      starClass(){
          const {score} = this
          //向scs中添加n个on，off,half
          const scs = []
          //整数部分
          const scoreInteger = Math.floor(score)
          for(let i = 0 ;i <scoreInteger;i++){
              scs.push(CLASS_ON)
          }
        //半星部分
        if(score*10-scoreInteger*10>=5){
            scs.push(CLASS_HALF)
        }
        while(scs.length<5){
            scs.push(CLASS_OFF)
        }
        console.log(scs)
        return scs
      }
      
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.star // 2x图 3x图
        float left
        font-size 0
        .star-item
            display inline-block
            background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
              margin-right 0
            &.on
                bg-image('./stars/star48_on')
            &.half
                bg-image('./stars/star48_half')
            &.off
                bg-image('./stars/star48_on')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('./stars/star36_on')
            &.half
                bg-image('./stars/star36_half')
            &.off
                bg-image('./stars/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('./stars/star24_on')
            &.half
                bg-image('./stars/star24_half')
            &.off
                bg-image('./stars/star24_off')
</style>