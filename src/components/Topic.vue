<template>
  <div class="container">
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <!-- 文章内容 -->
      <mu-paper class="content">
        <div class="title">
          {{topic.title}}
        </div>
        <div class="topic-info">
          <span class="time">- 发布 {{createdDate}}前</span>
          <span class="name">- 作者 {{topic.author.loginname}}</span>
          <!-- <img :src="topic.author.avatar_url"> -->
        </div>
        <mu-divider />
        <div class="topic-content">
          <div v-html="topic.content">
        </div>
      </mu-paper>
      <!-- 回复 -->
      <mu-paper class="reply">
        <div class="reply-title">共{{topic.reply_count}}条回复：</div>
        <mu-divider/>
        <div v-for="reply in topic.replies">
          <topic-reply
            :author="reply.author"
            :content="reply.content"
            :replyTime="reply.create_at"
          />
          <mu-divider/>
        </div>
      </mu-paper>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { toRelativeTime } from '../utils/';
  import TopicReply from './TopicReply'

  export default {
    name: 'topic',
    data() {
      return {
        loading: false,
        topicId: ''
      };
    },
    created() {
      this.fetchTopic(this.$route.params.topicId)
    },
    methods: {
      ...mapActions([
        'fetchTopic'
      ])
    },
    computed: {
      ...mapState({

      }),
      topic() {
        return this.$store.state.topics[this.$route.params.topicId]
      },
      createdDate() {
        let mesc = new Date() - new Date(this.topic.create_at);
        return toRelativeTime(mesc);
      },
    },
    components: { TopicReply }
  };
</script>

<style scoped>
  .container {
    margin: ;
  }
  .content {
    padding: 10px;
    word-break: break-all;
  }
  .topic-content {
    margin-top: 10px;
  }
  .reply {
    margin-top: 10px;
    padding-top: 10px;
    top: 5px;
  }
  .reply-title {
    margin-left: 10px;
  }
  .title {
    font-size: 20px;
  }
  .topic-info {
    color: #616161;
    font-size: 12px;
    display: inline-block;
  }
  .topic-info li {
  }
</style>
