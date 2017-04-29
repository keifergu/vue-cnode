<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'home',
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$store.dispatch("fetchTopicList")
      }
    },
    computed: {
      topics(){
        return this.$store.getters.currentTopicList
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
