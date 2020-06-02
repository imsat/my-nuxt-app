<template>
    <h1 class="center-3 danger">An error occurred, we are sorry!!</h1>
</template>

<style scoped >
  .center-1 {
    position: fixed;  /* or absolute */
    top:50%;
    left: 50%;
  }

  .center-2 {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -100px;
  }
  .center-3 {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
  }

  .danger {
    color: red;
  }
</style>
