<template>
  <mu-flexbox class="item-container">
    <div class="author">
      <mu-avatar :src="author.avatar_url"/>
    </div>
    <mu-flexbox-item grow="8" class="title">
      <div class="topic-title">
        <div class="topic-label" v-show="topic.top">
          置顶
        </div>
        <router-link :to="topicPath">
          {{topic.title}}
        </router-link>
      </div>
      <div class="sub-title">
        <div class="reply-count">
          {{topic.reply_count + "/" + topic.visit_count}}
        </div>
        <div class="reply-date">
          {{lastReplyDate}}前
        </div>
      </div>
    </mu-flexbox-item>
  </mu-flexbox>
</template>

<script>
import { mapState } from 'vuex'
import { toRelativeTime } from '../../utils'

export default {
  name: 'topic-list-item',
  props: {
    topic: Object,
  },
  methods: {
  },
  computed: {
    author() {
      return this.topic.author
    },
    topicPath() {
      return '/topic/' + this.topic.id;
    },
    // 返回最后一次回复的时间，格式为 xx小时 或 xx分钟
    lastReplyDate() {
      let mesc = new Date() - new Date(this.topic.last_reply_at);
      return toRelativeTime(mesc);
    }
  },
};
</script>

<style scoped>
.item-container {
  height: 50px;
  margin-left: 5px;
  padding-right: 15px;
}
.topic-label {
  display: inline-block;
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  border-radius: 5px;
  background: #4caf50;
}
.topic-title {
  width: 90%;
  display: block;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sub-title {
  display: block;
  color: #9e9e9e;
}
.reply-count {
  display: inline-block;
  font-size: 12px;
}
.reply-date {
  float: right;
  font-size: 12px;
}
a {
  color: black;
}
</style>
