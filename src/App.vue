<template>
  <router-view></router-view>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const { mapMutations } = createNamespacedHelpers('warm')
export default {
  name: 'App',
  methods:{
    ...mapMutations(['closeSocket'])
  },
  mounted: function () {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('myToken')
      localStorage.removeItem('isLogin')
      this.closeSocket()
    })
  }
}
</script>

<style>

</style>
