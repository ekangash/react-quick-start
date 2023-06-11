/** 1 NodeModules */
import React, { useCallback } from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { Query } from '@packages/query/Query';
import { Str } from '@packages/helpers/string/Str';
import { Arr } from '@packages/helpers/array/Arr';
import { Num } from '@packages/helpers/number/Num';
import { API_FILTER } from '@enums/api/filter/ApiFilter'
import { API_ENDPOINT } from '@enums/endpoint/ApiEndpoint';

/** 3 Components, Hooks, Icons - NodeModules */
import { useSearchParams } from 'react-router-dom';

/** 4 Components, Hooks - Custom */
import { useDatagridContext } from '@features/datagrid/context/DatagridContext';

/** 5 Entities Stores, Services */
/** 6 Resources */

/**
 * Хук для работы с параметрами поиска в строке запроса и объекте запроса при фильтрации/сортировке
 *
 * @return {Object<string, Function>} Объект с функциями для работы с параметрами строки запроса и с объектом запроса
 */
export const useDatagridUrlSearchParams = () => {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const { enablePushState, forMethod } = useDatagridContext();

    const DATAGRID_URL_PARAM_FILTER = 'datagridFilter';
    const DATAGRID_URL_PARAM_SORT = 'datagridSort';
    const DATAGRID_URL_PARAM_QUICK_SEARCH = 'datagridQuickSearch';

    /**
     * Изменяет параметры поисковой строки
     *
     * @param {string} value Значение параметра
     * @param {string} urlParamName Наименование параметра из поисковой строки
     *
     * @return {void}
     */
    const changeUrlParams = (value, urlParamName) => {
        if (!enablePushState) {
            return;
        }

        let newSearchParams = new URLSearchParams();

        for (let [param, paramValue] of urlSearchParams.entries()) {
            if (!(urlParamName === DATAGRID_URL_PARAM_QUICK_SEARCH && param.match(`^${DATAGRID_URL_PARAM_FILTER}`))) {
                newSearchParams.append(param, paramValue);
            }
        }

        if (Str.contains(value) || Num.assert(value)) {
            newSearchParams.set(urlParamName, value);
        } else {
            newSearchParams.delete(urlParamName);
        }

        setUrlSearchParams(newSearchParams);
    };

    /**
     * Изменяет параметры поисковой строки для фильтров таблицы
     *
     * @param {string} value Значение фильтра
     * @param {string} name Наименование фильтруемого поля
     * @param {string} [condition=''] Условие фильтрации
     *
     * @return {void}
     */
    const changeFilterUrlParams = (value, name, condition = '') => {
        changeUrlParams(value, `${DATAGRID_URL_PARAM_FILTER}[${name}]` + (Str.contains(condition) ? `[${condition}]` : ''));
    };

    /**
     * Изменяет параметры поисковой строки для сортировки таблицы
     *
     * @param {string} value Значение сортировки
     *
     * @return {void}
     */
    const changeSortUrlParams = (value) => {
        changeUrlParams(value, DATAGRID_URL_PARAM_SORT);
    };

    /**
     * Изменяет параметры поисковой строки для быстрого поиска в таблице
     *
     * @param {string} value Значение быстрого поиска
     *
     * @return {void}
     */
    const changeQuickSearchUrlParams = (value) => {
        changeUrlParams(value, DATAGRID_URL_PARAM_QUICK_SEARCH);
    };

    /**
     * Добавляет/удаляет поисковой параметр для фильтрации в объект запроса
     *
     * @param {Query} query Объект запроса
     * @param {string} searchParam Наименование поискогого параметра
     * @param {string} searchParamValue Значение поискового параметра
     *
     * @return {void}
     */
    const changeQueryFilterParam = (query, searchParam, searchParamValue) => {
        const regexp = new RegExp(`^${DATAGRID_URL_PARAM_FILTER}\\[(\\w+)\\]\\[(\\w+)\\]$`);
        const filterMatchRes = searchParam.match(regexp);

        if (Arr.contains(filterMatchRes) && filterMatchRes.length >= 3) {
            const [_, name, condition] = filterMatchRes;

            if (Str.contains(name)) {
                query.filter(name, searchParamValue, condition);
            }
        }
    };

    /**
     * Добавляет/удаляет поисковой параметр для сортировки в объект запроса
     *
     * @param {Query} query Объект запроса
     * @param {string} searchParam Наименование поискогого параметра
     * @param {string} searchParamValue Значение поискового параметра
     *
     * @return {void}
     */
    const changeQuerySortParam = (query, searchParam, searchParamValue) => {
        const regexp = new RegExp(`^${DATAGRID_URL_PARAM_SORT}$`);
        const sortMatchRes = searchParam.match(regexp);

        if (Arr.contains(sortMatchRes)) {
            query.sort(searchParamValue);
        }
    };

    /**
     * Добавляет к объекту запроса фильтры
     *
     * @param {Query} query Объект запроса
     * @param {DatagridCollection} collection Объект коллекции
     * @param {string} searchParamValue Значение поля быстрого поиска
     *
     * @return {void}
     */
    const changeQuickSearchQueryAllParams = (query, collection, searchParamValue) => {
        const searchModeIsStrict = searchParamValue?.length > 1 && searchParamValue.indexOf('=') === 0;
        const searchFilterValue = searchModeIsStrict ? searchParamValue.slice(1) : searchParamValue;

        query.page(1).clearFilterParts();

        if (Str.contains(searchFilterValue)) {
            collection.eachActiveColumns((column) => {
                if (column.filterIsInput()) {
                    query.filter(column.property('name'), searchFilterValue, searchModeIsStrict ? API_FILTER.EQ : API_FILTER.ILIKE);
                }
            });
        }
    };

    /**
     * Добавляет/удаляет поисковой параметр при быстром поиске в объект запроса
     *
     * @param {Query} query Объект запроса
     * @param {DatagridCollection} collection Объект коллекции
     *
     * @return {void}
     */
    const changeQueryQuickSearchParams = (query, collection) => {
        const quickSearchValue = urlSearchParams.get(DATAGRID_URL_PARAM_QUICK_SEARCH);

        if (Str.contains(quickSearchValue)) {
            changeQuickSearchQueryAllParams(query, collection, quickSearchValue);
            collection.forMethod(API_ENDPOINT.QUICK_SEARCH);
        }
    };

    /**
     * Возвращает новую функцию, добавляющую параметры к запросу из поисковой строки
     *
     * @param {DatagridCollection} collection Объект коллекции
     *
     * @return {(function(Query): void)} Функция, добавляющая параметры к запросу из поисковой строки
     */
    const getWhereFunc = (collection) => {
        return (query) => {
            query.clearSortParts().clearFilterParts();
            collection.forMethod(forMethod);

            const quickSearchIsEnabled = urlSearchParams.get(DATAGRID_URL_PARAM_QUICK_SEARCH) !== null;

            if (quickSearchIsEnabled) {
                changeQueryQuickSearchParams(query, collection);
            }

            for (let [searchParam, searchParamValue] of urlSearchParams.entries()) {
                if (!quickSearchIsEnabled) {
                    changeQueryFilterParam(query, searchParam, searchParamValue);
                }

                changeQuerySortParam(query, searchParam, searchParamValue);
            }
        };
    };

    /**
     * Возвращает значение для поля быстрого поиска
     *
     * @return {string} Значение для поля быстрого поиска
     */
    const getQuickSearchUrlParamValue = useCallback(() => {
        return urlSearchParams.get(DATAGRID_URL_PARAM_QUICK_SEARCH) ?? '';
    }, [urlSearchParams]);

    return {
        getWhereFunc: getWhereFunc,
        changeFilterUrlParams: changeFilterUrlParams,
        changeSortUrlParams: changeSortUrlParams,
        changeQuickSearchUrlParams: changeQuickSearchUrlParams,
        getQuickSearchUrlParamValue: getQuickSearchUrlParamValue,
        changeQuickSearchQueryAllParams: changeQuickSearchQueryAllParams,
    };
};