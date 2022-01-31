//包含应用中所有接口请求函数的模块
import ajax from "./ajax"
//nodeserver  "http://localhost:8888"


//根据经纬度获取位置详情 latitude,longitude 经度纬度
export const reqAddress = (str)=>{
    return ajax("/v1/position",{str})
}
//获取首页分类
export const reqCategory = (str)=>{
    return ajax("/v1/index_category",{str})
}
//根据经纬度获取商铺列表
export const reqAddress = (str)=>{
    return ajax("/v1/shops",{str})
}
