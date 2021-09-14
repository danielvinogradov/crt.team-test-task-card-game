/**
 * Модуль для геймплея. Отвечает за открытие, закрытие и удаление карточек.
 * Триггерит создание нового результата в CardGame/Results.
 */

import { createCards } from '../../../utils/data/createCards';
import { shuffleArray } from '../../../utils/functions/shuffleArray';

/**
 * Путь до папки с изображениями для карточек.
 * @type {string}
 */
const IMG_FOLDER_PATH = '/img/cardGame/';

/**
 * Через сколько (минимум, т.к. это асинхронная функция) миллисекунд
 * должна закрыться первая открытая карточка, если не была выбрана вторая.
 * @type {number}
 */
const FIRST_CARD_TIMEOUT_MS = 5000;

/**
 * Через сколько миллисекунд должны закрыться обе открытые карточки,
 * если не было клика по третьей.
 * @type {number}
 */
const SECOND_CARD_TIMEOUT_MS = 5000;

export const Gameplay = {
    namespaced: true,

    state() {
        return {
            /**
             * Тут будет массив с карточками.
             * @type {Card[]|null}
             */
            cards: null,

            /**
             * Timeout для автоматического закрытия открытых карточек.
             * @type {number|null}
             */
            timeout: null,

            /**
             * Timestamp начала игры в миллисекундах.
             * Игра считается начатой, когда кликнута первая карточка.
             * @type {number|null}
             */
            gameStartTimestamp: null,
        }
    },

    getters: {
        /**
         * Получить все карточки.
         * @returns {Card[]}
         */
        getCards: (state) => state.cards,

        /**
         * Получить объект с UUID (уникальными идентификаторами) открытых карточек.
         * @param state
         * @returns {string[]}
         */
        getOpenedCardsUUIDs: (state) => state.cards.filter((cv) => cv.itemStatus === 'open').map((cv) => cv.uuid),

        /**
         * Получить количество открытых карточек.
         * @returns {number}
         */
        getOpenedCardsUUIDsLength: (_, getters) => getters.getOpenedCardsUUIDs.length,

        /**
         * Получить массив с ID (неуникальными идентификаторами) открытых карточек.
         * У карточек с одинаковыми изображениями будут одинаковые ID.
         * @returns {string[]}
         */
        getOpenedCardsIDs: (state) => state.cards.filter((cv) => cv.itemStatus === 'open').map((cv) => cv.id),

        /**
         * Одинаковые ли открытые карточки.
         * @returns {boolean}
         */
        openedCardsAreSame: (_, getters) => getters.getOpenedCardsUUIDsLength === 2 && new Set(getters.getOpenedCardsIDs).size === 1,

        /**
         * Закончилась ли игра. Игра считается законченной, если количество
         * карточек с itemStatus === 'hidden' равно общему кол-ву карточек.
         * @returns {boolean}
         */
        isGameOver: (state) => state.cards.filter((cv) => cv.itemStatus === 'hidden').length === state.cards.length,

        /**
         * Получить время начала игры. Если игра не начиналась, то вернет null.
         * @returns {number|null}
         */
        getGameStartTimestamp: (state) => state.gameStartTimestamp,
    },

    mutations: {
        /**
         * Устанавливает массив карточек.
         * @param {Card[]} val – массив карточек
         */
        setCards: (state, val) => {
            state.cards = val;
        },

        /**
         * Устанавливает itemStatus = 'open' у карточки с переданным uuid.
         * @param {string} uuid – уникальный идентификатор карточки
         */
        setCardOpen: (state, uuid) => {
            state.cards = state.cards.map((cv) => {
                if (cv.uuid === uuid) cv.itemStatus = 'open'
                return cv
            })
        },

        /**
         * Устанавливает карточкам с указанными uuid itemStatus = 'closed'
         * @param {string[]} UUIDsArray – массив уникальных идентификаторов карточек
         */
        setCardsClosed: (state, UUIDsArray) => {
            state.cards = state.cards.map((cv) => {
                if (UUIDsArray.includes(cv.uuid)) cv.itemStatus = 'closed'
                return cv
            })
        },

        /**
         * Устанавливает карточкам с указанными uuid itemStatus = 'hidden'
         * @param {string[]} UUIDsArray – массив уникальных идентификаторов карточек
         */
        setCardsHidden: (state, UUIDsArray) => {
            state.cards = state.cards.map((cv) => {
                if (UUIDsArray.includes(cv.uuid)) cv.itemStatus = 'hidden'
                return cv
            })
        },

        /**
         * Устанавливает переданный timeout. Перед этим синхронно удаляет предыдущий.
         * @param timeout
         * @returns {Promise<void>}
         */
        setCardTimeout: async (state, timeout) => {
            await clearTimeout(state.timeout);
            state.timeout = timeout;
        },

        /**
         * Очищает timeout.
         * @returns {Promise<void>}
         */
        clearCardTimeout: async (state) => {
            await clearTimeout(state.timeout);
        },

        /**
         * Установить время начала игры.
         * Если игра закончена, то устанавливается null.
         * @param {number|null} timestamp
         */
        setGameStartTimestamp: (state, timestamp) => {
            state.gameStartTimestamp = timestamp;
        }
    },

    actions: {
        /**
         * Обработчик для mounted() в Home.vue.
         * Создает новые карточки, перемешивает их,
         * добавляет imgURL и itemStatus = 'closed'
         * и сохраняет в state.
         */
        onPageEnter({ commit }) {
            const cards = shuffleArray({ array: createCards() }).map((cv) => {
                    cv.imgURL = IMG_FOLDER_PATH + cv.imgURI;
                    cv.itemStatus = 'closed';
                    return cv;
                }
            );
            commit('setCards', cards);
        },

        /**
         * Обработчик для beforeDestroy() в Home.vue.
         * Удаляет данные карточек и timeout.
         */
        onPageLeave({ commit }) {
            commit('setCards', null);
            commit('clearCardTimeout');
        },

        /**
         * Обработчик нажатия на отдельную карточку.
         */
        onCardClick({ getters, commit, dispatch }, { uuid }) {
            // если игра еще не начиналась, то устанавливаем дату начала
            if (!getters.getGameStartTimestamp) commit('setGameStartTimestamp', Date.now());

            /**
             * Закрывает все открытые карточки.
             * @type {function}
             */
            const closeOpenedCards = function () {
                commit('setCardsClosed', getters.getOpenedCardsUUIDs)
            }

            /**
             * Кол-во открытых карточек.
             * @type {number}
             */
            const openedCardsLength = getters.getOpenedCardsUUIDsLength;

            if (openedCardsLength === 0) {
                // если до нажатия не было открытых карточек, то устанавливаем интервал в ~5сек
                commit('setCardTimeout', setTimeout(closeOpenedCards, FIRST_CARD_TIMEOUT_MS));
            } else if (openedCardsLength === 1) {
                // если до нажатия была одна открытая карточка, то устанавливаем интервал в ~1 сек
                commit('setCardTimeout', setTimeout(closeOpenedCards, SECOND_CARD_TIMEOUT_MS));
            } else if (getters.getOpenedCardsUUIDsLength === 2) {
                // если две карточки уже открыты, а пользователь кликает по третьей
                // закрываем уже открытые карточки
                commit('setCardsClosed', getters.getOpenedCardsUUIDs);
                // устанавливаем интервал для новой карточки
                commit('setCardTimeout', setTimeout(closeOpenedCards, FIRST_CARD_TIMEOUT_MS));
            }

            // открываем карточку
            commit('setCardOpen', uuid);

            // если на данный момент открыты две одинаковые карточки, то скрываем их (устанавливаем статус 'hidden')
            if (getters.openedCardsAreSame) commit('setCardsHidden', getters.getOpenedCardsUUIDs)

            // если все карточки спрятаны, то игра закончена
            if (getters.isGameOver) dispatch('onGameOver')
        },

        /**
         * Если все карточки открыты.
         */
        onGameOver({ getters, commit, dispatch }) {
            // получаем время окончания игры
            const endGameTimestamp = Date.now();
            // получаем время в миллисекундах, затраченное на прохождение
            const ms = endGameTimestamp - getters.getGameStartTimestamp;
            // удаляем таймауты
            commit('clearCardTimeout');
            // вызываем обработчик нового результата в модуле CardGame/Results
            dispatch('CardGame/Results/onNewResult', { ms }, { root: true });
            // приводим страницу в изначальное состояние (удаляем timestamp начала игры)
            commit('setGameStartTimestamp', null);
            // приводим страницу изначальное состояние (создаем новые карточки)
            dispatch('onPageEnter');
        },
    }
}