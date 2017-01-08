<template>
  <div class="container">
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <mu-card>
        <mu-card-header :title="user.loginname" :subTitle="user.score">
          <mu-avatar :src="user.avatar_url" slot="avatar"/>
        </mu-card-header>
      </mu-card>
      <div class="reply">
        <mu-paper>
          <mu-content-block v-for="reply in user.recent_replies">
            <topic-list-item
              :topicId="reply.id"
              :top="reply.top"
              :title="reply.title"
              :author="reply.author"
            />
          </mu-content-block>
        </mu-paper>
      </div>

      <div class="topic">
        <mu-paper>
          <mu-content-block v-for="topic in user.recent_topics">
            <topic-list-item
              :topicId="topic.id"
              :top="topic.top"
              :title="topic.title"
              :author="topic.author"
            />
          </mu-content-block>
        </mu-paper>
      </div>

    </div>
  </div>
</template>

<script>
  import cnode from '../utils/api';
  import TopicListItem from './TopicListItem';

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
    components: { TopicListItem }
  };
</script>

<style scoped>
  .container {
    padding-top: 5px;
  }
  .reply {
    margin-top: 5px;
  }
  .topic {
    margin-top: 5px;
  }
</style>
