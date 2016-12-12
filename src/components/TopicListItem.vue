<template>
  <div>
    <div span="14" class="title">
      {{top?'[置顶] ':''}}
      <router-link :to="topicPath">
        {{title}}
      </router-link>
    </div>
    <div span="10" class="author">{{author.loginname}}</div>
  </div>
</template>

<script>

export default {
  name: 'topic-list-item',
  props: {
    top: Boolean,
    title: String,
    author: Object,
    topicId: String,
  },
  methods: {
  },
  computed: {
    topicPath() {
      return '/topic/' + this.topicId;
    },
  },
};
</script>

<style scoped>
  .title {
    color: #464c5b;
    font-size: 16px;
  }
</style>
