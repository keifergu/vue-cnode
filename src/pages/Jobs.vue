<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'jobs',
    computed: {
      topics(){
        return this.$store.getters.jobTopics
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
