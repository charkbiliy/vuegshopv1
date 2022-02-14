//通过mutation间接更新state的对象
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,
    RECEIVE_GOODS,RECEIVE_RATING,RECEIVE_INFO,
    DECREMENT_FOOD_COUNT,
    INCREMENT_FOOD_COUNT
  } from "./mutation-types"
import {reqAddress,reqFoodTypes,reqShops,reqUserInfo,reqLogout,
  reqShopRating,
  reqShopGoods,
  reqShopInfo} from "../api"

export default {
    //异步获取地址，context后面根据实际需求跟参数
    async getAddress(context){
    // latitude:40.10038, //纬度
    // longitude:116.36867, //经度
        let geohash = context.state.latitude + "," + context.state.longitude
        //发送ajax请求
        let res = await reqAddress(geohash)
        //console.log(res)
        if(res.data.code === 0){
            const address = res.data.data
            context.commit(RECEIVE_ADDRESS,{address})
        }
    },
    //异步获取食品分类
    async getCategorys(context){
            //发送ajax请求
            let res = await reqFoodTypes()
            //console.log(res)
            if(res.data.code === 0){
                const categorys = res.data.data
                context.commit(RECEIVE_CATEGORYS,categorys)
            }
    },
    //获取店铺地址
    async getShops(context){
        // latitude:40.10038, //纬度
        // longitude:116.36867, //经度
        //发送ajax请求
        const {latitude,longitude} = context.state
        let res = await reqShops(longitude,latitude)
        //console.log(res)
        if(res.data.code === 0){
            const shops = res.data.data
            context.commit(RECEIVE_SHOPS,{shops})
        }
    },
    //同步记录用户信息
    recordUser(context,userInfo){
        context.commit(RECEIVE_USER_INFO,userInfo)
    },

    //获取已登录用户信息
    async getUserInfo(context){
        const result = await reqUserInfo()
        console.log("用户信息获取",result.data)
        if(result.data.code===0){
            const userInfo = result.data.data
            console.log(userInfo)
            context.commit(RECEIVE_USER_INFO,userInfo)
        }
    },

    //退出登录
    async logout(context){
        const result = await reqLogout()
        console.log("用户已退出",result.data)
        if(result.data.code===0){
            context.commit(RESET_USER_INFO)
        }
    },
     // 异步获取商家信息
    async getShopInfo(context) {
      const result = await reqShopInfo()
      if (result.data.code === 0) {
        const info = result.data.data
        console.log("info",info)
        context.commit(RECEIVE_INFO, {info})
      }
    },

    // 异步获取商家评价列表
    async getShopRatings({commit}) {
      const result = await reqShopRating()
      console.log(result)
      if (result.data.code === 0) {
        const rating = result.data.data
        commit(RECEIVE_RATING, {rating})
        // 数据更新了, 通知一下组件
        //callback && callback()
      }
    },

    // 异步获取商家商品列表
    async getShopGoods({commit},callback) {
      const result = await reqShopGoods()
      console.log(result)
      if (result.data.code === 0) {
        const goods = result.data.data
        commit(RECEIVE_GOODS, {goods})
        // 数据更新了, 通知一下组件，只有传callback函数参数时才执行，没传就不需要执行
        callback && callback()
      }
    },

     // 同步更新food中的count值
    updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
      console.log("add")
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

}