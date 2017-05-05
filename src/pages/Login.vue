<template>
  <div class="login-container">
    <mu-flexbox-item>
      <qr-scanner class="scanner" @success="scannerData"/>
    </mu-flexbox-item>
    <mu-flexbox-item>
      <mu-text-field v-model="token" class="text" hintText="请输入你的 AccessToken "/>
    </mu-flexbox-item>
    <mu-flexbox-item>
       <mu-raised-button label="登录" primary @click="login" />
    </mu-flexbox-item>
    <mu-flexbox-item v-if="isLogin">
      登录成功
    </mu-flexbox-item>
  </div>
</template>

<script>
  import QrScanner from '../components/QrScanner/'

  export default {
    name: 'login',
    data() {
      return {
        loginInfo: '',
        token: ''
      }
    },
    methods: {
      login(){
        this.$store.dispatch("login",{
          token: this.token
        })
      },
      scannerData(payload) {
        console.log(payload)
        this.token = payload
        this.login()
      }
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    components: { QrScanner }
  }
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .text{
  }
</style>
