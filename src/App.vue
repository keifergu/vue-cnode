<template>
  <div>
    <mu-appbar title="CNode.js中文社区" :zDepth="5">
      <mu-icon-button icon="menu" slot="left" @click="toggle()"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list-item @click="toggle()">
        <router-link to="/">首页</router-link>
      </mu-list-item>
    </mu-drawer>
    <router-view></router-view>
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
