<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!-- 点击有表单默认事件需要阻止冒泡 -->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"/>
              <button :disabled="!phoneCheck" class="get_verification" 
              :class="{right_phone: phoneCheck}"
              @click.prevent="getCode">
                {{computedTime>0?`已发送(${computedTime})`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  v-model="name"
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPasswd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button off" :class="showPasswd?'on':'off'" @click="showPasswd=!showPasswd">
                  <div class="switch_circle" :class="{right:showPasswd}"></div>
                  <span class="switch_text">{{showPasswd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:8888/user/getcaptcha"
                  alt="captcha"
                  @click="changeCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goback">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeAlert"></AlertTip>
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue"
import {reqSendCode,reqSmsLogin,reqPwdLogin} from "../../api"
export default {
    components:{
      AlertTip
    },
    data(){
        return{
          loginWay:true, //true为短信登录，false为密码登录
          phone:"",
          computedTime:0,  //验证码倒计时
          showPasswd:false, //是否显示密码
          pwd:"", //密码
          code:"", //短信验证码
          name:"",  //用户名
          captcha:"",  //图形验证码
          alertText:"1111", //提示文本
          alertShow:false, //是否提示警示框
          intervalid:""
        }
    },
    methods:{
        goback(){
            this.$router.back()
        },
        async getCode(){
          //启动倒计时
          if(!this.computedTime){
            this.computedTime = 30
            this.intervalid = setInterval(() => {
            this.computedTime>0?this.computedTime--:clearInterval(this.intervalid)
          }, 1000);
          //发送ajax请求（向指定手机号发送验证码
          const result = await reqSendCode(this.phone)
          console.log(result)
          //
          if(result.data.code==1){
            //显示提示
            this.showAlert(result.data.msg)
            //停止计时
            if(this.computedTime){
              this.computedTime=0
              clearInterval(this.intervalid)
            }
          }
          }
        },
        //封装提示函数
        showAlert(alertext){
          this.alertShow = true
          this.alertText = alertext
        },
        closeAlert(){
          this.alertShow = false
          this.alertText = ''
        },
        async login(){
          let result
          //收集表单数据
          if(this.loginWay){
            //短信登录
            const {phone,code} = this
            //检查手机格式是否正确
            if(!this.phoneCheck){
                this.showAlert("手机格式不正确")
                return
            }else if(!/^\d{6}$/.test(code)){
              //短信验证码必须输入
              this.showAlert("验证码不正确")
              return
            }
            //短信登录ajax请求
            result = await reqSmsLogin(phone,code)
            
          }else{
            //密码登录
            const {name,captcha,pwd} = this
            if(!name){
              //用户名必须输入
              this.showAlert("用户名不正确")
              return
            }else if(!pwd){
              //密码必须输入  
              this.showAlert("密码不正确")
              return
            }else if(!captcha){
              //验证码必须输入
              console.log(captcha)
              this.showAlert("验证码不正确")
              return
            }
            //发送密码登录请求
            result = await reqPwdLogin(name,pwd,captcha)
          }
            //清除计时器
            if(this.computedTime){
              this.computedTime=0
              clearInterval(this.intervalid)
            }
            //统一处理请求结果
            if(result.data.code === 0){
              const user = result.data.data
              console.log(user)
              //讲user保存到vuex中
              this.$store.dispatch("recordUser",user)
              //跳转页面
              this.$router.replace("/profile")
            }else{
              const msg = result.data.msg
              //先是警告
              this.showAlert(msg)
              //刷新验证码
              this.changeCaptcha()
            }
        },
          //changeCaptcha(event){
          //event.target.src="http://localhost:8888/user/getcaptcha?time="+Date.now()
          changeCaptcha(){
          this.$refs.captcha.src="http://localhost:8888/user/getcaptcha?time="+Date.now()
        }
    },
    computed:{
      phoneCheck(){
          // let res = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/.test(this.phone)
          // console.log(this.phone)
          return /^1\d{10}$/.test(this.phone)
        }
    }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center
        >a
            display inline-block
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
                margin-right 40px
            &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774

    .login_content
      >form
        >div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            >a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      >.iconfont
        font-size 20px
        color #999
</style>