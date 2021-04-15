<template>
  <div>
    <img src="/images/treeHole2.jpeg" class="tree-hole">
    <div class="heart-btn talk">
      <van-button type="primary" block
                  color="linear-gradient(to right, #EED09F, #25BBCF)"
      >倾诉</van-button>
    </div>
    <div class="heart-btn hear">
      <van-button type="primary" block
                  color="linear-gradient(to right, #F3E8F3, #A9E8A9)"
      >倾听</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeartWords"
}
</script>

<style scoped>
.tree-hole{
  border-radius: 0!important;
  width: 100%;
}
.heart-btn{
  margin: 20px auto;
  width: 90%;
  line-height: 100px;
  border-radius: 10px;
  font-size: 40px;
}
.talk{
  text-align: center;
}
</style>

<style>
.hear .van-button--normal{
  color: #1fc39e!important;
  border-radius: 15px;
  font-size: 30px;
  height: 80px;
}
.talk .van-button--normal{
  color: coral!important;
  border-radius: 15px;
  font-size: 30px;
  height: 80px;
}

</style>
