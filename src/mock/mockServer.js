//使用mock,模拟请求数据接口

import Mock from "mockjs"
import data from "./data.json"


//返回goods的接口
Mock.mock("/goods",{code:0,data:data.goods})
//返回rating的接口
Mock.mock("/info",{code:0,data:data.info})
//返回info的接口
Mock.mock("/rating",{code:0,data:data.ratings})

//不需要export，像css一样