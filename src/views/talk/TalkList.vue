<template>
  <div class="animate__animated animate__fadeInUp">
    <h4 class="ml-3 mt-4 text-center">消息通知</h4>
    <h5 class="mt-5 ml-2 pb-2" style="border-bottom: #E5E5E5 1px solid">全部聊天</h5>
    <div v-for="(n,index) in messageList" :key="index">
      <div class="media" @click="talkTo(n.fromUserId)">
        <img :src="'/images/'+n.fromUserId+'.png'" class="mr-3 media-img" alt="...">
        <div class="media-body">
          <div class="d-flex justify-content-between">
            <h6 class="mt-1 fromUser-name">匿名用户{{index}}</h6>
            <small>{{ n.sendTime }}</small>
          </div>
          <p class=" message-content">{{ n.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "TalkList",
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['messageList'])
  },
  methods:{
    ...mapMutations(['setTalkToWho','changeIsShowFooterMenu']),
    talkTo(data){
      this.setTalkToWho(data)
      this.changeIsShowFooterMenu(false)
      console.log(data)
      this.$router.push('/talkWin')
    }
  }

}
</script>

<style scoped>
.media{

}
.media-img{
  width: 4rem;
  border-radius: 50%;
}
.fromUser-name{
  color: #6f42c1;
}
.message-content{
  color: orangered;
  font-size: 17px;
}
</style>
