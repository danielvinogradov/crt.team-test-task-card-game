<template>
  <div class="results">
    <h1>Результаты:</h1>

    <table v-if="results" class="table">
      <tr>
        <th>ID</th>
        <th>Дата (timestamp)</th>
        <th>Время в миллисекундах</th>
      </tr>
      <tr v-for="(cv) in results" :key="cv.id">
        <th>{{ cv.id }}</th>
        <th>{{ cv.date }}</th>
        <th>{{ cv.ms }}</th>
      </tr>
    </table>

    <p v-else>Результаты отсутствуют или загружаются.</p>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ResultsTable',
    computed: {
      ...mapGetters('CardGame/Results', {
        results: 'getResults', // массив результатов или null
      }),
    },
    methods: {
      ...mapActions('CardGame/Results', {
        onPageEnter: 'onPageEnter', // достает результаты из localStorage, если они там есть
        onPageLeave: 'onPageLeave', // удаляет данные из store
      }),
    },

    mounted() {
      this.onPageEnter();
    },

    beforeDestroy() {
      this.onPageLeave();
    },
  }
</script>

<style lang="scss">
  .table {
    width: 100%;
    text-align: left;

    & tbody {
      width: 100%;
    }
  }
</style>