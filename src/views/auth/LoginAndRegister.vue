<template>
  <div class="root">
    <div v-if="!isShowStartWin">
<!--      登录窗口-->
      <div v-if="isShowLogin">
        <div class="login">
          <i class="bi bi-reply-fill p-1 ml-4 mt-1" @click="back('toStartWin')"></i>
            <van-image
                class="bg-login animate__animated animate__fadeInUp"
                width="20rem"
                fit="cover"
                src="/images/bg-login.png"
            />
          <div class="login-title">
            <h4 style="text-align: center" class="logo-text animate__animated animate__fadeInUp">欢迎来到U&nbsp;&nbsp;&nbsp;tree</h4>
          </div>
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-phone" id="login-wrapping1"></span>
            </div>
            <input type="text" v-model.trim="telephone" ref="input" class="form-control" placeholder="请输入手机号码" aria-describedby="login-wrapping1">
          </div>
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-shield-lock" id="login-wrapping2"></span>
            </div>
            <input type="password" v-model.trim="password" class="form-control" placeholder="请输入登录密码" aria-describedby="login-wrapping2">
          </div>
        </div>
        <div class="another-op row no-gutters">
          <div class="col-2"></div>
          <div class="register-en col-3 align-self-start pl-1" @click="enter('register')">注册账号</div>
          <div class="col-3"></div>
          <div class="getPawBack-en col-3 align-self-end pr-1" @click="enter('forgotPaw')">忘记密码</div>
          <div class="col-2"></div>
        </div>
        <button type="button" class="btn btn-block login-btn btn-lg animate__animated animate__fadeInUp" @click="doLogin">登录</button>
        <div class="an-icon-group animate__animated animate__fadeInUp">
          <van-icon name="wechat" class="an-icon a1"/>
          <van-icon name="alipay" class="an-icon a2"/>
        </div>
      </div>
<!--      找回密码-->
<!--      -->
      <div v-if="isShowForgot">
        <h2 class="text-center mb-0 mt-2">找回密码</h2>
        <i class="bi bi-reply-fill p-1 ml-3" @click="back('toLogin')"></i>
        <div class="input-group animate__animated animate__fadeInUp forgot-view">
          <div class="input-group-prepend">
            <span class="input-group-text bi bi-phone" id="forgot-wrapping1"></span>
          </div>
          <input type="text" v-model.trim="telephone" ref="input" class="form-control" placeholder="请输入手机号码" aria-describedby="forgot-wrapping1">
        </div>

        <div class="input-group animate__animated animate__fadeInUp">
          <input type="text" class="form-control forgot-ver" placeholder="请输入验证码" aria-describedby="forgot-append">
          <div class="input-group-append">
            <div class="input-group-text" id="forgot-append">
              <span @click="sendVerifyCode">发送验证码</span>
              <van-count-down
                  style="color: white;padding-left: 0.2rem"
                  v-if="isShowCountDown"
                  ref="countDown"
                  :time="60000"
                  :auto-start="false"
                  format="ss"
              />
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-block btn-lg animate__animated animate__fadeInUp mt-2" @click="doLogin">提交</button>
      </div>
    </div>
