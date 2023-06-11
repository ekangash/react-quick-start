/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с числами.
 *
 * @type {object}
 */
export const Num = {
    /**
     * Возвращает утверждение, что тип элемента - number
     *
     * @param {any} element Исходная строка
     *
     * @return {boolean} Флаг проверки на тип number
     */
    assert(element) {
        return typeof element === 'number';
    }
}