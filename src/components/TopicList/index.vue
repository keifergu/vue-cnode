<template>
  <mu-paper class="list-container">
    <div v-for="topic of topics">
      <topic-list-item
        :topic="topic"
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
