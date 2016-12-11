<template>
  <div>
    <div v-for="topic in topics">
      <topic
        :title="topic.title"
        :loginname="topic.author.loginname">

      </topic>
    </div>
  </div>
</template>

<script>
import Topic from './Topic'

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
      console.log(data);
      this.$data.topics = data;
    });
    return {
      'topics': null,
    };
  },
  methods: {
    getTopics() {
      let topicsApi = CNODE.concat(API.topics.url);
      return fetch(topicsApi).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(json => {
        return json.data;
      });;
    },
  },
  components: {
    Topic
  }
}
</script>