<!--    注册窗口-->
    <div class="register" v-if="isShowRegister">
      <div>
        <h2 class="text-center mb-0 mt-2">注册账号</h2>
        <i class="bi bi-reply-fill p-1 ml-3" @click="back('toLogin')"></i>
        <div class="input-group animate__animated animate__fadeInUp forgot-view">
          <div class="input-group-prepend">
            <span class="input-group-text bi bi-phone" id="register-wrapping1"></span>
          </div>
          <input type="text" v-model.trim="telephone" ref="input" class="form-control" placeholder="请输入手机号码" aria-describedby="register-wrapping1">
        </div>
        <div class="input-group form-group animate__animated animate__fadeInUp">
          <input type="text" v-model="verifiedCode" class="form-control forgot-ver"  placeholder="请输入验证码" aria-describedby="register-addon">
          <div class="input-group-append">
            <div class="input-group-text" id="register-addon">
              <span @click="sendVerifyCode">发送验证码</span>
              <van-count-down
                  style="color: white;padding-left: 0.2rem"
                  v-if="isShowCountDown"
                  ref="countDown"
                  :time="60000"
                  :auto-start="false"
                  format="ss"
              />
            </div>
          </div>
        </div>
        <small id="emailHelp" class="form-text text-muted">短信服务暂未申请成功,默认验证码123456</small>
        <!--        确认密码-->
        <div v-if="isShowEnsure">
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-shield-lock" id="ensure-wrapping1"></span>
            </div>
            <input type="password" v-model.trim="password" class="form-control" placeholder="请输入登录密码" aria-describedby="ensure-wrapping1">
          </div>
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-shield-lock-fill" id="ensure-wrapping2"></span>
            </div>
            <input type="password" v-model.trim="ensurePassword" @blur="ensure" class="form-control" placeholder="请确认登录密码" aria-describedby="ensure-wrapping2">
          </div>
        </div>
        <button type="button" class="btn btn-block btn-lg animate__animated animate__fadeInUp mt-2 text-white" @click="verify(isVerified)">{{ submitText }}</button>
      </div>
    </div>
<!--    logo窗口-->
<!--      -->
    <div v-if="isShowStartWin" class="start-win">
      <i class="bi bi-arrow-right-circle-fill arrow animate__animated animate__fadeInLeft" @click="enter('login')"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {createNamespacedHelpers} from 'vuex'
const { mapMutations,mapActions } = createNamespacedHelpers('warm')
export default {
  name: "LoginAndRegister",
  data(){
    return{
      isVerified: false,
      isShowCountDown: false,
      isShowEnsure: false,

      isShowStartWin: false,
      isShowLogin: false,
      isShowForgot: false,
      isShowRegister: false,

      internal: '',
      submitText: '验证',

      telephone: '',
      password: '',
      ensurePassword: '',
      verifiedCode: '',
      receiveVerifiedCode: '123456',

    }
  },
  mounted() {
    this.isShowForgot = false
    this.isShowRegister = false
    this.isShowLogin = false
    this.isShowStartWin = true
},
  methods:{
    ...mapMutations(['setUserInfo']),
    ...mapActions(['getUserInfo']),
    enter(data){
      this.isShowStartWin = false
      this.isShowLogin = false
      this.isShowForgot = false
      this.isShowRegister = false
      if(data==='login'){
        this.isShowLogin = true
      } else if(data==='register'){
        this.isShowRegister = true
      } else if(data==='forgotPaw'){
        this.isShowForgot = true
      }
    },
    back(data){
      this.isVerified = false
      this.isShowEnsure = false
      this.isShowCountDown = false
      this.isShowStartWin = false
      this.isShowLogin = false
      this.isShowForgot = false
      this.isShowRegister = false
      if (data==='toLogin'){
        this.isShowLogin = true
      } else {
        this.isShowStartWin = true
      }
      if (this.internal){
        clearInterval(this.internal)
      }
    },
    sendVerifyCode(){
      if (this.telephone.length!==11){
        this.$refs.input.className= 'form-control'
        this.$toast({
          type: 'fail',
          message:'手机号格式错误'
        })
      } else{
        this.isShowCountDown = true
        setTimeout(()=>{
          this.$refs.countDown.start()
        },300)
        this.internal=setInterval(()=>{
          this.isShowCountDown = false
        },60000)
        this.$refs.input.className= 'form-control is-valid'
        this.$toast({
          type: 'success',
          message:'已发送验证码,请注意查收'
        })
      }
    },
    ensure(){
      if (this.ensurePassword!==this.password){
        this.$toast({
          message: '两次输入的密码不一致',
          icon: 'cross',
          type: 'fail',
        })
        this.ensurePassword = ''
      }
    },
    verify(data){
      if (data){
        const data1 = JSON.stringify({
          telephone:this.telephone,
          password:this.password
        })
        console.log(data1)
        axios({
          url:'/api/register',
          method:'post',
          data:data1
        }).then((res)=>{
          if (res.data.code===0){
            this.doLogin()
          } else {
            this.$toast({
              type: 'fail',
              message:res.data.msg
            })
          }
          console.log(res)
        })
      } else {
        if (this.verifiedCode === this.receiveVerifiedCode){
          this.isShowEnsure = true
          this.submitText = "登录"
          this.isVerified = true
          this.$toast({
            type: 'success',
            message:'验证成功,请设置密码'
          })
        } else{
          this.$toast({
            type: 'fail',
            message:'验证码错误,请重新输入'
          })
        }
      }
    },
    doLogin(){
      if (this.telephone){
        if (this.telephone.length === 11){
          const data1 = JSON.stringify({
            password:this.password,
            telephone:this.telephone,
          })
          axios({
            url: '/api/login',
            method: 'post',
            data: data1
          }).then((res)=>{
            if (res.data.code === 0){
              localStorage.setItem('isLogin','true')
              localStorage.setItem('myToken',res.data.data.token)
              this.getUserInfo(res.data.data.id).then(()=>{
                this.$router.push('/')
              })
            } else {
              this.$toast({
                type: 'fail',
                message:res.data.msg
              })
            }
          })
        } else {
          this.$toast({
            type: 'fail',
            message:'手机号格式错误'
          })
        }
      } else {
        this.$toast({
          type: 'fail',
          message:'手机号不能为空'
        })
      }
    },
  }
}
</script>

