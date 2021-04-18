<template>
  <div>
    <van-nav-bar
        title="用户信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div>
      <van-cell is-link class="cell-title" @click="showPopup('password')">
        <template #title>
          <i class="bi bi-pencil-fill cell-title"></i>
          <span class="cell-title">密码修改</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-envelope-fill cell-title"></i>
          <span class="cell-title">邮箱绑定</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-chat-dots-fill cell-title"></i>
          <span class="cell-title">微信绑定</span>
        </template>
      </van-cell>
    </div>
    <div>
      <van-popup
          v-model="isShowPopup"
          position="bottom"
          :style="{ height: '40%' }"
          closeable
          close-icon="close"
          close-icon-position="top-right">
        <form>
          <div class="form-group mt-5 form-p">
            <label for="password1">旧密码</label>
            <input type="password" v-model="oldPassword" class="form-control" id="password1" aria-describedby="emailHelp">
          </div>
          <div class="form-group form-p">
            <label for="exampleInputPassword1">新密码</label>
            <input type="password" v-model="newPassword" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="button" class="btn btn-dark btn-block  mt-4 form-p" @click="submit">提交</button>
        </form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateSer",
  data(){
    return{
      isShowPopup: false,
      oldPassword:'',
      newPassword:'',
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push('/account')
    },
    showPopup(data){
      if (data==='password'){
        this.isShowPopup = true
      }
    },
    submit(){
      const data1 = JSON.stringify({
        new_password:this.newPassword,
        password:this.oldPassword,
      })
      axios({
        url:'/api/auth/pwd',
        method: 'put',
        headers:{
          Authorization:'Bearer ' + localStorage.getItem('myToken')
        },
        data:data1
      }).then((res)=> {
        if (res.data.code===0){
          this.$toast({
            type: 'success',
            message:'修改密码成功'
          })
          this.isShowPopup = false
        } else {
          this.$toast({
            type: 'fail',
            message:'修改失败,请重新输入'
          })
        }
        console.log(res.data)
      })
      this.newPassword = ''
      this.oldPassword = ''
      }
  }
}
</script>

<style scoped>
.cell-title{
  margin-top: 1rem;
  font-size:20px;
}
.bi{
  padding-right: 0.8rem;
}

.form-group,.btn{
  width: 80%;
}
.form-p{
  margin: 0 auto;
}
</style>
