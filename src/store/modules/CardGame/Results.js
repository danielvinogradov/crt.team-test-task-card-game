/**
 * Модуль для работы с результатами игры из CardGame/Gameplay
 */

import { nanoid } from 'nanoid';

/**
 * Идентификатор для хранения данных результатов в localStorage.
 * @type {string}
 */
const LOCAL_STORAGE_RESULTS_KEY = 'card-game-results';

export const Results = {
    namespaced: true,

    state() {
        return {
            /**
             * Массив объектов с результатами.
             * @type {Array}
             */
            results: null,

            /**
             * Показывать ли плашку информера (card-game-result-informer.vue)
             * с информацией об окончании игры и предложением перейти в результаты.
             * Показывается на странице Home.vue
             * @type {boolean}
             */
            showInformer: false,
        }
    },

    getters: {
        /**
         * Получить массив объектов с результатами.
         * @returns {Array}
         */
        getResults: (state) => state.results,

        /**
         * Dummy Getter для state.showInformer
         * @returns {boolean}
         */
        getInformerStatus: (state) => state.showInformer,
    },

    mutations: {
        /**
         * Установить массив результатов.
         * @param val
         */
        setResults: (state, val) => {
            state.results = val;
        },

        /**
         * Добавить новый результат.
         * @param val
         */
        addNewResult: (state, val) => {
            if (state.results === null) state.results = []
            state.results.push(val);
        },

        /**
         * Показывать / не показывать информер.
         * @param {boolean} val
         */
        setShowInformer: (state, val) => {
            state.showInformer = val;
        }
    },

    actions: {
        /**
         * Обработчик mounted() в ResultsTable.vue.
         * Устанавливает данные из localStorage в state.results
         */
        onPageEnter({ commit }) {
            const storageResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY));
            if (storageResults) commit('setResults', storageResults);
        },

        /**
         * Обработчик beforeDestroy() в ResultsTable.vue.
         * Удаляет данные из state. Закрывает информер.
         */
        onPageLeave({ commit }) {
            commit('setResults', null);
            commit('setShowInformer', false);
        },

        /**
         * Обработчик нового результата.
         * @param {string} id – уникальный идентификатор результата, генерируется автоматически
         * @param {number} date - время, когда был достигнут результат (timestamp в миллисекундах)
         * @param {number} ms – время в миллисекундах
         */
        onNewResult({ getters, commit }, { id = nanoid(), date = Date.now(), ms }) {
            commit('setShowInformer', true);
            // добавляем новый результат
            commit('addNewResult', { id, date, ms });
            // переписываем данные в localStorage
            localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(getters.getResults))
        },

        /**
         * Закрыть информер.
         */
        onInformerClose({ commit }) {
            commit('setShowInformer', false);
        },
    },
}