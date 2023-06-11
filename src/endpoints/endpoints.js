/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { createPublicEndpoints } from '@endpoints/public/createPublicEndpoints';
import { createAxiosInstance } from '@packages/axios/createAxiosInstance';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Конечные точки API приложения
 *
 * @type {object}
 */
export const endpoints = {
    /**
     * Возвращает конечные точки организационной схемы.
     *
     * @return {object} Конечные точки публичной схемы.
     */
    public: () => createPublicEndpoints(createAxiosInstance()),
    /**
     * Возвращает конечные точки схемы.
     *
     * @param {string} name Имя
     * @param {boolean} [useExecute=false] useExecute Выполнить
     *
     * @return {object|function} Конечные точки схемы.
     */
    schema(name, useExecute = false) {
        if (!this.hasOwnProperty(name)) {
            throw new Error(`Endpoint of schema "${name}" is not defined.`);
        }

        return useExecute ? this[name]() : this[name];
    },
    /**
     * Возвращает конечные точки таблицы.
     *
     * @param {string} schemaName Имя схемы
     * @param {string} tableName Имя таблицы
     *
     * @return {object} Конечные точки таблицы.
     */
    table(schemaName, tableName) {
        const schemaEndpoints = this.schema(schemaName, true);

        if (!schemaEndpoints.hasOwnProperty(tableName) || !schemaEndpoints.hasOwnProperty(tableName)) {
            throw new Error(`Endpoints of table "${tableName}" is not defined.`);
        }

        return schemaEndpoints[tableName];
    },
    /**
     * Возвращает конечную точку.
     *
     * @param {string} schemaName Имя схемы
     * @param {string} tableName Имя таблицы
     * @param {string} endpointName Имя конечной точки.
     *
     * @return {object} Конечную точку.
     */
    get(schemaName, tableName, endpointName) {
        const tableEndpoints = this.table(schemaName, tableName);

        if (!tableEndpoints.hasOwnProperty(endpointName) || !tableEndpoints.hasOwnProperty(endpointName)) {
            throw new Error(`Endpoint name "${endpointName}" is not defined in a schema "${schemaName}" and a table "${tableName}".`);
        }

        const endpoint = tableEndpoints[endpointName];

        if (typeof endpoint  !== 'function') {
            throw new Error(`Endpoint "${endpointName}" is not a function.`);
        }

        return endpoint;
    },
};