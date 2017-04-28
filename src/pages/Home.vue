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
    update() {
      console.log('update')
    },
    methods: {
      fetchData(){
        this.$store.dispatch("fetchTopics")
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
