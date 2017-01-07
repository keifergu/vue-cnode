<template>
  <mu-paper class="container">
    <div v-for="topic in topics">
      <topic-list-item
        :topicId="topic.id"
        :top="topic.top"
        :title="topic.title"
        :author="topic.author"
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
      this.$data.topics = data;
    });
  },
  methods: {
    getTopics() {
      return cnode('topic_home');
    },
  },
  components: {
    TopicListItem
  }
}
</script>

<style scoped>
.container {
  margin-top: 5px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
.topic-item {
  margin-bottom: 0;
  margin-left: 2px;
}
a {
  color: black;
}
</style>
