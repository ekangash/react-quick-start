/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы со строкой.
 *
 * @type {object}
 */
export const Str = {
    /**
     * Проверка на строку
     *
     * @param {any} str Строка
     *
     * @return {boolean} Флаг проверки на строку
     */
    assert(str) {
        return typeof str === 'string';
    },
    /**
     * Проверяет, что строка содержит значения.
     *
     * @param {any} str Строка
     *
     * @return {boolean} Флаг проверки на строку
     */
    contains(str) {
        return typeof str === 'string' && str.length > 0;
    },
    /**
     * Проверяет, что строка пуста.
     *
     * @param {any} str Строка
     *
     * @return {boolean} Флаг проверки на строку
     */
    empty(str) {
        return typeof str === 'string' && str.length === 0;
    }
}