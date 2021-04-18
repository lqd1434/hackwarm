<template>
  <div id="root">
    <div class="animate__animated animate__fadeInUp">
      <div>
        <h4 class="ml-3  text-center">消息通知</h4>
        <h5 class="mt-3 ml-2 pb-0" style="border-bottom: #E5E5E5 1px solid">全部聊天</h5>
      </div>
      <div v-if="this.chatList.length!==0">
        <div v-for="(n,index) in this.chatList" :key="index">
          <van-swipe-cell>
            <div class="media" :style="n.hasBg ? 'background-color: #B1E4D5':''" @click="talkTo(n.FromId)">
              <img src="/images/treeIcon.jpeg" class="mr-3 media-img" alt="...">
              <div class="media-body">
                <div class="d-flex justify-content-between">
                  <h6 class="mt-1 fromUser-name text-danger">匿名用户</h6>
                  <small class="text-success">{{ n.CreatedAt }}</small>
                </div>
                <p class=" message-content">{{ n.LastMsg }}</p>
              </div>
            </div>
            <template #right>
              <div class="btn-group right-btn">
                <button class="btn btn-secondary" @click="setTop(index)">{{ n.HasBg ? '取消置顶':'置顶' }}</button>
                <button class="btn btn-danger" @click="doDelete(index)">删除</button>
              </div>
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <div v-if="this.chatList===0">
        <van-empty description="聊天列表为空">
          <van-button round type="danger" class="bottom-button" @click="toViewTalk">找人聊天</van-button>
        </van-empty>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import axios from "axios";

const { mapState, mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "TalkList",
  data(){
    return{

    }
  },
  created() {
    axios({
      url:'/api/auth/chats',
      method:'get',
      headers:{
        Authorization:'Bearer ' + localStorage.getItem('myToken')
      },
    }).then((res)=>{
      if (res.data.code === 0){
        this.setChatList(res.data.data.chats)
        console.log(res.data.data)
      }
    })
  },
  mounted() {
    this.changeIsShowFooterMenu(true)
  },
  computed:{
    ...mapState(['chatList'])
  },
  methods:{
    ...mapMutations(['setTalkToWho', 'changeIsShowFooterMenu','setViewContentId',
      'addChatList','setToTop','deleteChatList','setChatList'
    ]),
    talkTo(data){
      this.setTalkToWho(data)
      this.changeIsShowFooterMenu(false)
      console.log(data)
      this.$router.push('/talkWin')
    },
    toViewTalk(){
     const count=Math.ceil(Math.random()*3)
      if (count!==0){
        this.setViewContentId(count)
      } else {
        this.setViewContentId(1)
      }
      this.$router.push('/view')
    },
    setTop(data){
      this.setToTop(data)
    },
    doDelete(data){
      this.deleteChatList(data)
    },
    add(){
      const count=Math.ceil(Math.random()*6)
      this.addChatList({fromUserId:count,content:'晚上好',sendTime:'2021-4-13时间 20:00:01'})
    }
  }

}
</script>

<style scoped>
#root{
  display: block;
  height: 100%;
  width: 100%;
  background: url("/images/img_2.png");
  /*background-size: ;*/
}
.media{
  border-bottom: #A482ED 1px solid;
}
.media-img{
  width: 4rem;
  border-radius: 50%;
  border: #1fc39e 1px solid;
}
.fromUser-name{
  padding-top: 0.3rem;
  color: black;
}
.message-content{
  color: #1D84FF;
  font-size: 17px;
}
.right-btn .btn{
  height: 5rem;
  width: 4rem;
}
</style>
