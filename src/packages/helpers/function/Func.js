/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с функциями
 */
export const Func = {
    /**
     * Проверяет, является ли переданное значение функцией
     *
     * @function
     *
     * @param {any} func Проверяемое значение
     *
     * @return {boolean} Является ли переданное значение функцией
     */
    assert: (func) => {
        return typeof func === 'function';
    },
};