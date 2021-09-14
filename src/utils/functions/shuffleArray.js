import { getRandomNumberInRangeInclusive } from './getRandomNumberInRangeInclusive';

/**
 * Метод, перемешивающий элементы массива. Не меняет переданный массив.
 * @param {array} array
 * @returns {*[]}
 */
export const shuffleArray = function ({ array }) {
    const oldArray = [ ...array ]; // копия изначального массива
    const newArray = []; // перемешанный массив

    while (oldArray.length) { // пока длина изначального массива не будет равна нулю
        // получаем рандомный индекс в неперемешанном массиве
        const idx = getRandomNumberInRangeInclusive({ max: oldArray.length - 1 });
        // пушим элемент с этим индексом в перемешанный массив
        newArray.push(oldArray[idx]);
        // и удаляем элемент с этим индексом из неперемешанного массива
        oldArray.splice(idx, 1);
    }

    return newArray;
}