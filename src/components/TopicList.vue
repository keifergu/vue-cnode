<template>
  <div>
    <div v-for="topic in topics">
      <topic-list-item
        :title="topic.title"
        :author="topic.author">

      </topic-list-item>
    </div>
  </div>
</template>

<script>
import {cnode} from '../api.js';
import TopicListItem from './TopicListItem'

const CNODE = 'https://cnodejs.org/api/v1';
const API = {
  topics: {
    url: '/topics',
    params: {
      page: 1,
      limit: 10,
    },
  },
};

export default {
  name: 'topic-list',
  data() {
    this.getTopics().then(data => {
      this.$data.topics = data;
    });
    return {
      'topics': null,
    };
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

