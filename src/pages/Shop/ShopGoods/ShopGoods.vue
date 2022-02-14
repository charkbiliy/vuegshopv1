<template>
    <div> 
        <div class="goods"> 
            <div class="menu-wrapper"> 
                <ul>
                    <li class="menu-item" v-for="(good,index) in goods" :key="index" 
                    :class="{current:currentIndex===index}"
                    @click="clickMenuItem(index)">
                        <span class="text bottom-border-1px"> 
                            <img class="icon" :src="good.icon" v-if="good.icon">
                            {{good.name}}
                        </span>
                    </li>
                </ul> 
            </div>
            <div class="foods-wrapper"> 
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(good,index) in goods" :key="index"> 
                        <h1 class="title">{{good.name}}</h1> 
                        <ul>
                            <li class="food-item bottom-border-1px" 
                            v-for="(food,index) in good.foods" 
                            :key="index" @click="showFood(food)"
                            > 
                                <div class="icon"> 
                                    <img width="57" height="57" :src="food.icon"> 
                                </div>
                                <div class="content"> 
                                    <h2 class="name">{{food.name}}</h2> 
                                    <p class="desc">{{food.description}}</p> 
                                    <div class="extra"> 
                                        <span class="count">月售{{food.sellCount}}份</span> 
                                        <span>好评率{{food.rating}}</span></div> 
                                    <div class="price"> 
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span> 
                                    </div> 
                                    <div class="cartcontrol-wrapper"> 
                                        <CartControl :food="food"/>
                                    </div> 
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul> 
            </div>
            <ShopCart />
        </div>
        <Food :food="food" ref="food"/>
    </div>

</template>

<script>
import {mapState} from "vuex"
import BScroll from "better-scroll"
import CartControl from "../../../components/CartControl/CartControl.vue"
import Food from "../../../components/Food/Food.vue"
import ShopCart from "../../../components/ShopCart/ShopCart.vue"

export default {
 components:{
     CartControl,
     Food,
     ShopCart
 },
 data () {
  return {
      scrollY:0,  //右侧滑动的Y轴坐标
      tops:[],     //所有右侧分类li的top组成的数组
      food:{}    //传给弹窗信息的food信息
    }
 },
 created(){

 },
 methods:{
     //初始化scroll,除了事件相关函数可以加个下划线区分
     _initScroll(){
         //列表显示后创建betterscrollfoods-wrapper
            new BScroll('.menu-wrapper',{
                click:true
            })
            this.foodsScroll =  new BScroll('.foods-wrapper',{
                probeType:2, //滑动触发频率，惯性滑动不会触发
               //probeType:3 //惯性滑动也会记录
               click:true
            })

            //右侧列表绑定scroll监听
            //直接使用this.foodsScroll将foodsScroll绑定到此vue实例对象上，方便其他函数调用
            this.foodsScroll.on('scroll',({x,y})=>{
                console.log(x,y)
                this.scrollY = Math.abs(y)
            })
            //由于惯性滑动不会更新srolly的值，可以增加一个scroll结束时的监听更新scrolly
            this.foodsScroll.on('scrollEnd',({x,y})=>{
                console.log(x,y)
                this.scrollY = Math.abs(y)
            })
     },
     //初始化tops标题
     _initTops(){
        const tops = []
        let top = 0
        tops.push(top)
        //找到所有分类的li
        //第一种写法
        //const lis  = this.$refs.foodsUl.children
        //第二种写法
        const lis  = this.$refs.foodsUl.getElementsByClassName("food-list-hook")
        //lis是伪数组,需要转换成真数组
        console.log(lis)
        Array.prototype.slice.call(lis).forEach(li => {
            top += li.clientHeight
            tops.push(top)
        });


        //更新数据
        this.tops = tops
        console.log(tops)
     },
     clickMenuItem(index){
        console.log(index)
         //左侧列表点击哪个右边就滑动到哪个区域,300是过度时间
        const y = this.tops[index]
        //因为左侧列表选中样式只有在右侧滑动动作完成后根据段东道德区域决定才能有高亮
        //所以在点击的时候直接改掉scrolly的值立刻选中变高亮,不需要等到右侧滑动scrollTo完成后
        this.scrollY = y
        this.foodsScroll.scrollTo(0,-y,300)
     },
     //弹窗food信息
     showFood(food){
         this.food = food
         //通过ref调用子组件的方法
         console.log(this.$refs.food)
         this.$refs.food.toggleShow()
    }
 },
 computed:{
     ...mapState(['goods']),
     //右侧滑动区域来决定左侧高亮选中currentIndex
    currentIndex(){
        //先得到条件数据
        const {scrollY,tops} = this
        //根据条件计算产生一个结果
        const index = tops.findIndex((top,index)=>{
            //当前滑动高度要大于等当前索引所在高度同时要小于下一个区域总高
            return scrollY>=top&&scrollY<tops[index+1]
        })
        //返回结果
        return index
    },
 },
 mounted(){
     //传一个callback函数，当action获得数据后通知组件更新
    this.$store.dispatch("getShopGoods",()=>{
        //列表数据更新显示后
        this.$nextTick(()=>{
            this._initScroll()
            this._initTops()
        })
 })
 
}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixin.styl"
.goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background #f3f5f7
      height 100%
      overflow hidden
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
            span
                display: inline-block
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
