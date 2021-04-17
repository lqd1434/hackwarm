<template>
  <div>
    <van-nav-bar
        title="头像选择"
        left-text="返回"
        right-text="确认"
        left-arrow
        @click-left="onClickLeft"
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
</template>

<script>
import {bus} from "@/api/info";

export default {
  name: "Icon",
  data(){
    return{
      radio: ''
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push('/updateInfo')
    },
    onClickRight(){
      bus.$emit('setIcon',this.radio+'.png')
      this.$router.push('/updateInfo')
      console.log(this.radio)
    }
  }
}
</script>

<style scoped>
.icon-group{
  margin-left: 1rem;
}
.icon{
  width: 6rem;
}
</style>
