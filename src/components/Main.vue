<template>
    <div>
      <router-view></router-view>
      <div class="footer-tabbar" v-if="this.isShowFooterMenu">
        <van-tabbar route style="overflow: hidden">
          <van-tabbar-item replace to="/home" icon="bi bi-house-door-fill" :id="'1'" @click="animate('1')">树洞</van-tabbar-item>
          <van-tabbar-item replace to="/talkList" icon="bi bi-chat-dots-fill" :id="'2'" @click="animate('2')">消息</van-tabbar-item>
          <van-tabbar-item replace to="/mine" icon="bi bi-person-circle" :id="'3'" @click="animate('3')">我的</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapMutations, mapActions,mapState } = createNamespacedHelpers('warm')
export default {
  name: 'Main',
  computed:{
    ...mapState(['isShowFooterMenu','user','socket','talkToWho','maxId'])
  },
  mounted () {
    this.openSocket()
    this.$router.push('/home')
  },
  methods:{
    ...mapMutations(['test','setSocket','closeSocket','setChatList','addMessageHistory','increaseMaxId']),
    ...mapActions(['addChatListAction','getChatListAction']),
    doTest(){
      this.test('哈哈')
      this.testAction('hh')
    },
    animate (data){
      const element = document.getElementById(data)
      element.style.transition = 'transform 150ms linear'
      element.style.transformOrigin='50% 0%'
      element.style.transform = 'rotate(20deg)'
      setTimeout(()=>{
        element.style.transform = 'rotate(-20deg)'
      },150)
      setTimeout(()=>{
        element.style.transform = 'rotate(0deg)'
      },300)
    },
    openSocket () {
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')
        let socketUrl = 'ws://182.254.159.37:8081/ws/' + this.user.id
        // socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
        this.setSocket(new WebSocket(socketUrl))
        // 打开事件
        this.socket.onopen = () => {
          this.$toast({
            message: 'websocket已打开',
            type: 'success'
          })
        }
        // 获得消息事件
        this.socket.onmessage = (msg) => {
          console.log(msg.data)
          const index=msg.data.indexOf(':')
          console.log(index)
          const date1 = (new Date().toLocaleDateString()).replace(/\//g, '-')
          const time1 = (new Date().toLocaleTimeString()).slice(2)
          const date = date1 + ' 时间 ' + time1
          const message={fromId:parseInt(msg.data.slice(0,index)),LastMsg:msg.data.slice(index+1),CreatedAt:date}
          console.log(message)
          this.addChatListAction(message)
          this.getChatListAction()
          console.log(this.maxId+1)
          this.increaseMaxId()
          const message2 = {
            id: this.maxId+1,
            created_at: date,
            from: message.fromId,
            to: this.user.id,
            msg: message.LastMsg
          }
          this.addMessageHistory(message2)
          this.$notify({type: 'success', message: message.LastMsg})
          }
        }
        // 发生了错误事件
        this.socket.onerror = function () {
          console.log('websocket发生了错误')
        }
      }
    },
  beforeDestroy () {
    this.closeSocket()
    localStorage.clear()
  }
}
</script>

<style scoped>
.footer-tabbar .van-tabbar-item {
   border-top: #E2E2E2 1px solid;
 }

.footer-tabbar{
  display: block;
  background-color: lightsteelblue!important;
}
</style>
