<template>
  <div id="root">
    <div v-if="isShowMenu" class="animate__animated animate__fadeInDown">
      <van-notice-bar color="#1989fa" scrollable background="#ecf9ff" left-icon="volume-o">
        技术是开发它的人的共同灵魂。
      </van-notice-bar>
      <van-grid :border="false" :column-num="4" class="item-group" :gutter="0" center square>
        <van-grid-item @click="showTalkWin('1')">
          <van-image src="/images/start.png" width="5rem" class="br"/>
          <div style="color: red">百年祝福</div>
        </van-grid-item>
        <van-grid-item @click="showTalkWin('2')">
          <van-image src="/images/start.png" width="5rem" class="br"/>
          <div style="color: orange" >探索快乐</div>
        </van-grid-item>
        <van-grid-item @click="showTalkWin('3')">
          <van-image src="/images/start.png" width="5rem" class="br"/>
          <div style="color: mediumpurple" >烦恼发泄</div>
        </van-grid-item>
        <van-grid-item @click="showTalkWin('4')">
          <van-image src="/images/start.png" width="5rem" class="br"/>
          <div style="color: burlywood">随便逛逛</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="animate__animated animate__fadeInUp home" ref="home">
      <van-image src="/images/bg.png" width="100%" fit="cover" class="cover-img br" ref="cover"/>
    </div>
    <div>
      <van-dialog v-model="isShowDialog"
                  title="标题"
                  show-cancel-button
                  confirm-button-text="回复"
                  cancel-button-text="返回"
                  @confirm="talkWith"
                  :overlay="false">
        <div>容内容内容内容内容内容内容内容内容内容</div>
        <div>容内容内容内容内容内容内容内容内容内容</div>
        <div>容内容内容内容内容内容内容内容内容内容</div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      isShowMenu: false,
      isShowDialog: false
    }
  },
  watch:{
    isShowDialog(newValue){
      if (newValue === false){
        this.showMenu()
      }
    }
  },
  mounted() {
    this.showMenu()
  },
  methods:{
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
    showMenu(){
      this.$refs.home.style.margin = '-1rem auto'
      setTimeout(()=>{
        this.isShowMenu = true
        if (this.$refs.home&&this.$refs.cover){
          this.$refs.home.style.margin = '1rem auto'
          this.$refs.cover.style.borderRadius = '10px'
        }
      },3000)
    },
    talkWith(){
      this.$router.push('/talkWin')
    }
  }
}
</script>

<style scoped>
.cover-img{
  display: block;
  border-radius: 0;
  min-height: 42rem;
  transition: margin-top 2s;
}
.item-group{
  margin-top: 1.5rem;
}

</style>
<style>
.br .van-image__error, .van-image__img, .van-image__loading{
  border-radius: 10px!important;
}
.van-grid-item__content{
  padding: 0!important;
}

.home .van-image__img{
  border-radius: 0;
}
.van-dialog{
  height: 30rem!important;
}
.van-dialog{
  background: linear-gradient(to bottom,rgba(10,20,20,0.5) 80%,rgba(16,107,164,0.5))!important;
}
.van-dialog__header{
  font-weight: 600;
  font-size: 22px;
  color: coral;
  margin-bottom: 1rem;
}
.van-dialog__content{
  color: #00FBE6;
  height: 77%!important;
}
.van-hairline--top .van-dialog__footer button{
  float: bottom!important;
  background-color: rgba(100,200,200,0.5) !important;;

}
.van-button--default{
  background: linear-gradient(to bottom,rgba(10,20,20,0.5) 80%,rgba(16,107,164,0.5))!important;

  color: white!important;
}
</style>
