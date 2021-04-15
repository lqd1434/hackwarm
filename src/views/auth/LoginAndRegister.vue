<template>
  <div class="root">
    <div v-if="!isShowStartWin">
<!--      登录窗口-->
      <div v-if="isShowLogin">
        <div class="login">
          <div style="background-color: white;display: block;height: 5rem"></div>
          <i class="bi bi-reply-fill p-1 ml-5" @click="back('toStartWin')"></i>
          <h4 style="text-align: center" class="logo-text animate__animated animate__fadeInUp">欢迎来到U&nbsp;&nbsp;&nbsp;share</h4>
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
            <input type="text" v-model.trim="password" class="form-control" placeholder="请输入登录密码" aria-describedby="login-wrapping2">
          </div>
        </div>
        <div class="another-op row no-gutters">
          <div class="col-2"></div>
          <div class="register-en col-2 align-self-start pl-1" @click="enter('register')">注册账号</div>
          <div class="col-4"></div>
          <div class="getPawBack-en col-2 align-self-end pr-1" @click="enter('forgotPaw')">忘记密码</div>
          <div class="col-2"></div>
        </div>
        <button type="button" class="btn btn-block btn-lg animate__animated animate__fadeInUp" @click="doLogin">登录</button>
        <div class="an-icon-group animate__animated animate__fadeInUp">
          <van-icon name="wechat" class="an-icon a1"/>
          <van-icon name="alipay" class="an-icon a2"/>
        </div>
      </div>
<!--      找回密码-->
<!--      -->
      <div v-if="isShowForgot">
        <div style="background-color: white;display: block;height: 2rem"></div>
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
        <div style="background-color: white;display: block;height: 2rem"></div>
        <i class="bi bi-reply-fill p-1 ml-3" @click="back('toLogin')"></i>
        <div class="input-group animate__animated animate__fadeInUp forgot-view">
          <div class="input-group-prepend">
            <span class="input-group-text bi bi-phone" id="register-wrapping1"></span>
          </div>
          <input type="text" v-model.trim="telephone" ref="input" class="form-control" placeholder="请输入手机号码" aria-describedby="register-wrapping1">
        </div>
        <div class="input-group animate__animated animate__fadeInUp">
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
<!--        确认密码-->
        <div v-if="isShowEnsure">
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-shield-lock" id="ensure-wrapping1"></span>
            </div>
            <input type="text" v-model.trim="password" class="form-control" placeholder="请输入登录密码" aria-describedby="ensure-wrapping1">
          </div>
          <div class="input-group animate__animated animate__fadeInUp">
            <div class="input-group-prepend">
              <span class="input-group-text bi bi-shield-lock-fill" id="ensure-wrapping2"></span>
            </div>
            <input type="text" v-model.trim="ensurePassword" class="form-control" placeholder="请确认登录密码" aria-describedby="ensure-wrapping2">
          </div>
        </div>
        <button type="button" class="btn btn-block btn-lg animate__animated animate__fadeInUp mt-2 text-white" @click="verify(isVerified)">{{ submitText }}</button>
      </div>
    </div>
<!--    logo窗口-->
<!--      -->
    <div v-if="isShowStartWin" class="start-win">
      <van-image
          width="10rem"
          height="10rem"
          fit="cover"
          class="start-icon animate__animated animate__fadeInDown"
          src="/images/start.png"
      />
      <van-image
          width="3rem"
          height="3rem"
          fit="cover"
          class="logo animate__animated animate__backInRight"
          src="/images/logo.jpg"
      />
      <i class="bi bi-arrow-right-circle-fill arrow animate__animated animate__fadeInLeft" @click="enter('login')"></i>
    </div>
  </div>
</template>

<script>
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
    verify(data){
      if (data){
        console.log('注册并登录')
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
          console.log('登录')
          console.log(this.telephone)
          console.log(this.password)
          localStorage.setItem('isLogin','true')
          this.$router.push('/')
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
  color: black;
  margin-top: 50px;
  margin-bottom: 50px;
}
.bi{
  font-size: 22px;
}
.bi-reply-fill{
  background-color: #F5F5F5;
  border-radius: 50%;
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
  background-color: black;
}
.start-icon{
  display: block;
  margin: 6rem 0 auto!important;
  margin-left: 7.5rem!important;
}
.logo{
  display: block;
  margin-left: 11rem;
}
.arrow{
  display: block;
  margin-left: 11.2rem;
  margin-top: 4rem;
  font-size: 2.5rem;
  color: #E83434;
}
.forgot-view{
  margin-top: 3rem;
}
</style>
