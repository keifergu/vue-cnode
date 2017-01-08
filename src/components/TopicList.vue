<template>
  <mu-paper class="container">
    <div v-for="topic in topics">
      <topic-list-item
        :top="topic.top"
        :good="topic.good"
        :topicId="topic.id"
        :title="topic.title"
        :author="topic.author"
        :replyCount="topic.reply_count"
        :visitCount="topic.visit_count"
        :lastReplyTime="topic.last_reply_at"
        class="topic-item"
      />
      <mu-divider />
    </div>
  </mu-paper>
</template>

<script>
import cnode from '../utils/api.js';
import TopicListItem from './TopicListItem'

export default {
  name: 'topic-list',
  data() {
    return {
      'topics': {},
    };
  },
  created() {
    this.getTopics().then(data => {
      console.log(data)
      this.$data.topics = data;
    });
  },
  methods: {
    getTopics() {
      return cnode('topic_home');
    },
  },
  computed: {

  },
  components: {
    TopicListItem
  }
}
</script>

<style scoped>
.container {

}
a {
  color: black;
}
</style>
