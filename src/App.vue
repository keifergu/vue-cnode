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
    <mu-row gutter>
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
