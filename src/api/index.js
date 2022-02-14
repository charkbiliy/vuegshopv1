//包含应用中所有接口请求函数的模块
import ajax from "./ajax"
//nodeserver  "http://localhost:8888"


//根据经纬度获取位置详情 latitude,longitude 经度纬度
export const reqAddress = (geohash)=>{
    return ajax("/v1/position",{geohash})
}
//获取首页分类
export const reqFoodTypes = ()=>{
    return ajax("/v1/index_category")
}
//根据经纬度获取商铺列表
export const reqShops = (latitude,longitude)=>{
    return ajax("/v1/shops",{latitude,longitude})
}
export const reqSearchShops = (geohash,keyword)=>{
    return ajax("/v1/search_shops",{geohash,keyword})
}
//用户名密码登录
export const reqPwdLogin = (name,pwd,captcha)=>{
    return ajax("/v1/login_pwd",{name,pwd,captcha},"POST")
}
//发送短信验证码
export const reqSendCode = (phone)=>{ 
    return ajax("/v1/sendcode",{phone})
}
//手机验证码登录
export const reqSmsLogin = (phone,code)=>{
    return ajax("/v1/login_sms",{phone,code},"POST")
}
//根据会话获取用户信息
export const reqUserInfo = ()=>{
    return ajax("/v1/userinfo")
}
//用户登出
export const reqLogout = ()=>{
    return ajax("/v1/logout")
}

//mock模拟请求，不需要加v1，不通过代理服务器
/**
 * 获取商家信息
 */
 export const reqShopInfo = () => ajax('/info')
 /**
  * 获取商家评价数组
  */
 export const reqShopRating = () => ajax('/rating')
 /**
  * 获取商家商品数组
  */
 export const reqShopGoods = () => ajax('/goods')
 
 