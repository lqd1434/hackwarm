<template>
  <div>
    <div v-if="!isShowBg">
      <img @click="goingPost('happy')" src="/images/happy.png" class="tree-hole mt-4 animate__animated animate__fadeInDown shine1">
      <img @click="goingPost('annoy')" src="/images/warry.png" class="tree-hole animate__animated animate__fadeInDown shine2">
      <img @click="goingPost('school')" src="/images/school.png" class="tree-hole animate__animated animate__fadeInDown shine1">
    </div>
    <div v-if="isShowBg">
      <img src="/images/bg-send.png" class="bd-send">
      <div id="dialog-send">
        <van-dialog
            v-model="isShowBg"
            :title="postTitle"
            show-cancel-button
            :overlay="false"
            @confirm="sendPost"
            @cancel="cancelPost"
        >
          <div class="dialog-content">
          </div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const { mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "HeartWords",
  data(){
    return{
      isShowBg: false,
      postTitle: ''
    }
  },
  mounted() {
    this.changeIsShowFooterMenu(true)
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu']),
    goingPost(data){
      this.isShowBg = true
      if(data === 'happy') {
        this.postTitle = '探索快乐'
      } else if(data === 'annoy'){
        this.postTitle = '宣泄烦恼'
        console.log('annoy')
      }else if(data === 'school'){
        this.postTitle = '校庆祝福'
        console.log('school')
      }
    },
    sendPost(){
      this.isShowBg = false
      console.log('---')
    },
    cancelPost(){
      this.isShowBg = false
      console.log('111')
    }
  }

}
</script>

<style scoped>
.tree-hole{
  display: block;
  border-radius: 2rem 2rem 2.3rem 2rem!important;
  width: 75%;
  margin: 1rem auto
}
.bd-send{
  position: absolute;
  z-index: 1;
  width: 100%;
}
#dialog-send{
  position: absolute;
  z-index: 2;
}
@-webkit-keyframes  shine1 {
  from { -webkit-box-shadow: 0 0 5px #bbb; }
  20% {-webkit-box-shadow: 0 0 10px #00FBE6}
  40% {-webkit-box-shadow: 0 0 10px #6a1a21}
  60% {-webkit-box-shadow: 0 0 10px #6f42c1}
  80% {-webkit-box-shadow: 0 0 10px #1D84FF}
  to { -webkit-box-shadow: 0 0 5px #bbb; }
}
.shine1{
  -webkit-animation-name: shine1;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
}
.shine2{
  -webkit-animation-name: shine1;
  -webkit-animation-duration: 5s;
  -webkit-animation-iteration-count: infinite;
}
</style>

<style>
.hear .van-button--normal{
  color: #1fc39e!important;
  border-radius: 15px;
  font-size: 30px;
  height: 80px;
}
.talk .van-button--normal{
  color: coral!important;
  border-radius: 15px;
  font-size: 30px;
  height: 80px;
}
#dialog-send .van-dialog{
  background: linear-gradient(to bottom,rgba(255,255,255,0.2),#C9F0EE);
  border: #65CAAD 1px solid;
}
 #dialog-send .van-dialog__header{
  color: #65CAAD;
   font-size: 24px;
   font-weight: bolder;
 }
#dialog-send .van-button--default{
  background: #F89E84;
  border-radius: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  color: white;
}
#dialog-send .van-dialog__content{
  width: 100%;
  height: 80%;
  color: #A482ED;
  font-size: 20px;
  padding-left: 1rem;
  background-color: rgba(255,255,255,0.2);
}
</style>
