<template>
  <div class="container">
    <div class="title">
      <mu-avatar :src="author.avatar_url" class="avatar"/>
      <div class="name">{{author.loginname}}</div>
      <div class="time">{{replyDate}}前</div>
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import { toRelativeTime } from '../utils/utils';

export default {
  name: 'topic-reply',
  props: {
    author: Object,
    content: String,
    replyTime: String
  },
  computed: {
    replyDate() {
      let mesc = new Date() - new Date(this.replyTime);
      return toRelativeTime(mesc);
    },
  },
}
</script>

<style scoped>
.container {

}
.title {
  height: 40px;
  display: block;
}
.avatar {
  display: inline-block;
  float: left;
}
.name {
  margin: 10px 8px;
  font-size: 15px;
  display: inline-block;
}
.time {
  color: #424242;
  font-size: 12px;
  display: inline-block;
}
.content {
  display: block;
}
</style>
