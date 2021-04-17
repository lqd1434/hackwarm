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
            <input type="password" class="form-control" id="password1" aria-describedby="emailHelp">
          </div>
          <div class="form-group form-p">
            <label for="exampleInputPassword1">新密码</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="button" class="btn btn-dark btn-block  mt-4 form-p" @click="submit">提交</button>
        </form>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateSer",
  data(){
    return{
      isShowPopup: false
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
      console.log('submit')
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
