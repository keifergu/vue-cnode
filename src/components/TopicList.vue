<template>
  <div>
    <div v-for="topic in topics">
      <topic-list-item
        :topicId="topic.id"
        :top="topic.top"
        :title="topic.title"
        :author="topic.author"
        class="topic-item"
      />
    </div>
  </div>
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
  .topic-item {
    margin-top: 10px;
  }
</style>
