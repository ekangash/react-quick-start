/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { Date as DateHelper } from "@packages/helpers/date/Date";
import { API_FILTER } from "@enums/api/filter/ApiFilter";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { InputDatepicker } from "@shared/input/datepicker/InputDatepicker";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities Stores, Services */

/** 6 Resources */

/**
 * Поле фильтра даты в таблице
 *
 * @param {!string} name Наименование поля
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const DatagridTableHeadRowFilterDatepicker = ({ name }) => {
    const { collection } = useDatagridContext();
    const { changeFilterUrlParams, getQuickSearchUrlParamValue } = useDatagridUrlSearchParams();

    /**
     * Обрабатывает событие изменения значения фильтра
     *
     * @param {string} value Значение фильтра
     *
     * @return {void}
     */
    const onChange = async (value) => {
        if (Str.empty(value)) {
            collection.where((query) => query.page(1).deletePartFromFilters(name));
        } else {
            const dateObject = new Date(value);
            let currentDate = DateHelper.convertUTCToISODate(dateObject);
            dateObject.setDate(dateObject.getDate() + 1);
            let nextDate = DateHelper.convertUTCToISODate(dateObject);

            changeFilterUrlParams(value, name, API_FILTER.GTE);
            collection.where((query) => query
                .filter(name, currentDate, API_FILTER.GTE)
                .filter(name, nextDate, API_FILTER.LTE)
                .page(1)
            );
        }

        await collection.fetch();
    };

    /**
     * Обработчик клика на кнопку очистки значения в поле ввода
     *
     * @return {void}
     */
    const onClearBtnClickHandler = () => {
        onChange('');
    };

    return (
        <InputDatepicker
            onChange={onChange}
            value={collection.parseQuery((query) => query.getFilter(name, API_FILTER.GTE))}
            onClearBtnClick={onClearBtnClickHandler}
            disabled={Str.contains(getQuickSearchUrlParamValue())}
        />
    );
};

DatagridTableHeadRowFilterDatepicker.propTypes = {
    name: propTypes.string.isRequired,
};
DatagridTableHeadRowFilterDatepicker.defaultProps = {};