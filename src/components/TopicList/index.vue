<template>
  <mu-paper class="list-container">
    <transition-group
      name="list"
      tag="div"
    >
      <topic-list-item
        v-for="topic of topics"
        :topic="topic"
        :key="topic.id"
        class="list-item"
      />
    </transition-group>
  </mu-paper>
</template>

<script>

import TopicListItem from './TopicListItem'

export default {
  name: 'topic-list',
  props: {
    topics: Array
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
  .list-item {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateX(100px);
  }
  .list-leave-active {
    position: absolute;
  }
  a {
    color: black;
  }
</style>
