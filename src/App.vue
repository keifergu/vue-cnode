<template>
  <div>
    <mu-appbar class="appbar" :title="title" :zDepth="1">
      <mu-icon-button :icon="icon" slot="left" @click="iconClick" />
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle">
      <navigator @click.native="toggle" />
    </mu-drawer>
    <mu-row gutter class="container">
      <mu-col width="0" tablet="10" desktop="20" />
      <mu-col width="100" tablet="80" desktop="60">
        <transition name="fade" class="router-view">
          <router-view></router-view>
        </transition>
      </mu-col>
      <mu-col width="0" tablet="10" desktop="20" />
    </mu-row>
  </div>
</template>

<script>

import Navigator from './components/Navigator'

export default {
  name: 'app',
  data() {
    return {
      open: false,
      docked: true
    };
  },
  methods: {
    toggle(flag) {
      this.open = !this.open;
      this.docked = !this.docked;
    },
    iconClick() {
      if (this.topic)
        this.$router.go(-1)
      else
        this.toggle()
    }
  },
  computed:{
    topic() {
      return this.$store.getters.currentTopic
    },
    title() {
      return this.topic ? this.topic.title : 'CNode.js 中文社区'
    },
    icon(){
      return this.topic ? "arrow_back" : "menu"
    }
  },
  components: { Navigator }
}
</script>

<style scoped>
  .container {
    margin-top: 60px;
  }
  .appbar {
    position: fixed;
    top: 0px;
    height: 55px;
  }
  .router-view {
    transition: all .7s;
  }
  .fade-enter,.fade-leave-active {
    opacity: 0;
  }
  .fade-leave-active {
  }
  a {
    color: black;
  }
</style>
