<template>
  <div id="root">
      <div class="talkWin-header fixed-top" style="font-size: 20px">
        <div class="mt-4"></div>
        <div class="border-bottom">
          <i class="bi bi-arrow-left-circle-fill ml-3 mr-3" @click="back"></i>
          <span>匿名用户</span>
        </div>
      </div>
    <div class="chat-window pt-5" id="chat">
      <div v-for="item in messageHistory" :key="item.id">
        <!--        左边-->
        <div class="card" v-if="item.from===talkToWho">
          <div class="card-body">
            <div class="message">
              <img src="/images/left-nm.jpeg" class="message-icon"/>
              <div class="text">
                <div class="message-content">{{ item.msg }}</div>
                <p class="send-time">{{ (item.created_at.slice(0,19)).replace('T','\t时间\t') }}</p>
              </div>
            </div>
          </div>
        </div>
        <!--  右边-->
        <div class="card" v-if="item.from===user.id">
          <div class="card-body">
            <div class="message-right float-right">
              <img src="/images/right-nm.jpg" class="message-icon-right"/>
              <div class="text-right">
                <div class="message-content-right">{{ item.msg }}</div>
                <p class="send-time-right">{{ (item.created_at.slice(0,19)).replace('T',' 时间 ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row fixed-bottom bg-white">
      <div class="input-group">
        <input type="text" v-model="messageText" class="footer-input" placeholder="请输入聊天内容"/>
        <div>
          <i class="bi bi-emoji-smile"></i>
          <button class="send-btn btn btn-dark" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapState,mapMutations,mapActions } = createNamespacedHelpers('warm')
export default {
  name: "TalkWin",
  data () {
    return {
      messageText: "",
      messages:[],
      isEmpty:false,
    }
  },
  computed:{
    ...mapState(['user','maxId','talkToWho','messageHistory','socket'])
  },
  mounted() {
    this.getMessageHistory({fromId:this.user.id,toId:this.talkToWho}).then((res)=> {
      console.log(res.data)
      this.messages = res.data
      const {From, To} = res.data
      console.log(From)
      console.log(To)
      if (From.length > 0 || To.length > 0) {
        this.isEmpty=false
        From.map((item, index) => {
          From[index].created_at = (From[index].created_at.slice(0, 19)).replace('T', ' 时间 ')
        })
        To.map((item, index) => {
          To[index].created_at = (To[index].created_at.slice(0, 19)).replace('T', ' 时间 ')
        })
        this.messages = [...From, ...To]
        for (let i = 1; i < this.messages.length; i++) {
          for (let j = i; j > 0; j--) {
            if (this.messages[j].id < this.messages[j - 1].id) {
              let pre = this.messages[j];
              this.messages[j] = this.messages[j - 1];
              this.messages[j - 1] = pre;
            }
          }
        }
        console.log(this.messages)
        this.setMessageHistory(this.messages)
        this.setMaxId(this.messages[this.messages.length - 1].id)
        this.setMinId(this.messages[0].id)
      }else {
        this.isEmpty = true
        this.messages=[]
        this.setMessageHistory(this.messages)
      }
    })
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu','setMaxId','setMessageHistory',
      'addMessageHistory','setMinId','increaseMaxId'
    ]),
    ...mapActions(['getMessageHistory','addChatListAction']),
    sendMessage(){
      if (this.messageText) {
        this.increaseMaxId()
        const date1 = (new Date().toLocaleDateString()).replace(/\//g, '-')
        const time1 = (new Date().toLocaleTimeString()).slice(2)
        const date = date1 + ' 时间 ' + time1
        this.socket.send(''+this.talkToWho+':'+this.messageText)
        console.log(this.maxId)
        const message = {
          id: this.isEmpty ? 1:this.maxId+1,
          created_at: date,
          from: this.user.id,
          to: this.talkToWho,
          msg: this.messageText
        }
        console.log(this.messages.length)
        this.addMessageHistory(message)
        const message2={fromId:this.user.id,LastMsg:this.messageText,CreatedAt:date}
        this.addChatListAction(message2)
        console.log(this.messages.length)
        console.log(JSON.stringify(message))
        this.messageText=''
      }
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
.talkWin-header{
  background-color: white;
}
.footer-input{
  margin-left: 2rem;
  width: 60%;
  height: 2.5rem;
  border-radius: 1.3rem;
}
.send-btn{
  margin-top: -1rem;
  margin-left: 0.5rem;
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
  background-color: rgba(183,183,190,1);
  text-align: left;
  border-radius: 6px;
  padding: 5px 0 0 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 110%;
  font-size: 15px;
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
  padding-bottom: 10px;
  padding-left: 12px;

}
.message-content-right{
  font-size: 15px;
  color: white;
  padding-bottom: 10px;
  padding-right: 12px;

}
.send-time{
  padding-left: 12px;
  color: #1D84FF;
  font-size: 12px;
}
.send-time-right{
  padding-right: 12px;
  color: #1fc39e;
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
  border-color: transparent rgba(183,183,190,1) transparent transparent;
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
.bi-arrow-left-circle-fill{
  font-size: 25px;
  font-weight: 800;
}
img{
  border: black 1px solid;
}
</style>
