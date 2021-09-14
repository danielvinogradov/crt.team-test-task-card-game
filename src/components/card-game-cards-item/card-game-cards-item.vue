<template>
  <li class="item" :class="{'item-hidden': item.itemStatus === 'hidden'}" v-if="item" @click="onClickHandler">
    <CardGameCardsItemImg :imgurl="item.imgURL" v-if="item.itemStatus === 'open'"/>
    <div class="item-closed" v-else-if="item.itemStatus === 'closed'"></div>
  </li>
</template>

<script>
  import CardGameCardsItemImg from "../card-game-cards-item-img/card-game-cards-item-img";

  export default {
    name: 'card-game-cards-item',
    components: { CardGameCardsItemImg },
    props: {
      /**
       * В каком состоянии находится карточка. За это отвечает item.itemStatus
       * open - карточка открыта, картинка показывается
       * closed - карточка закрыта, картинка не показывается
       * hidden - не показывается вообще ничего, события не эмитятся
       */

      /**
       * Объект карточки.
       * @type {Card}
       */
      item: { type: Object, default: null, },

    },

    methods: {
      /**
       * Обработчик нажатия на карточку.
       * Если карточка имеет статус 'open|'closed', то эмитит событие click
       * Если карточка имеет статус 'hidden', то ничего не происходит
       */
      onClickHandler() {
        if (this.item.itemStatus !== 'hidden') this.$emit('click');
      }
    }
  }
</script>

<style scoped lang="scss">
  .item {
    padding: 5px;
    width: 16%;
    height: 200px;

    cursor: pointer;
    transition: .4s;

    :hover {
      opacity: .8;
    }

    :active {
      transition: 0s;
      opacity: .4;
    }
  }

  .item-closed {
    width: 100%;
    height: 100%;

    border-radius: 2px;
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' fill='%23fff'%3E%3Cpath d='M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z'/%3E%3C/svg%3E");
    background-position: center center;
    background-size: 50%;
    background-repeat: no-repeat;
  }
</style>