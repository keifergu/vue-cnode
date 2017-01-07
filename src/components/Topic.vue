<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <div v-else class="container">
      <!-- 文章内容 -->
      <mu-paper>
        <div class="content">
          <div class="title">
            {{topic.title}}
          </div>
          <div class="topic-info">
            <p class="name">{{topic.author.loginname + "创建于"}}</p>
            <p class="time">{{topic.create_at}}</p>
            <!-- <img :src="topic.author.avatar_url"> -->
          </div>
          <mu-divider />
          <div>
            <div v-html="topic.content">
          </div>
        </div>
      </mu-paper>
      <!-- 回复 -->
      <mu-paper>
        <div class="content">
          <div>共{{topic.reply_count}}条回复：</div>
          <div v-for="reply in topic.replies">
            {{reply.author.loginname}}:
            <div v-html="reply.content"></div>
            <mu-divider />
          </div>
        </div>
      </mu-paper>
    </div>
  </div>
</template>

<script>
  import cnode from '../utils/api';

  export default {
    name: 'topic',
    data() {
      return {
        topic: null,
        loading: true,
      };
    },
    created() {
      this.getTopic().then(data => {
        console.log(data)
        this.loading = false;
        this.topic = data;
      })
    },
    methods: {
      getTopic() {
        let topicId = this.$route.params.topicId;
        return cnode('topic_details',{
          pathParams: [topicId]
        })
      }
    }
  };
</script>

<style scoped>
  .container {
    margin-top: 4px;
    margin-left: 4px;
    margin-right: 4px;
  }
  .content {
    padding-top: 5px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .title {
    font-size: 19px;
  }
  .topic-info {
    width: 100%;
    float: left;
  }
  .name {
    float: left;
  }
  .time {
    float: left;
  }
</style>
