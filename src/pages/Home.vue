<template>
  <div id="list-container">
    <topic-list :topics="topics" />
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'

  export default {
    name: 'home',
    data() {
      return {
        container: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$store.dispatch("fetchTopicList")
      },
      listScroll() {
        var distance = this.container.getBoundingClientRect().bottom - window.innerHeight;
        console.log(distance)
      }
    },
    mounted() {
      this.container = document.getElementById("list-container")
      window.addEventListener("scroll", this.listScroll)
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
