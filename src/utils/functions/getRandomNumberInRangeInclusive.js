/**
 * Получить случайное целое число (integer) в диапазоне min-max включительно.
 * @param {number} min – Минимальное значение. По дефолту 0.
 * @param {number} max – Максимальное значение.
 * @returns {number}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive}
 */
export const getRandomNumberInRangeInclusive = function ({ min = 0, max }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}