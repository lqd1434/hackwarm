<template>
  <div>
    <van-nav-bar
        title="用户信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div>
      <van-cell is-link class="cell-title" to="/updateSer">
        <template #title>
          <i class="bi bi-shield-lock-fill cell-title"></i>
          <span class="cell-title">账号设置</span>
        </template>
      </van-cell>
      <van-cell is-link  class="cell-title" to="/updateInfo">
        <template #title>
          <i class="bi bi-pencil-fill cell-title"></i>
          <span class="cell-title">个人资料</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const { mapState } = createNamespacedHelpers('warm')
export default {
  name: "Account",
  data(){
    return{
        isShow: true,
    }
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    onClickLeft(){
      this.$router.push('/setting')
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
</style>
