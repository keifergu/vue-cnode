<template>
  <div>
    <div class="avatar">
      <mu-avatar :src="user.avatar_url" @click.native="linkToLogin"/>
    </div>
    <mu-list-item @click="linkTo('home')">
      <router-link to="/home">首页</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('essence')">
      <router-link to="/essence">精华</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('question')">
      <router-link to="/question">问答</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('share')">
      <router-link to="/share">分享</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('jobs')">
      <router-link to="/jobs">工作</router-link>
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
      linkTo(path){
        this.$router.push(path)
        this.$store.dispatch('fetchTopicList')
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
