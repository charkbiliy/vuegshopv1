//直接更新state的对象
import Vue from "vue"
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,
    RECEIVE_USER_INFO,RESET_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_RATING,
    RECEIVE_GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT
} from "./mutation-types"
export default {
    //action穿的address参数是一个对象使用解构赋值拿到address值，下面同理
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
        
    },
    [RECEIVE_CATEGORYS](state,categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state,userInfo){
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state){
        state.userInfo = {}
    },
    //mock模拟请求数据
    [RECEIVE_INFO](state, {info}) {
        console.log("商家信息",info)
        state.info = info
    },
    
    [RECEIVE_RATING](state, {rating}) {
        state.ratings = rating
    },
    
    [RECEIVE_GOODS](state, {goods}) {
        console.log("商品列",goods)
        state.goods = goods
    },

    [INCREMENT_FOOD_COUNT](state, {food}) {
        //console.log(this)
        if(!food.count){
            console.log(food)
            //给food增加新的属性count
            Vue.set(food,'count',1)
            //添加购物车里商品（只有第一次才会添加）
            state.cartFoods.push(food)
        }else{
            food.count++
        }
    
    },

    [DECREMENT_FOOD_COUNT](state, {food}) {
        
        if(food.count) {// 只有有值才去减
          food.count--
          //购物车中
          if(food.count===0) {
            // 将food从cartFoods中移除
            state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
          }
        }
      },
}