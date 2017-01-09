<template>
  <mu-paper class="container">
    <div v-for="reply in replies">
      <div class="avatar"></div>
    </div>
  </mu-paper>
</template>

<script>

export default {
  name: 'topic-reply',
  props: {
    replies: Array
  },
  computed: {

  },
  components: {

  }
}
</script>

<style scoped>
.container {

}
</style>
