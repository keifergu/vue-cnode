<template>
  <div>
    <div class="user">
      <mu-list-item>
        <mu-avatar :src="user.avatar_url" @click.native="linkTo('login')"/>
      </mu-list-item>
      <mu-list-item>
        <div>点击登录</div>
    </mu-list-item>
    </div>
    <mu-divider />
    <mu-list-item @click="linkTo('home')">
      <mu-icon slot="left" value="home"/>
      <router-link to="/home">首页</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('essence')">
      <mu-icon slot="left" value="thumb_up"/>
      <router-link to="/essence">精华</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('question')">
      <mu-icon slot="left" value="question_answer"/>
      <router-link to="/question">问答</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('share')">
      <mu-icon slot="left" value="supervisor_account"/>
      <router-link to="/share">分享</router-link>
    </mu-list-item>
    <mu-list-item @click="linkTo('jobs')">
      <mu-icon slot="left" value="work"/>
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
        this.$router.push({ path })
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
