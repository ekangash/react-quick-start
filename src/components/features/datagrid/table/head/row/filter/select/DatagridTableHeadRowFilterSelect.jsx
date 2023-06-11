/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { API_FILTER } from "@enums/api/filter/ApiFilter";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { Select } from "@shared/select/Select";
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities Stores, Services */
/** 6 Resources */

/**
 * Поле фильтра селект
 *
 * @param {!string} name Наименование поля
 * @param {object[]} [options=[]] Опции
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableHeadRowFilterSelect = ({ name, options }) => {
    const { collection } = useDatagridContext();
    const { changeFilterUrlParams, getQuickSearchUrlParamValue } = useDatagridUrlSearchParams();

    /**
     * Обрабатывает событие изменения значения фильтра
     *
     * @param {string} value Значение фильтра
     *
     * @return {void}
     */
    const onChange = (value) => {
        collection.where((query) => {
            query.filter(name, value, API_FILTER.EQ).page(1);
        });

        changeFilterUrlParams(value, name, API_FILTER.EQ);
        collection.fetch();
    };

    /**
     * Возвращает выбранные значения
     *
     * @return {Array<number|string>} Массив выбранных значений
     */
    const getValue = () => collection.parseQuery((query) => {
        const selectedValue = query.getFilter(name, API_FILTER.EQ);

        if (Str.empty(selectedValue) || selectedValue === null) {
            return [];
        }

        return [selectedValue];
    });

    return (
        <Select
            options={options}
            defaultValues={getValue()}
            onChange={onChange}
            disabled={Str.contains(getQuickSearchUrlParamValue())}
            portal
        />
    );
};

DatagridTableHeadRowFilterSelect.propTypes = {
    name: propTypes.string.isRequired,
    options: propTypes.arrayOf(propTypes.object),
};
DatagridTableHeadRowFilterSelect.defaultProps = {
    options: [],
};