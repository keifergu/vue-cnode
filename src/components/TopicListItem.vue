<template>
  <mu-flexbox>
    <mu-flexbox-item grow="5" class="title">
      {{top?'[置顶] ':''}}
      <router-link :to="topicPath">
        {{title}}
      </router-link>
    </mu-flexbox-item>
    <mu-flexbox-item grow="1" class="author">
      {{author.loginname}}
    </mu-flexbox-item>
  </mu-flexbox>
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
