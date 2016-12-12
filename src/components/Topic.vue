<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      {{topic.title}}
      <div>
        <p>{{topic.author.loginname}}</p>
        <p>{{topic.create_at}}</p>
        <!-- <img :src="topic.author.avatar_url"> -->
      </div>
      <div v-html="topic.content"></div>

      <div v-for="reply in topic.replies">
        <div v-html="reply.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import cnode from '../utils/api';

  export default {
    name: 'topic',
    data() {
      return {
        topic: null,
        loading: true,
      };
    },
    created() {
      this.getTopic().then(data => {
        console.log(data)
        this.loading = false;
        this.topic = data;
      })
    },
    methods: {
      getTopic() {
        let topicId = this.$route.params.topicId;
        return cnode('topic_details',{
          pathParams: [topicId]
        })
      }
    }
  };
</script>