<style scoped>
.root{
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
}
.logo-text{
  margin-top: -10rem;
  margin-bottom: 7rem;
  color: black;
}
.bi{
  font-size: 22px;
}
.bi-reply-fill{
  position: absolute;
  font-size: 22px;
}
.bg-login{
  display: block;
  margin: 3rem auto;
}
.input-group{
  margin: 1rem auto;
  width: 70%;
  height: 3.5rem;
  border-radius:25px!important;
  background-color: #F5F5F5!important;
  padding-bottom: 10px!important;
  padding-top: 10px!important;
}
#login-wrapping1,#login-wrapping2,#forgot-wrapping1,#register-wrapping1,#ensure-wrapping1,#ensure-wrapping2{
  color: #000000;
  border: 0!important;
  background-color: #F5F5F5!important;
  border-radius: 20px 0 0 20px!important;
}
#forgot-append,#register-addon{
  border: 0!important;
  border-radius: 20px 20px 20px 20px!important;
  background-color: #000000;
  color: white;
  font-size: 0.8rem;
}
.text-muted{
  padding-left: 20%;
}
.form-control{
  border: 0!important;
  border-left: #D1D1D1 1px solid !important;;
  background-color: #F5F5F5!important;
  border-radius: 0 20px 20px 0!important;
}
.form-control:focus{
  box-shadow: none!important;
}
.register-en,.getPawBack-en{
  color: #D1D1D1;
  font-size: 15px;
}
.forgot-ver{
  border: 0!important;
  background-color: #F5F5F5!important;
  border-radius: 20px 0 0 20px!important;
}
.btn-block{
  width: 70%;
  margin: 1rem auto;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 15px;
  border-radius: 25px;
  background-color: black;
}
.login-btn{
  background-color: #FE6830;
}
.an-icon-group{
  text-align: center;
}
.an-icon{
  margin-top: 10px;
  font-size: 25px;
}
.a1{
  padding-right: 20px;
  border-right: #bbbbbb 1px solid;
}
.a2{
  padding-left: 20px;
}
.start-win{
  display: block;
  width: 100%;
  min-height: 800px;
  overflow: hidden;
  background:url("/images/start-bg.png");
}
.arrow{
  /*display: block;*/
  position: absolute;
  float: bottom;
  bottom: 0;
  padding-left: 43%;
  padding-bottom: 20%;
  /*padding-left: 49%;*/
  /*padding-top: 140%;*/
  font-size: 2.5rem;
  color: #1fc39e;
}
.forgot-view{
  margin-top: 3rem;
}
</style>
