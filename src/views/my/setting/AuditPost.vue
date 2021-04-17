<template>
  <div>
    <div>
      <van-nav-bar
          title="帖子审核"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
      <div class="list-group" v-for="n in 10" :key="n">
        <div class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">标题<span class="pl-2">[类型]</span></h5>
            <small>id</small>
          </div>
          <div class="post-content mb-1 w-75">Some placeholder content in a paragraph.</div>
          <small>And some small print.</small>
          <div class="btn-group float-right">
            <div class="btn btn-primary mr-2">按钮</div>
            <div class="btn btn-warning">按钮</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuditPost",
  methods:{
    onClickLeft(){
      this.$router.push('/setting')
    }
  }
}
</script>

<style scoped>

</style>
