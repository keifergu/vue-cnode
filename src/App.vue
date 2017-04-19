<template>
  <div>
    <mu-appbar class="appbar" title="CNode社区" :zDepth="1">
      <mu-icon-button icon="menu" slot="left" @click="toggle"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle">
      <mu-list-item @click="toggle">
        <router-link to="/">首页</router-link>
      </mu-list-item>
    </mu-drawer>
    <mu-row gutter class="container">
      <mu-col width="0" tablet="10" desktop="20" />
      <mu-col width="100" tablet="80" desktop="60">
        <router-view></router-view>
      </mu-col>
      <mu-col width="0" tablet="10" desktop="20" />
    </mu-row>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
.container {
  margin: 29px 2px 2px 2px;
}
.appbar {
  position: fixed;
  top: 0px;
  height: 55px;
}
a {
  color: black;
}
</style>
