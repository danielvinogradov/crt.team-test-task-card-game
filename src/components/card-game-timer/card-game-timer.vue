<template>
  <p class="timer">
    {{ timerString }}
  </p>
</template>

<script>
  const INTERVAL_MS = 1000;

  export default {
    name: 'card-game-timer',
    props: {
      /**
       * Время начала в миллисекундах или null, если игра не началась.
       */
      ms: { type: Number, default: null, },
    },
    data() {
      return {
        /**
         * Тут будет храниться время игры в миллисекундах
         * или null, если игра не идет.
         * @type {number|null}
         */
        timestamp: null,

        /**
         * Интервал для обновления timestamp.
         * @type {number|null}
         */
        interval: null,
      }
    },
    computed: {
      /**
       * Возвращает строку для отображения в таймере.
       * @returns {string|number}
       */
      timerString() {
        if (this.timestamp) return `Игра идет: ${this.timestamp} миллисекунд.`
        else return 'Начтите игру, нажав на любую карточку'
      }
    },

    methods: {
      /**
       * Устанавливает интервал для обновления timestamp.
       */
      startIntervalCountdown() {
        this.interval = setInterval(this.updateTimestamp, INTERVAL_MS);
      },

      /**
       * Удаляет интервал.
       */
      stopIntervalCountdown() {
        clearInterval(this.interval);
      },

      /**
       * Функция для использования в качестве параметра в startIntervalCoundown.
       * Обновляет timestamp на разницу между датой начала игры (передается через props.ms)
       * и текущим timestamp.
       */
      updateTimestamp() {
        this.timestamp = Date.now() - this.ms;
      },

      /**
       * Обнуляет timestamp (т.е. устанавливает в null).
       */
      resetTimestamp() {
        this.timestamp = null;
      }
    },

    mounted() {
      // если передается сразу сразу число, то устанавливаем интервал
      if (this.ms) this.startIntervalCountdown()
    },

    beforeDestroy() {
      // удаляем интервал перед удалением компонента
      this.stopIntervalCountdown();
    },

    watch: {
      'ms': {
        handler: function (newVal) {
          if (newVal === null) {
            // если получаем Null удаляем интервал
            // и делаем ресет timestamp (т.е. выставляем в null)
            this.stopIntervalCountdown();
            this.resetTimestamp();
          } else {
            // запускаем интервал
            this.startIntervalCountdown();
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .timer {
    margin: 0;
    padding: 0;
  }
</style>