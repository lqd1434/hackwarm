<template>
  <div>
    <van-nav-bar
        title="修改资料"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div style="text-align:center ">
      <van-image
          class="user-icon"
          round
          width="10rem"
          height="10rem"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          @click="selectIcon"
      />
    </div>
    <div class="card area-Info">
      <p>
        <span class="info-label">昵称</span><input class="form-control" placeholder="请输入昵称"/>
      </p>
      <p>
        <span class="gender">性别</span>
        <input v-model="changedUserInfo.gender" type="button" class="btn sex-btn mr-2" ref="man" @click="changeGender('man')"/>
        <input v-model="anGender" class="btn sex-btn" ref="women" type="button" @click="changeGender('women')"/>
      </p>
      <p>
        <span class="info-label">生日</span>
        <input type="text" class="form-control" placeholder="选择生日" @focus="isShowPicker=true"/>
        <van-popup
            v-model="isShowPicker"
            position="bottom"
            :style="{ height: '40%' }">
          <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirmTime"
              @cancel="isShowPicker=false"
          />
        </van-popup>
      </p>
      <div class="input-group">
        <span class="info-label" style="height: 1.3rem;margin-top: 0.5rem;padding-top: 0">签名</span>
        <input type="text" v-model="changedUserInfo.sign" class="form-control info-sign" placeholder="请输入签名" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">{{ changedUserInfo.sign.length }}/15</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {bus} from "@/api/info";
const { mapState } = createNamespacedHelpers('warm')
export default {
  name: "UpdateInfo",
  data(){
    return{
      anGender:null,
      changedUserInfo: {id: 0,icon: '',username:'',gender:'男',sign:''},
      ensurePassword: '',
      fileList: [],
      isShowPicker: false,

      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: null,
    }
  },
  created() {
    const newDate = new Date()
    this.currentDate = new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate())
  },
  mounted() {

    bus.$on('setIcon',(data) => {
      console.log(data)
      this.changedUserInfo.icon = data
    })
    this.$refs.man.style.backgroundColor = 'black'
    this.$refs.man.style.color = 'white'
    if (this.user.gender ==='男'){
      this.anGender = '女'
    } else if (this.user.gender === '女'){
      this.anGender = '男'
    }
  },
  methods: {
    changeGender(data){
      if (data==='man'){
        this.$refs.man.style.backgroundColor = 'black'
        this.$refs.man.style.color = 'white'
        this.$refs.women.style.color = 'black'
        this.$refs.women.style.backgroundColor = 'white'
      } else {
        this.$refs.man.style.backgroundColor = 'white'
        this.$refs.man.style.color = 'black'
        this.$refs.women.style.color = 'white'
        this.$refs.women.style.backgroundColor = 'black'
      }
    },
    onClickLeft(){
      this.$router.push('/account')
    },
    submit(){
      console.log('提交')
      console.log(this.changedUserInfo)
    },
    selectIcon(){
      this.$router.push('/icon')
    },
    confirmTime(){
      console.log(this.currentDate.getFullYear())
      this.isShowPicker=false
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.user-icon{
  margin-top: 3rem;
  box-shadow: 0 0 10px #888888;
}
.area-Info{
  width: 80%;
  margin: 2rem auto;
  padding-top: 1.3rem;
  border-radius: 2rem;
  box-shadow: 0 0 10px #888888;
}
.gender{
  color: black;
  padding-left: 2rem;
  padding-right: 2.4rem;
}
.sex-btn{
  font-size: 14px;
  border-radius: 1rem;
  width: 3.6rem;
  border: black 1px solid;
}
.submit-btn{
  height: 3rem;
  border-radius: 1.5rem;
  margin:0 auto;
}
.form-control{
  display: inline-block;
  width: 60%;
  border: 0!important;
}
.input-group{
  margin-bottom: 0;
  padding-bottom: 1rem;
  width: 96%;
}
.form-control:focus{
  box-shadow: none!important;
}
.input-group-text{
  background: white;
  border: 0;
}
.info-label{
  border-right: #888888 1px solid;
  padding-right: 2rem;
  padding-left: 2rem;
}
</style>

