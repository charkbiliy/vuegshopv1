<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper class="swiper" :auto-update="true" ref="mySwiper" :options="swiperOptions" v-if="caregorysArr.length">
        <swiper-slide class="swiper-slide" v-for="(categorys,index) in caregorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
            <div class="food_container">
              <img :src="imgbaseurl+category.image_url" />
            </div>
            <span>{{category.title}}</span>
          </a>
        </swiper-slide>
        <!-- <swiper-slide class="swiper-slide" >
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/1.jpg" />
            </div>
            <span>甜品饮品</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/2.jpg" />
            </div>
            <span>商超便利</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/3.jpg" />
            </div>
            <span>美食</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/4.jpg" />
            </div>
            <span>简餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/5.jpg" />
            </div>
            <span>新店特惠</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/6.jpg" />
            </div>
            <span>准时达</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/7.jpg" />
            </div>
            <span>预订早餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/8.jpg" />
            </div>
            <span>土豪推荐</span>
          </a>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/9.jpg" />
            </div>
            <span>甜品饮品</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/10.jpg" />
            </div>
            <span>商超便利</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/11.jpg" />
            </div>
            <span>美食</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/12.jpg" />
            </div>
            <span>简餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/13.jpg" />
            </div>
            <span>新店特惠</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/14.jpg" />
            </div>
            <span>准时达</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/1.jpg" />
            </div>
            <span>预订早餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/nav/2.jpg" />
            </div>
            <span>土豪推荐</span>
          </a>
        </swiper-slide> -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 设置前后按钮
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div> -->
      </swiper>
      <!-- <swiper
        class="swiper"
        :options="swiperOptions"
      >
        <swiper-slide class="swiper-slide">Slide 1</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 2</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 3</swiper-slide>
        <swiper-slide class="swiper-slide">Slide 4</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>-->
    <img src="../../assets/svgicon/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
// import Swiper, {
//   Autoplay,
//   Pagination,
//   Navigation,
// } from "swiper";
// Swiper.use([Autoplay, Pagination, Navigation]);
import {mapState} from 'vuex'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay,Navigation } from 'swiper/js/swiper.esm'
//import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/core'
SwiperClass.use([Pagination, Mousewheel, Autoplay,Navigation])
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

import ShopList from "../../components/ShopList/ShopList"
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
export default {
  components: {
    HeaderTop,
    Swiper,
    SwiperSlide,
    ShopList
  },
  methods: {
    onSwiper () {

    },
    onSlideChange () {

    }
  },
  data() {
    return {
      titlename: '',
      imgbaseurl:'https://fuss10.elemecdn.com',
      swiperOptions: {
        slidesPerView: 1,
        // 设置分页器
        pagination: {
          el: '.swiper-pagination',
          // 设置点击可切换
        },
        // // 设置前进后退按钮
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        // 设置自动轮播
        // autoplay: {
        //   delay: 1000, // 5秒切换一次
        //   disableOnInteraction: false
        // },
        // 设置轮播可循环
        //loop: true
      }
    };
  },
  computed: {
    //异步调用地址
    ...mapState(['address','categorys','shops','userInfo']),
    //每个swiper有八个分类,根据categorys一维数组生成一个二维数组
    caregorysArr(){
      const {categorys} = this
      //准备一个空的二维数组
      const arr = []
      let minArr  = []
      //遍历categoyrs
      categorys.forEach(item => {
        if(minArr.length===8){
          minArr = []
        }
        if(minArr.length ===0){
          arr.push(minArr)
        }
        minArr.push(item)

      })
      return arr
    }
    },
  created() {},
  mounted(){
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
    console.log('state:',this.$store.state)
  },
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.msite
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper
      width 100%
      height 100%

      .swiper-slide
        width 100%
        height 100%
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap

        .link_to_food
          width 25%

          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0

            img
              display inline-block
              width 50px
              height 50px

          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666

      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774

  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .shop_header
      padding 10px 10px 0

      .shop_icon
        margin-left 5px
        color #999

      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
