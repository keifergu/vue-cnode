<template>
  <div class="topic-container">
    <div v-show="loading">
      loading...
    </div>
    <transition name="fade">
      <div v-show="!loading">
        <!-- 文章内容 -->
        <mu-paper class="paper-content">
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
            <div v-html="topic.content"></div>
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
        <mu-paper class="editor-box">
          <reply-editor />
        </mu-paper>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { toRelativeTime } from '../utils/'
  import TopicReply from '../components/TopicReply'
  import ReplyEditor from '../components/ReplyEditor'

  export default {
    name: 'topic',
    created() {
      this.fetchTopicByPath()
    },
    methods: {
      ...mapActions([
        'fetchTopicByPath'
      ])
    },
    computed: {
      ...mapGetters({
        topic: 'currentTopic'
      }),
      loading() {
        return this.topic === undefined
      },
      createdDate() {
        let mesc = new Date() - new Date(this.topic.create_at);
        return toRelativeTime(mesc);
      },
    },
    components: { TopicReply, ReplyEditor }
  };
</script>

<style scoped>
  .topic-container{
    margin: ;
  }
  .paper-content {
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
  .editor-box {
    margin: 10px auto 100px auto;
  }
  .topic-info li {
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
