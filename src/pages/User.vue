<template>
  <div class="user-container">
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <mu-card>
        <mu-card-header :title="user.loginname" :subTitle="user.score.toString()">
          <mu-avatar :src="user.avatar_url" slot="avatar"/>
        </mu-card-header>
      </mu-card>

      <div class="reply">
        <div class="title">最近回复：</div>
        <TopicList
          :topics = "user.recent_replies"
        />
      </div>

      <div class="topic">
      <div class="title">最近的话题：</div>
        <TopicList
          :topics = "user.recent_topics"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import cnode from '../api';
  import TopicList from '../components/TopicList';

  export default {
    name: 'user',
    data() {
      return {
        user: {},
        loading: true,
      };
    },
    created() {
      this.fetchUserInfo().then(data => {
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
    components: { TopicList }
  };
</script>

<style scoped>
  .user-container {
    padding-top: 5px;
  }
  .title {
    margin: 15px 0 5px 5px;
    font-size: 16px;
  }
  .reply {
    margin-top: 5px;
  }
  .topic {
    margin-top: 5px;
  }
</style>
