<template>
  <div id="root">
    <div class="talkWin-header" style="font-size: 20px">
      <div class="mt-4"></div>
      <div class="border-bottom">
        <i class="bi bi-arrow-left-circle ml-3 mr-3" @click="back"></i>
        <span>匿名用户</span>
      </div>
    </div>
    <div class="chat-window" id="chat">
      <div v-for="item in this.messageHistory" :key="item.id">
        <!--        左边-->
        <div class="card" v-if="item.fromUserId===talkToWho">
          <div class="card-body">
            <div class="message">
              <img src="/images/niming1.png" class="message-icon"/>
              <div class="text">
                <div class="message-content">{{ item.content }}</div>
                <p class="send-time">{{ item.sendTime }}</p>
              </div>
            </div>
          </div>
        </div>
        <!--  右边-->
        <div class="card" v-if="item.fromUserId===user.id">
          <div class="card-body">
            <div class="message-right float-right">
              <img src="/images/niming2.png" class="message-icon-right"/>
              <div class="text-right">
                <div class="message-content-right">{{ item.content }}</div>
                <p class="send-time-right">{{ item.sendTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row fixed-bottom">
      <div class="input-group">
        <input type="text" class="footer-input" placeholder="请输入聊天内容"/>
        <div>
          <i class="bi bi-emoji-smile"></i>
          <button class="send-btn btn">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapState,mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "TalkWin",
  data () {
    return {
      messageText: "",
    }
  },
  computed:{
    ...mapState(['user','talkToWho','messageHistory'])
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu']),
    sendMessage(){
      console.log('发送消息')
    },
    back(){
      this.changeIsShowFooterMenu(true)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#root{
  overflow: auto;
}
.footer-input{
  margin-left: 2rem;
  width: 17rem;
  height: 2.5rem;
  border-radius: 1.3rem;
}
.send-btn{
  margin-top: -1rem;
  margin-left: 0.5rem;
  color: white;
  background-color: black;
}
.bi-emoji-smile{
  padding-left: 0.6rem;
  font-size: 30px;
}
.message{
  position: relative;
  display: inline-block;
}
.message-right{
  position: relative;
  display: inline-block;
}
.message-icon{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.message-icon-right{
  height: 50px;
  width: 50px;
  float: right;
  border-radius: 50%;
}
.message .text {
  min-width:200px;
  min-height: 30px;
  background-color: rgba(245,245,245,1);
  text-align: left;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 110%;
}
.message-right .text-right {
  width: 200px;
  background-color: rgba(16,16,16,1);
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 110%;
}
.chat-window .card {
  border: 0;
}
p{
  margin: 0;
  padding: 0
}
.message-content{
  color: black;
  font-size: 20px;
  padding-bottom: 10px;
  padding-left: 12px;

}
.message-content-right{
  color: white;
  font-size: 20px;
  padding-bottom: 10px;
  padding-right: 12px;

}
.send-time{
  padding-left: 12px;
  color: #1fc39e;
  font-size: 12px;
}
.send-time-right{
  padding-right: 12px;
  color: #C9F0EE;
  font-size: 12px;
}
.message .text::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent rgba(245,245,245,1) transparent transparent;
}
.message-right .text-right::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent rgba(16,16,16,1);;
}
.chat-window{
  margin-bottom: 120px;
}
.bi-arrow-left-circle{
  font-size: 23px;
  font-weight: 800;
}
</style>
