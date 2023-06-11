/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательный объект для работы с URL
 *
 * @type {object}
 */
export const UrlHelper = {
    /**
     * Разбивает URL на массив участков его маршрута
     *
     * @param {string} url URL
     *
     * @return {string[]} URL, разбитый на массив
     */
    split(url) {
        const urlSplitted = url.split('/').filter(Boolean);

        return ['/', ...urlSplitted];
    },
    /**
     * Соединяет участки маршрута URL в единую URL-строку
     *
     * @param {string[]} urlPaths Участки маршрута URL
     *
     * @return {string} URL-строка
     */
    concat(urlPaths) {
        let urlPathsClone = [...urlPaths];

        if (urlPathsClone.indexOf('/') === 0) {
            urlPathsClone[0] = '';
        }

        let pathsContainsOnlyOnePath = urlPathsClone.length === 1;

        if (pathsContainsOnlyOnePath) {
            return `/${urlPathsClone[0]}`;
        }

        return urlPathsClone.join('/');
    },
    /**
     * Формирует строку запроса из объекта.
     *
     * @param {object} obj Объект.
     * @param {string} [prefix=''] Префикс.
     *
     * @return {string} Сформированная строку запроса.
     */
    query(obj, prefix = '') {
        return Object.entries(obj).map(([key, value]) => {
            const newPrefix = prefix ? `${prefix}[${key}]` : key;

            if (Obj.assert(value)) {
                return this.query(value, newPrefix);
            } else if (Array.isArray(value)) {
                return `${newPrefix}=${value.join(',')}`;
            }

            return `${newPrefix}=${encodeURIComponent(value)}`;
        }).join('&');
    },
};
