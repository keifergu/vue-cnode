<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'question',
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$store.dispatch("fetchTopicList", {
          tab: 'ask'
        })
      }
    },
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
