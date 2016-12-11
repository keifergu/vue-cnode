<template>
  <Row>
    <i-col span="18" class="title">{{title}}</i-col>
    <i-col span="6" class="author">{{author.loginname}}</i-col>
  </Row>
</template>

<script>

export default {
  name: 'topic-list-item',
  props: {
    title: String,
    author: Object,
  },
  methods: {

  },
}
</script>

<style scoped>
  .title {
    color: #464c5b;
    font-size: 16px;
  }
</style>
