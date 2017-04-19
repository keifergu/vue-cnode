<template>
  <mu-paper class="container">
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
import { mapActions, mapState } from 'vuex'
import TopicListItem from './TopicListItem'

export default {
  name: 'topic-list',
  data() {
    return {
    }
  },
  created() {
    this.fetchTopicList()
  },
  methods: {
    ...mapActions([
      'fetchTopicList'
    ])
  },
  computed: {
    ...mapState([
      'topics'
    ])
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
