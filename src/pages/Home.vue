<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import { mapActions, mapGetter } from 'vuex'
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'app',
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
        return this.$store.getters.allTopics
      }
    },
    components: { TopicList }
  }
</script>

<style scoped>
  .container {
    margin-top: 60px;
  }
  .appbar {
    position: fixed;
    top: 0px;
    height: 55px;
  }
  a {
    color: black;
  }
</style>
