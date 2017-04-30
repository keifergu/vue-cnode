<template>
  <div class="login-container">
    <qr-scanner />
  </div>
</template>

<script>
  import QrScanner from '../components/QrScanner'
  console.log(QrScanner)
  export default {
    name: 'login',
    components: { QrScanner }
  }
</script>

<style scoped>
  .login-container {
    margin: ;
  }
</style>
