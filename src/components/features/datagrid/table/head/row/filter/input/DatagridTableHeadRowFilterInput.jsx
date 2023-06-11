/** 1 NodeModules */
import React, { useRef } from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { API_FILTER } from "@enums/api/filter/ApiFilter";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { InputText } from "@shared/input/text/InputText";
import { useDatagridContext } from "@features/datagrid/context/DatagridContext";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Поле фильтра таблицы
 *
 * @param {!string} name Наименование фильтра
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableHeadRowFilterInput = ({ name }) => {
    const { collection } = useDatagridContext();
    const condition = useRef(API_FILTER.ILIKE);

    const { changeFilterUrlParams, getQuickSearchUrlParamValue } = useDatagridUrlSearchParams();
    const quickSearchIsActive = Str.contains(getQuickSearchUrlParamValue());

    /**
     * Возвращает значение для фильтра из запроса
     *
     * @return {string|number} Значение
     */
    const getValue = () => {
        if (quickSearchIsActive) {
            return '';
        }

        const valueFromFilter = collection.query.getFilter(name, condition.current);

        return `${condition.current === API_FILTER.EQ && Str.contains(valueFromFilter) ? '=' : ''}${valueFromFilter}`;
    };

    /**
     * Отправляет запрос на поиск по значению
     *
     * @function
     *
     * @return {Promise<void>}
     */
    const searchValue = (value) => {
        const currentFilterValue = getValue();

        if (value !== currentFilterValue) {
            collection.where((query) => {
                query.deletePartFromFilters(name, API_FILTER.ILIKE);
                query.deletePartFromFilters(name, API_FILTER.EQ);

                const isStrictSearch = value?.length > 1 && value.indexOf('=') === 0;
                const filterValue = isStrictSearch ? value.slice(1) : value;
                condition.current = isStrictSearch ? API_FILTER.EQ : API_FILTER.ILIKE;

                changeFilterUrlParams(filterValue, name, condition.current);
                query.filter(name, filterValue, condition.current).page(1);
            });

            collection.fetch();
        }
    };

    /**
     * Обрабатывает событие снятия фокуса с поля фильтра
     *
     * @function
     *
     * @param {string} value Значение
     *
     * @return {void} Промис для получения результата запроса
     */
    const onBlur = (value) => {
        searchValue(value);
    };

    /**
     * Обрабатывает нажание кнопки Enter в поле ввода фильтра
     *
     * @function
     *
     * @param {string} value Значение
     *
     * @return {void} Промис для получения результата запроса
     */
    const onEnter = (value) => {
        searchValue(value);
    };

    return (
        <InputText
            name={name}
            value={getValue()}
            onBlur={onBlur}
            onEnter={onEnter}
            disabled={quickSearchIsActive}
        />
    );
};

DatagridTableHeadRowFilterInput.propTypes = {
    name: propTypes.string.isRequired,
};

DatagridTableHeadRowFilterInput.defaultProps = {};