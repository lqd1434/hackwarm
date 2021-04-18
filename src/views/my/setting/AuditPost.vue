<template>
  <div>
    <div>
      <van-nav-bar
          title="帖子审核"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
      <div class="list-group animate__animated animate__fadeInDown" v-for="item in posts" :key="item.ID">
        <div class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">{{ item.Title }}<span class="pl-2 text-primary">[{{ item.TagId }}]</span></h6>
            <small class="text-danger">{{ item.ID }}</small>
          </div>
          <div class="post-content mb-1 w-75">{{ item.Content }}</div>
          <small class="text-secondary">{{ item.CreatedAt }}</small>
          <div class="btn-group float-right">
            <div class="btn btn-primary mr-2" @click="audit(1,item.ID)">通过</div>
            <div class="btn btn-warning" @click="audit(2,item.ID)">阻止</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuditPost",
  data(){
    return{
      posts:[]
    }
  },
  mounted() {
    this.getAllPost().then((res)=>{
      this.posts = res.data.posts
    })
  },
  methods:{
    onClickLeft(){
      this.$router.push('/mine')
    },
    getAllPost(){
      return new Promise(((resolve) => {
        axios({
          url:'/api/admin/posts',
          method:'get',
          headers:{
            Authorization:'Bearer ' + localStorage.getItem('myToken')
          }
        }).then((res)=>{
          if (res.data.code === 0){
            resolve(res.data)
          } else {
            this.$toast({
              type: 'fail',
              message:'获取审核列表失败'
            })
          }
        })
      }))
    },
    audit(status,id){
      axios({
        url:'/api/admin/post/'+id+'/'+status,
        method:'put',
        headers:{
          Authorization:'Bearer ' + localStorage.getItem('myToken')
        }
      }).then((res)=>{
        if (res.data.code === 0){
          this.$toast({
            type: 'success',
            message:'审核通过'
          })
        } else {
          this.$toast({
            type: 'success',
            message:res.data.msg
          })
        }
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
.btn{
  border-radius: 0.3rem;
}
</style>
