<template>
  <div class="img-container">
    <img :src="imgurl" :alt="alt" class="img">
  </div>
</template>

<script>
  export default {
    name: 'card-game-cards-item-img',
    props: {
      /**
       * Путь до файла картинки
       * @type {string}
       */
      imgurl: { type: String, default: null, },

      /**
       * Атрибут alt для картинки
       * @type {string}
       */
      alt: { type: String, default: '', },
    }
  }
</script>

<style scoped lang="scss">
  .img-container {
    display: block;
    width: 100%;
    height: 100%;

    border-radius: 2px;
    overflow: hidden;
  }

  .img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>