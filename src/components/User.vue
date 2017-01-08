<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <div>
        {{user.loginname+" "+user.score}}
      </div>
      <div v-for="reply in user.recent_replies">
        {{reply.author.loginname+" "+reply.title}}
      </div>
      <div v-for="topic in user.recent_topics">
        {{topic.author.loginname+" "+topic.title}}
      </div>
    </div>
  </div>
</template>

<script>
import cnode from '../utils/api';

export default {
  name: 'user',
  data() {
    return {
      user: '',
      loading: true,
    };
  },
  created() {
    this.fetchUserInfo().then(data => {
        console.log(data)
        this.user = data;
        this.loading = false;
      })
  },
  methods: {
    fetchUserInfo() {
      let loginname = this.$route.params.loginname;
      return cnode('user_info',{
        pathParams: [loginname]
      });
    }
  },
};
</script>

<style scoped>

</style>
