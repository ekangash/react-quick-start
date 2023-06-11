/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с массивами.
 *
 * @type {{contains(Object): boolean, empty(Array): boolean}}
 */
export const Arr = {
    /**
     * Определяет, содержит ли массив значения
     *
     * @param {array} arr Исходный массив
     *
     * @return {boolean} Результат проверки на заполненность массива
     */
    contains(arr) {
        return Array.isArray(arr) && arr.length > 0;
    },
    /**
     * Определяет, пустой ли массив
     *
     * @param {array} arr Исходный массив
     *
     * @return {boolean} Результат проверки на пустоту массива
     */
    empty(arr) {
        return Array.isArray(arr) && arr.length === 0;
    },
}