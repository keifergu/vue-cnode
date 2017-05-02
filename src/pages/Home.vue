<template>
  <div id="list-container">
    <topic-list :topics="topics" />
  </div>
</template>

<script>
  import TopicList from '../components/TopicList/index'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        container: '',
        fetchStatus: true
      }
    },
    created() {
      this.fetchData({next: false})
    },
    methods: {
      fetchData({next}){
        this.$store.dispatch("fetchTopicList", {
          next
        })
      },
      listScroll() {
        var distance = this.container.getBoundingClientRect().bottom - window.innerHeight;
        if (distance < 200 && this.fetchStatus) {
          this.fetchStatus = false
          this.fetchData( {next: true} )
        } else if (distance > 200) {
          this.fetchStatus = true
        }
      }
    },
    mounted() {
      this.container = document.getElementById("list-container")
      window.addEventListener("scroll", this.listScroll)
    },
    computed: {
      ...mapGetters({
        topics: 'currentTopicList'
      }),
    },
    components: { TopicList }
  }
</script>

<style scoped>
  a {
    color: black;
  }
</style>
