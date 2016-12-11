<template>
  <div id="app">
    <topic-list></topic-list>
  </div>
</template>

<script>
import TopicList from './components/TopicList'

export default {
  name: 'app',
  data() {
    return {};
  },
  components: {
    TopicList
  }
}
</script>
