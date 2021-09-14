<template>
  <ul class="list" v-if="cards">
    <CardGameCardsItem
        v-for="(cv) in cards"
        :key="cv.uuid"
        :item="cv"
        @click="onCardClickHandler({uuid: cv.uuid})"
    />
  </ul>
</template>

<script>
  import CardGameCardsItem from "../card-game-cards-item/card-game-cards-item";
  import { mapActions } from 'vuex';

  export default {
    name: "card-game-cards-list",
    components: { CardGameCardsItem },
    props: {
      /**
       * Массив карточек.
       */
      cards: { type: Array, default: null, },
    },

    methods: {
      ...mapActions('CardGame/Gameplay', {
        onCardClickHandler: 'onCardClick', // обработчик нажатия на карточку
      })
    }
  }
</script>

<style scoped lang="scss">
  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>