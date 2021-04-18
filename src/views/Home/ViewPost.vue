<template>
  <div>
    <div>
      <img src="/images/view-1.png" class="bd-send" @click="ShowView">
      <div class="bd-back" id="bd-back" @click="comeBack">
        <van-icon name="arrow-left" :color="'white'" />
        <span>返回</span>
      </div>
      <div class="bd-content">
        <h3>{{ this.content }}</h3>
      </div>
    </div>
    <div>
      <img src="/images/bg-view.png" class="bd-view">
      <div id="dialog-view">
        <van-dialog
            v-model="isShowBg"
            :title="''"
            confirm-button-text="回复"
            cancel-button-text="返回"
            show-cancel-button
            :overlay="false"
            @confirm="talkWith"
            @cancel="cancel"
        >
          <div class="dialog-content mt-4">
            <div>
              <h3 style="text-align: center;color: coral">{{ postEntity.Title }}</h3>
            </div>
            <div class="mt-3 pl-1">
              <p style="font-size: 18px">{{ postEntity.Content }}</p>
            </div>
          </div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import axios from "axios";
const { mapMutations,mapState } = createNamespacedHelpers('warm')

export default {
  name: "ViewPost",
  data(){
    return{
      isShowBg:false,
      postTitle: '',
      content:'',
      postEntity:{}
    }
  },
  computed:{
    ...mapState(['viewContentId'])
  },
  mounted() {
    this.setViewContent(this.viewContentId)
    this.changeIsShowFooterMenu(false)
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu','setTalkToWho']),
    getPost(id){
      return new Promise((resolve)=>{
        axios({
          url: '/api/post/'+id,
          method:'get'
        }).then((res)=>{
          console.log(res)
          resolve(res.data)
        })
      })

    },
    talkWith(){
      this.isShowBg = false
      this.setTalkToWho(this.postEntity.UserId)
      this.$router.push('/talkWin')
    },
    cancel(){
      this.isShowBg = false
    },
    comeBack(){
      this.$router.push('/home')
    },
    ShowView(){
      this.isShowBg = true
      this.getPost(this.viewContentId).then((res)=>{
        if (res.code === 0){
          this.postEntity = res.data.post
        }
        console.log(res)
      })
    },
    setViewContent(data){
      if(data===2){
        this.content = '轻点遇见快乐'
      } else if(data===3){
        this.content = '轻点倾听烦恼'
      }else if(data===1){
        this.content = '轻点同祝校庆'
      }
    }
  }

}
</script>

<style scoped>
.bd-send{
  position: absolute;
  z-index: 1;
  width: 100%;
}
.bd-content{
  position: absolute;
  bottom: 2rem;
  left: 32%;
  z-index: 2;
  color: white;
}
.bd-back{
  position: absolute;
  padding-left: 2.2rem;
  margin-top: 13%;
  font-size: 22px;
  color: white;
  z-index: 2;
}
.dialog-content{
  height: 20rem;
}
</style>
<style>
#bd-back .van-nav-bar__text, .van-nav-bar__title, .van-icon-arrow-left::before{
  color: white;
  font-size: 20px;
}
#dialog-view .van-dialog{
  background: linear-gradient(to bottom,rgba(255,255,255,0.2),#C9F0EE);
  border: #65CAAD 1px solid;
}
#dialog-view .van-dialog__header{
  color: #65CAAD;
  font-size: 24px;
  font-weight: bolder;
}
#dialog-view .van-button--default{
  background: #F89E84;
  border-radius: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  color: white;
}
#dialog-view .van-dialog__content{
  width: 100%;
  height: 80%!important;
  color: #A482ED;
  font-size: 20px;
  padding-left: 1rem;
  background-color: rgba(255,255,255,0.2);
}
</style>
