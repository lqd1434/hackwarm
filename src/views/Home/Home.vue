<template>
  <div id="root">
    <div v-if="!isShowBg">
      <div class="w-100">
        <div class="btn-group-vertical w-auto ml-auto mr-auto" v-if="isShowBtn1">
          <div class="btn" @click="Post('1')">分享</div>
          <div class="btn" @click="toSee('1')">遇见</div>
        </div>
        <img @click="showChoice('happy')" ref="img1" src="/images/treeHole-1.png" class="tree-hole mt-4 animate__animated animate__fadeInDown shine1">
      </div>
      <div>
        <div class="btn-group-vertical" v-if="isShowBtn2">
          <div class="btn" @click="Post('2')">倾诉</div>
          <div class="btn" @click="toSee('2')">聆听</div>
        </div>
        <img @click="showChoice('annoy')" ref="img2" src="/images/treeHole-2.png" class="tree-hole animate__animated animate__fadeInDown shine2">
      </div>
      <div>
        <div class="btn-group-vertical" v-if="isShowBtn3">
          <div class="btn" @click="Post('3')">祝福</div>
          <div class="btn" @click="toSee('3')">感受</div>
        </div>
        <img @click="showChoice('school')" ref="img3" src="/images/treeHole-3.png" class="tree-hole animate__animated animate__fadeInDown shine1">
      </div>
    </div>
    <div v-if="isShowBg">
      <img src="/images/bg-send.png" class="bd-send">
      <div id="dialog-send">
        <van-dialog
            v-model="isShowBg"
            :title="postTitle"
            confirm-button-text="发表"
            cancel-button-text="返回"
            show-cancel-button
            :overlay="false"
            @confirm="sendPost"
            @cancel="cancelPost"
        >
          <div class="dialog-content mt-4">
            <div>
              <span class="pr-2">标题</span>
              <input class="form-control"/>
            </div>
            <div class="mt-3">
              <span class="c1-label pr-2">内容</span>
            </div>
            <div class="pl-5">
              <textarea class="form-control t1"></textarea>
            </div>
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
  name: "Home",
  data(){
    return{
      isShowMenu: false,
      isShowDialog: false,
      isShowBg: false,
      postTitle: '',

      isShowBtn1: false,
      isShowBtn2: false,
      isShowBtn3: false,
    }
  },
  watch:{
    isShowBtn1(newValue){
      setTimeout(()=>{
        if (newValue === true){
          this.$refs.img1.style.filter = 'blur(5px)'
        } else {
          this.$refs.img1.style.filter = 'blur(0px)'
        }
      }, 50)
    },
    isShowBtn2(newValue){
      setTimeout(()=>{
        if (newValue === true){
          this.$refs.img2.style.filter = 'blur(5px)'
        }else {
          this.$refs.img2.style.filter = 'blur(0px)'
        }
      },50)
    },
    isShowBtn3(newValue){
      setTimeout(()=>{
        if (newValue === true){
          this.$refs.img3.style.filter = 'blur(5px)'
        }else {
          this.$refs.img3.style.filter = 'blur(0px)'
        }
      },50)
    },
  },
  mounted() {
    this.changeIsShowFooterMenu(true)
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu','setViewContentText']),
    showChoice(data){
      if(data === 'happy') {
        this.isShowBtn1 = !this.isShowBtn1
        this.isShowBtn2 = false
        this.isShowBtn3 = false
        this.postTitle = '探索快乐'
      } else if(data === 'annoy'){
        this.isShowBtn2 = !this.isShowBtn2
        this.isShowBtn1 = false
        this.isShowBtn3 = false
        this.postTitle = '宣泄烦恼'
      }else if(data === 'school'){
        this.postTitle = '校庆祝福'
        this.isShowBtn2 = false
        this.isShowBtn1 = false
        this.isShowBtn3 = !this.isShowBtn3
      }
    },
    Post(data){
      this.isShowBg = true
      this.changeIsShowFooterMenu(false)
      if (data === '1'){
        this.postTitle = '探索快乐'
      } else if (data === '2'){
        this.postTitle = '宣泄烦恼'
      } else if (data === '3'){
        this.postTitle = '校庆祝福'
      }
    },
    sendPost(){
      this.isShowBg = false
      this.changeIsShowFooterMenu(true)
      this.notShow()
      console.log('---')
    },
    cancelPost(){
      this.isShowBg = false
      this.changeIsShowFooterMenu(true)
      this.notShow()
      console.log('111')
    },
    toSee(data){
      let content = null
      if(data==='1'){
        content = '轻点遇见快乐'
      } else if(data==='2'){
        content = '轻点倾听烦恼'
      }else if(data==='3'){
        content = '轻点同祝校庆'
      }
      this.setViewContentText(content)
      this.$router.push('/view',)
    },
    showTalkWin(data){
      this.isShowDialog = true
      this.isShowMenu = false
      this.$refs.home.style.margin = '-1rem auto'
      if(data==='1'){
        console.log('百年祝福')
      } else if(data==='2'){
        console.log('探索快乐')
      }else if(data==='3'){
        console.log('烦恼发泄')
      }else if(data==='4'){
        console.log('随便逛逛')
      }
    },
    talkWith(){
      this.$router.push('/talkWin')
    },
    notShow(){
      this.isShowBtn1 = false
      this.isShowBtn2 = false
      this.isShowBtn3 = false
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
.btn-group-vertical{
  /*width:100%;*/
  position: absolute;
}
.btn{
  width:3rem;
  margin:3.3rem auto 1.6rem auto;
  left:300%;
  border-radius:1rem!important;
  background-color: #F96038;
  z-index: 2;
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
.dialog-content{
  height: 17rem;
}
.form-control{
  width: 75%;
  display: inline-block;
  border: #1fc39e 1px solid;
  background-color: rgba(255,255,255,0.2);
}
.form-control:focus{
  box-shadow: none!important;
}
.t1{
  width: 88%;
  height: 10rem;
  margin-top: -1.5rem;
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
  height: 80%!important;
  color: #A482ED;
  font-size: 20px;
  padding-left: 1rem;
  background-color: rgba(255,255,255,0.2);
}
</style>
