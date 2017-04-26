<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'share',
    computed: {
      topics(){
        return this.$store.getters.shareTopics
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
