<template>
  <div>
    <div id="back-nar">
      <van-nav-bar
          title="设置中心"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
    </div>

    <div class="animate__animated animate__fadeInUp">
      <van-cell is-link to="/account" class="cell-title">
        <template #title>
          <i class="bi bi-pencil-fill cell-title"></i>
          <span class="cell-title">用户信息</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-bell-fill cell-title"></i>
          <span class="cell-title">通知设置</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-x-circle-fill cell-title"></i>
          <span class="cell-title">清除缓存</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-exclamation-octagon cell-title"></i>
          <span class="cell-title">关于我们</span>
        </template>
      </van-cell>
      <van-cell is-link to="/" class="cell-title">
        <template #title>
          <i class="bi bi-bag-x-fill cell-title"></i>
          <span class="cell-title">隐私政策</span>
        </template>
      </van-cell>
      <van-cell is-link to="/audit" class="cell-title">
        <template #title>
          <i class="bi bi-cone-striped cell-title"></i>
          <span class="cell-title">帖子审核</span>
        </template>
      </van-cell>
    </div>
    <button type="button" class="btn fixed-bottom btn-block bg-dark btn-lg animate__animated animate__fadeInUp text-white logout-btn" @click="doLogout">退出登录</button>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const { mapMutations,mapState } = createNamespacedHelpers('warm')
export default {
  name: "Setting",
  computed:{
    ...mapState(['user'])
  },
  mounted () {
    this.changeIsShowFooterMenu(false)
  },
  methods: {
    ...mapMutations(['changeIsShowFooterMenu']),
    onClickLeft(){
      this.$router.push('/mine')
    },
    doLogout(){
      localStorage.setItem('isLogin','false')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.cell-title{
  margin-top: 1rem;
  font-size:20px;
}
.bi{
  padding-right: 0.8rem;
}
.logout-btn{
  margin:0 auto 5rem auto;
  border-radius: 1.5rem;
  width:80%
}
</style>
<style>
#back-nar .van-nav-bar__text,.van-nav-bar__title,.van-icon-arrow-left::before{
  font-size: 18px;
  color:black!important;
}
</style>
