<template>
  <div>
    <div class="avatar">
      <mu-avatar :src="user.avatar_url" @click.native="linkToLogin"/>
    </div>
    <mu-list-item>
      <router-link to="/">首页</router-link>
    </mu-list-item>
  </div>
</template>

<script>


  export default {
    name: 'navigator',
    data() {
      return {
        user: {
          avatar_url: ''
        }
      }
    },
    methods: {
      linkToLogin(){
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped>
  .avatar {
    margin: 20px 0 0 10px;
  }
  a {
    color: black;
  }
</style>
