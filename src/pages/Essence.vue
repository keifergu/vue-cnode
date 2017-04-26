<template>
  <div>
    <topic-list :topics="topics"/>
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'essence',
    computed: {
      topics(){
        var res = this.$store.getters.essenceTopics
        console.log(res)
        return res
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
