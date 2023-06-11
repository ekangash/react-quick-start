/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с логическими значениями.
 *
 * @type {object}
 */
export const Bool = {
    /**
     * Проверяет, является ли элемент логическим
     *
     * @param {any} srcBool Исходный элемент
     *
     * @return {boolean} Флаг проверки на объект
     */
    assert(srcBool) {
        return typeof srcBool === 'boolean';
    },
}