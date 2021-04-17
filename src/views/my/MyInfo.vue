<template>
  <div>
    <div class="user animate__animated animate__fadeInDown">
      <div class="card user-info">
        <div class="row no-gutters">
          <div class="col-9">
            <div class="card-body">
              <h3 class="card-title username">{{ user.username }}</h3>
              <p class="card-text user-sign">{{user.mySign}}</p>
            </div>
          </div>
          <div class="col-2">
            <van-image
                class="user-icon shine1 avatar mr-2"
                width="5rem"
                height="5rem"
                round
                fit="cover"
                :src="userIcon"
            />
            <i class="bi bi-pencil-square"></i>
          </div>
        </div>
        <div class="row no-gutters h-auto text-center">
          <div class="col-2">120</div>
          <div class="col-2">55</div>
          <div class="col-2">88</div>
        </div>
        <div class="row no-gutters h-25 text-center">
          <div class="col-2 text-info">发布</div>
          <div class="col-2 text-primary">回复</div>
          <div class="col-2 text-danger">心情</div>
        </div>
      </div>
    </div>
    <div class="animate__animated animate__fadeInUp">
      <van-tabbar route :fixed="false" class="op-icon">
        <van-tabbar-item replace to="/update" icon="bi bi-eye-fill">浏览历史</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="bi bi-hourglass-split">审核进度</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="service">帮助反馈</van-tabbar-item>
        <van-tabbar-item replace to="/setting" icon="setting">设置中心</van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="work-btn animate__animated animate__fadeInUp">
      <div class="btn">
        我的发布
      </div>
    </div>
    <div class="container work-content animate__animated animate__fadeInUp a1">
      <div class="row">
        <div class="col-6">
          <div v-for="n in 10" :key="n">
            <div class="work-item">
              <van-image
                  radius="1.3rem"
                  fit="cover"
                  src="/images/moon1.jpeg"
              />
              <div>
                <h6>标题</h6>
                <div class="work-text">content</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div v-for="n in 10" :key="n">
            <div class="work-item">
              <van-image
                  radius="1.3rem"
                  fit="cover"
                  src="/images/start.png"
              />
              <div>
                <h6>标题</h6>
                <div class="work-text">content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const { mapState,mapMutations } = createNamespacedHelpers('warm')
export default {
  name: "MyInfo",
  data () {
    return{
      userIcon: ''
    }
  },
  computed:{
    ...mapState(['user'])
  },
  mounted() {
    this.changeIsShowFooterMenu(true)
    this.userIcon ='/images/' +this.user.icon
  },
  methods:{
    ...mapMutations(['changeIsShowFooterMenu']),
  }
}
</script>

<style scoped>
.user{

}
.user-info{
  margin-bottom: 30px;
  background-color: #F5F5F5;
  height: 12rem;
  border-radius: 0 0 30px 30px!important;
}
.user-icon{
  border: lightsteelblue 1px solid;
  margin-top: 1.4rem!important;
}
.bi-pencil-square{
  position: absolute;
  font-size: 18px;
  top: 5.1rem;
  right: 0.8rem;
  z-index: 2;
}
.user-sign{
  color: #6f42c1;
}
.username{
  color: #1fc39e;
}
.op-icon{
  color: #000000;
  font-size: 20px;
  font-weight: 500;
}
.op-icon .van-tabbar-item {
  border: 0!important;
  background-color: white;
}
.work-btn{
  margin-top: 1.2rem;
}
.btn{
  margin-left: 0.8rem;
  border-radius: 20px;
  background-color: #000000;
  color: white;
}
.work-content{
  margin-top: 1.6rem;
}
.work-item{
  border-radius: 20px;
  margin-bottom: 0.8rem;
}
.work-item h6{
  margin-top: 0.6rem;
  padding-bottom: 0!important;
  margin-bottom: 0;
}
.work-text{
  font-size: 14px;
  width: 10rem;
  color: #888888;
  display: inline-block;
  overflow: hidden;
  margin-bottom: 0;
  padding-bottom: 0;
}
.work-like{
  margin-top: -0.6rem;
  font-size: 14px;
  padding-right: 1rem;
  color: #888888;
  text-align: right;
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
.a1{
  --animate-duration: 1.5s;
}
</style>
