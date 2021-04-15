<template>
    <div>
      <router-view></router-view>
      <div class="footer-tabbar" v-if="this.isShowFooterMenu">
        <van-tabbar route style="overflow: hidden">
          <van-tabbar-item replace to="/home" icon="bi bi-house-door-fill" :id="'1'" @click="animate('1')">主页</van-tabbar-item>
          <van-tabbar-item replace to="/treeHole" icon="bi bi-collection-fill" :id="'2'" @click="animate('2')">树洞</van-tabbar-item>
          <van-tabbar-item replace to="/talkList" icon="bi bi-chat-dots-fill" :id="'3'" @click="animate('3')">消息</van-tabbar-item>
          <van-tabbar-item replace to="/mine" icon="bi bi-person-circle" :id="'4'" @click="animate('4')">我的</van-tabbar-item>
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
    ...mapState(['isShowFooterMenu'])
  },
  mounted () {
    // this.openSocket()
    this.$router.push('/home')
  },
  methods:{
    ...mapMutations(['test','addMessageHistory','setSocket']),
    ...mapActions(['testAction']),
    doTest(){
      this.test('哈哈')
      this.testAction('hh')
    },
    animate (data){
      const element = document.getElementById(data)
      element.style.transition = 'transform 150ms linear'
      element.style.transformOrigin='50% 0%'
      element.style.transform = 'rotate(30deg)'
      setTimeout(()=>{
        element.style.transform = 'rotate(-30deg)'
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
        let socketUrl = 'http://localhost:8089/chat/' + this.user.id
        socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
        this.setSocket(new WebSocket(socketUrl))
        // this.socket = new WebSocket(socketUrl)
        // 打开事件
        this.socket.onopen = () => {
          this.$toast({
            message: 'websocket已打开',
            type: 'success'
          })
        }
        // 获得消息事件
        this.socket.onmessage = (msg) => {
            console.log(msg)
            this.addMessageHistory(msg)
          }
        }
        // 发生了错误事件
        this.socket.onerror = function () {
          console.log('websocket发生了错误')
        }
      }
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
