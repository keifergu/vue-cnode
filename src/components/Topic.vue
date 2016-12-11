<template>
  <div>
  {{title}}:{{loginname}}
  </div>
</template>

<script>

export default {
  name: 'topic',
  props: {
    title: String,
    loginname: String,
  },
  methods: {

  },
}
</script>

