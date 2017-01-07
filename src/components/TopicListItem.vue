<template>
  <mu-flexbox class="item">
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
.item {
  height: 50px;
}
.title {
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
a {
  color: black;
}
</style>
