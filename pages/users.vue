<template>
  <div class="container">
    <input type="text" v-model="userId">
    <button type="button" @click="onloadUser">Load User</button>
    <nuxt-child />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: '',
      }
    },
    methods: {
      onloadUser() {
        this.$router.push('/users/' + this.userId)
      }
    },
    layout: 'users'
  }
</script>


