<template>
  <mu-paper class="list-container">
    <div v-for="topic in topics">
      <topic-list-item
        :topicId="topic.id"
        class="topic-item"
      />
      <mu-divider />
    </div>
  </mu-paper>
</template>

<script>

import TopicListItem from './TopicListItem'

export default {
  name: 'topic-list',
  props: {
    topics: Object
  },
  methods: {

  },
  computed: {

  },
  components: {
    TopicListItem
  }
}
</script>

<style scoped>
  .list-container {
  }
  a {
    color: black;
  }
</style>
