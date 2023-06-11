/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { QueryFields } from "@packages/query/QueryFields";
import { UrlHelper } from "@packages/helpers/url/Url";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс запроса.
 */
export class Query extends QueryFields {
    /**
     * Приводит параметры запроса к пути url-адреса.
     *
     * @return {string} Путь url-адреса.
     */
    toPath() {
        let pathParamsWithParts = {};

        if (this.paginationIsInitialized) {
            pathParamsWithParts = Object.fromEntries(this.paginationParts);
        }

        const params = { filter: this.filterParts, fields: this.fieldParts, sort: this.sortParts, expand: this.expandParts };

        for (let [name, param] of Object.entries(params)) {
            if (param instanceof Map && param.size > 0) {
                pathParamsWithParts[name] = Object.fromEntries(param);
            } else if (param instanceof Set && param.size > 0) {
                pathParamsWithParts[name] = Array.from(param);
            }
        }

        return UrlHelper.query(pathParamsWithParts);
    }

    /**
     * Проверят, что значение это экземпляр класса запроса.
     *
     * @param {Query|any} value Значение
     *
     * @return {void}
     */
    static checkIsInstanceOfSelf(value) {
        if (!this.isInstanceOfSelf(value)) {
            throw new Error("Экземпляр объекта 'Query' не определен");
        }
    }

    /**
     * Проверят, что значение это экземпляр класса запроса.
     *
     * @param {Query|any} value Значение
     *
     * @return {boolean} Значение является экземпляром класса запроса.
     */
    static isInstanceOfSelf(value) {
        return value instanceof Query;
    }
}