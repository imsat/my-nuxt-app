<template>
    <div class="">
      <h1>A single user, with ID: {{$route.params.id}}</h1>

      <nuxt-link to="/users">All Users</nuxt-link>
    </div>
</template>

<script>
  export default {
    validate(data){
      console.log(data)
      // return data.params.id == 1;
      return /^\d+$/.test(data.params.id);
    },
    layout: 'users'
  }
</script>
