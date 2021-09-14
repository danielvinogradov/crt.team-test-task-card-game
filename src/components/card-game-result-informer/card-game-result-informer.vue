<template>
  <section class="informer">
    <p class="informer__text">{{ `Game Over!`.toUpperCase() }}</p>
    <router-link to="/results">Посмотреть таблицу результатов.</router-link>
    <button class="informer__close" @click="$emit('close')">Закрыть</button>
  </section>
</template>

<script>
  export default {
    name: 'card-game-result-informer'
  }
</script>

<style scoped lang="scss">
  .informer {
    margin: 25px auto;
    padding: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 2px;
    border: 1px solid darkgray;
  }

  .informer__text {
    margin: 0;
    padding: 0;
  }

  .informer__close {
    padding: 10px 25px;

    border: none;
    background-color: blue;
    color: #fff;
    border-radius: 2px;

    cursor: pointer;

    transition: .4s;

    &:hover {
      opacity: .8;
    }

    &:active {
      transition: 0s;
      opacity: .4;
    }
  }
</style>