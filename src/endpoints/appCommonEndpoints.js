/** 1 NodeModules */
import { Axios } from "axios";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Базовые методы для получения конечных точек
 *
 * @type {object}
 */
export const appCommonEndpoints = {
    /**
     * Возвращает функцию отправки запроса на получение данных
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @returns {function(string): Promise<AxiosResponse<any>>} Функция отправки запроса на получение данных
     */
    search(axios, schema, table) {
        return (params) => axios.get(`/api/${schema}/${table}?${params}`);
    },

    /**
     * Возвращает функцию отправки запроса на получение данных
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @returns {function((number|string), string): Promise<AxiosResponse<any>>} Функция отправки запроса на получение данных
     */
    get: (axios, schema, table) => (id, params) => axios.get(`/api/${schema}/${table}/${id}?${params}`),

    /**
     * Возвращает функцию отправки запроса на создание новой записи
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @return {function(FormData): Promise<AxiosResponse<any>>} Функция отправки запроса на создание новой записи
     */
    create(axios, schema, table) {
        return (formData) => axios.post(`/api/${schema}/${table}`, formData);
    },

    /**
     * Возвращает функцию отправки запроса на обновление данных
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @return {function((number|string), FormData): Promise<AxiosResponse<any>>} Функция отправки запроса на обновление данных
     */
    patch(axios, schema, table) {
        return (id, formData) => axios.patch(`/api/${schema}/${table}/${id}`, formData);
    },

    /**
     * Возвращает функцию отправки запроса на удаление записи
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @return {function((number|string)): Promise<AxiosResponse<any>>} Функция отправки запроса на удаление записи
     */
    delete(axios, schema, table) {
        return (id) => axios.delete(`/api/${schema}/${table}/${id}`);
    },

    /**
     * Возвращает функцию отправки запроса быстрого поиска
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @return {function(string): *} Функция отправки запроса быстрого поиска
     */
    quickSearch(axios, schema, table) {
        return (whereParams) => {
            axios.interceptors.request.use((config) => {
                config.headers['Quick-Search'] = 1;

                return config;
            });

            return this.search(axios, schema, table)(whereParams);
        }
    },

    /**
     * Возвращает функцию отправки запроса на валидацию формы
     *
     * @param {Axios} axios Экземпляр axios
     * @param {string} schema Наименование схемы
     * @param {string} table Наименование таблицы
     *
     * @return {function(FormData, (number|string)): Promise} Функция отправки запроса на валидацию
     */
    validate(axios, schema, table) {
        return (formData, primaryKeyValue) => {
            let validationUrl = `/api/${schema}/${table}/validate`;

            if (primaryKeyValue !== undefined && primaryKeyValue !== null) {
                validationUrl += `?id=${primaryKeyValue}`;
            }

            return axios.post(validationUrl, formData);
        }
    }
};