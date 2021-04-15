<template>
  <div>
    <van-nav-bar
        title="修改资料"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div style="text-align:center ">
      <p >头像</p>
      <van-uploader
          v-model="fileList"
          image-fit="cover"
          max-count="1"
          :before-read="beforeRead"
      />
    </div>

    <van-cell-group style="margin-top: 30px">
      <van-field v-model.trim="changedUserInfo.username" label="用户名" type="text" placeholder="请输入用户名" />
      <van-field v-model.trim="changedUserInfo.password" label="密码" type="password" placeholder="请输入密码" />
      <van-field v-model.trim="ensurePassword" @blur="ensure" label="确认密码" type="password" placeholder="请输入密码" />
      <van-field
          v-model.trim="changedUserInfo.mySign"
          rows="3"
          :autosize="true"
          label="我的个性签名"
          type="textarea"
          maxlength="100"
          placeholder="请输入我的签名"
          show-word-limit
      />
    </van-cell-group>
    <van-button type="primary" @click="submit" block>提交</van-button>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapState } = createNamespacedHelpers('warm')
export default {
  name: "UpdateInfo",
  data(){
    return{
      changedUserInfo: {id: 0,username:'',password:'',mySign:''},
      ensurePassword: '',
      fileList: []
    }
  },
  mounted() {
    this.changedUserInfo.id = this.user.id
    this.changedUserInfo.username = this.user.username
    this.changedUserInfo.password = this.user.password
    this.changedUserInfo.mySign = this.user.mySign
    this.fileList.push({url:'/images/'+this.user.icon})
  },
  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        this.$toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          this.$toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    ensure(){
      if (this.ensurePassword!==this.user.password){
        this.$toast({
          message: '两次输入的密码不一致',
          icon: 'cross',
          type: 'fail',
        })
        this.ensurePassword = ''
      }
    },
    submit(){
      console.log('提交')
      console.log(this.changedUserInfo)
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.van-cell{
  margin-bottom: 10px;
}
</style>
