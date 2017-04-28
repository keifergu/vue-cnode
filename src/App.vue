<template>
  <div>
    <mu-appbar class="appbar" title="CNode社区" :zDepth="1">
      <mu-icon-button icon="menu" slot="left" @click="toggle"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle">
      <navigator @click.native="toggle" />
    </mu-drawer>
    <mu-row gutter class="container">
      <mu-col width="0" tablet="10" desktop="20" />
      <mu-col width="100" tablet="80" desktop="60">
        <transition>
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
      docked: true,
    };
  },
  methods: {
    toggle(flag) {
      this.open = !this.open;
      this.docked = !this.docked;
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
.fade-enter {
  opacity: 0
}
.fade-enter-active {
  transition: opacity 1s
}
a {
  color: black;
}
</style>
