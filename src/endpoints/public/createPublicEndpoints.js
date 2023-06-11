/** 1 NodeModules */
import { Axios } from "axios";

/** 2 Config, Packages, Endpoints, Enums */
import { appCommonEndpoints } from "@endpoints/appCommonEndpoints";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Формирует конечные точки публичной схемы
 *
 * @param {Axios} axios Экземпляр axios
 *
 * @return {object} Возвращает конечные точки сущностей
 */
export const createPublicEndpoints = (axios) => ({
      profile: {
            search: appCommonEndpoints.search(axios, 'public', 'profile'),
            get: appCommonEndpoints.get(axios, 'public', 'profile'),
            create: appCommonEndpoints.create(axios, 'public', 'profile'),
            patch: appCommonEndpoints.patch(axios, 'public', 'profile'),
            delete: appCommonEndpoints.delete(axios, 'public', 'profile'),
            quickSearch: appCommonEndpoints.quickSearch(axios, 'public', 'profile'),
            validate: appCommonEndpoints.validate(axios, 'public', 'profile'),
      },
});
