<template>
  <div>
    <div v-if="!isShowIconPicker">
      <van-nav-bar
          title="修改资料"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft1"
      />
      <div style="text-align:center ">
        <van-image
            class="user-icon"
            round
            width="10rem"
            height="10rem"
            fit="cover"
            :src="'/images/'+icon"
            @click="isShowIconPicker = true"
        />
      </div>
      <div class="card area-Info">
        <p>
          <span class="info-label">昵称</span><input class="form-control" v-model="name1" placeholder="请输入昵称"/>
        </p>
        <p>
          <span class="gender">性别</span>
          <button  type="button" class="btn sex-btn mr-2" ref="man" @click="changeGender('男')">男</button>
          <button  class="btn sex-btn" ref="women" type="button" @click="changeGender('女')">女</button>
        </p>
        <p>
          <span class="info-label">生日</span>
          <input type="text" class="form-control" v-model="birth" placeholder="选择生日" @focus="isShowPicker=true"/>
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
          <input type="text" v-model="description" class="form-control info-sign" placeholder="请输入签名" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">{{ description.length }}/15</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShowIconPicker">
      <van-nav-bar
          title="头像选择"
          left-text="返回"
          right-text="确认"
          left-arrow
          @click-left="this.isShowIconPicker = false"
          @click-right="onClickRight"
      />
      <div class="d-flex row justify-content-start icon-group">
        <van-radio-group v-model="radio" v-for="n in 7" :key="n">
          <van-radio :name="n">
            <img :src="'/images/'+n+'.png'" class="icon" alt="...">
          </van-radio>
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import axios from "axios";
const { mapState,mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "UpdateInfo",
  data(){
    return{
      isShowIconPicker:false,
      radio: '',

      anGender:null,
      changedUserInfo: null,
      ensurePassword: '',
      fileList: [],
      isShowPicker: false,
      currentDate: null,
      icon:'',
      name1:'',
      gender:'',
      description:'',
      birth:'',
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created() {
    const newDate = new Date()
    this.currentDate = new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate())
  },
  mounted() {
    console.log(this.user)
    console.log(this.user.name)
    this.icon = this.user.icon
    this.name1 = this.user.name
    this.birth = this.user.icon
    this.description = this.user.description
    this.gender = this.user.gender
    console.log(this.name1)
  },
  methods: {
    ...mapMutations([]),
    changeGender(data){
      this.gender = data
      if (data==='男'){
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
    onClickLeft1(){
      console.log('提交')
      const data1 = JSON.stringify({
        name:this.name1,
        birth:this.birth,
        gender:this.gender,
        description:this.description,
        icon:this.icon
      })
      axios({
        url:'/api/auth/me',
        method:'put',
        headers:{
          Authorization:'Bearer ' + localStorage.getItem('myToken')
        },
        data:data1
      }).then(()=>{
        this.$router.push('/account')
      })
      //     .then((res)=>{
      //   // if (res.data.code === 0) {
      //   //   this.$toast({
      //   //     type: 'success',
      //   //     message:'修改成功'
      //   //   })
      //   //   this.$router.push('/account')
      //   // } else {
      //   //   this.$toast({
      //   //     type: 'success',
      //   //     message:'修改失败,请检查'
      //   //   })
      //   }
      // })
    },
    confirmTime(){
      console.log(this.currentDate.getFullYear())
      console.log(this.currentDate.getMonth())
      console.log(this.currentDate.getDate())
      const birthDate =''+ this.currentDate.getFullYear()+'-'+this.currentDate.getMonth()+'-'+this.currentDate.getDate()
      this.birth = birthDate
      this.isShowPicker=false
    },
    onClickRight(){
      this.icon = this.radio+'.png'
      this.isShowIconPicker = false
      console.log(this.radio)
    }
  },
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
.icon-group{
  margin-left: 1rem;
}
.icon{
  width: 6rem;
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

