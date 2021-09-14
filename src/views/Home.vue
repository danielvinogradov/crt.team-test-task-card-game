<template>
  <div>
    <CardGameBar>
      <CardGameTimer :ms="ms"/>
      <CardGameResultInformer v-if="showInformer" @close="onInformerClose"/>
    </CardGameBar>
    <CardGameCardsList :cards="cards"/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CardGameCardsList from '../components/card-game-cards-list/card-game-cards-list';
  import CardGameBar from '../components/card-game-bar/card-game-bar';
  import CardGameTimer from '../components/card-game-timer/card-game-timer';
  import CardGameResultInformer from '../components/card-game-result-informer/card-game-result-informer';

  export default {
    name: 'Home',
    components: { CardGameResultInformer, CardGameTimer, CardGameBar, CardGameCardsList },
    computed: {
      ...mapGetters('CardGame/Gameplay', {
        cards: 'getCards', // массив с карточками
        ms: 'getGameStartTimestamp', // дата начала игры (timestamp в миллисекундах) или null, если игра не начиналась
      }),

      ...mapGetters('CardGame/Results', {
        showInformer: 'getInformerStatus', // показывать ли информер (плашка с результатами)
      })
    },

    methods: {
      ...mapActions('CardGame/Gameplay', {
        onPageEnter: 'onPageEnter', // создает массив с карточками
        onPageLeave: 'onPageLeave', // удаляет данные
      }),

      ...mapActions('CardGame/Results', {
        onInformerClose: 'onInformerClose', // закрыть информер (плашка с результатами)
      }),
    },

    mounted() {
      this.onPageEnter();
    },

    beforeDestroy() {
      this.onPageLeave();
    }
  }
</script>
