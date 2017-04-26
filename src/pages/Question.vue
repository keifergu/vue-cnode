<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'question',
    computed: {
      topics(){
        return this.$store.getters.questionTopics
      }
    },
    components: { TopicList }
  }
</script>

<style scoped>
  a {
    color: black;
  }
</style>
