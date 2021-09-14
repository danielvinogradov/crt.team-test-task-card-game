import { nanoid } from 'nanoid';

/**
 * Создает массив неотсортированных карточек.
 *
 * @typedef Card
 * @property {string} id - идентификатор, одинаковый у карточек с одинаковым imgURI (изображением)
 * @property {string} uuid – идентификатор, уникальный для каждой карточки вне зависимости от imgURI
 * @property {string} imgURI – название файла картинке (без пути)
 *
 * @returns {Card[]}
 */
export const createCards = function () {
    const UNIQUE_CARDS_AMOUNT = 18; // сколько будет уникальных карточке

    const cards = []; // массив, где будут все уникальные карточки

    for (let i = 0; i < UNIQUE_CARDS_AMOUNT; i++) {
        cards.push({
            id: nanoid(),
            imgURI: `${i}.jpg`, // у нас нет доступа к файловой системе как в ноде, поэтому приходится самостоятельно работать с именами файлов
        })
    }

    // массив, где будет две каждые карточки из cards и добавлен уникальный идентификатор uuid

    return [ ...cards, ...cards ].map((cv) => {
        const element = Object.assign({}, cv)
        element.uuid = nanoid();
        return element;
    })
}