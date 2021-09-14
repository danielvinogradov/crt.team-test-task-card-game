<template>
  <section class="bar">
    <slot/>
  </section>
</template>

<script>
  export default {
    name: 'card-game-bar',
  }
</script>

<style scoped lang="scss">
  .bar {
    width: 100%;
    padding: 25px 0;
  }
</style>