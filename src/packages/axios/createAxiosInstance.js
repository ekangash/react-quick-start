/** 1 NodeModules */
import axios, { AxiosInstance } from 'axios';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Создает экземпляр AxiosInstance
 *
 * @return {AxiosInstance} Экземпляр AxiosInstance
 */
export const createAxiosInstance  = () => {
    return axios.create({baseURL: '/'});
};
