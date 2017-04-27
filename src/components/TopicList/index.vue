<template>
  <mu-paper class="list-container">
    <transition-group
      v-for="topic of topics"
      name="list"
      tag="div"
    >
      <topic-list-item
        :topic="topic"
        :key="topic.id"
        class="topic-item"
      />
    </transition-group>
  </mu-paper>
</template>

<script>

import TopicListItem from './TopicListItem'

export default {
  name: 'topic-list',
  props: {
    topics: Array | Object
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
  .list-move {
    transition: transform 1s;
  }
  a {
    color: black;
  }
</style>
