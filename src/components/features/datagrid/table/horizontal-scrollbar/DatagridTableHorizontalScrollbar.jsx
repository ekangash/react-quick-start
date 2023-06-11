/** 1 NodeModules */
import React from "react";
import propTypes from 'prop-types';
import ClassNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import "@features/datagrid/table/horizontal-scrollbar/DatagridTableHorizontalScrollbar.css";


/**
 * Горизонтальный скроллбар
 *
 * @param {!number} widthTable Высота таблицы
 * @param {!number} widthTableWrapper Высота обертки таблицы
 * @param {!function} onScroll Функция-обработчик прокрутки
 * @param {!string} scrollbarPosition Значение position
 *
 * @returns {JSX.Element} DOM узел
 * @constructor
 */
export const DatagridTableHorizontalScrollbar = ({ widthTable, widthTableWrapper, onScroll, scrollbarPosition }) => {

    return (
        <div className={ClassNames('datagrid-table-horizontal-scrollbar', { 'd-none': widthTableWrapper >= widthTable })}
             style={{ width: widthTableWrapper, position: scrollbarPosition }}
             onScroll={onScroll}
        >
            <div className='datagrid-table-horizontal-scrollbar__empty-container' style={{ width: widthTable }} />
        </div>
    );
};

DatagridTableHorizontalScrollbar.propTypes = {
    widthTable: propTypes.number.isRequired,
    widthTableWrapper: propTypes.number.isRequired,
    onScroll: propTypes.func.isRequired,
    scrollbarPosition: propTypes.string,
};

DatagridTableHorizontalScrollbar.defaultProps = {
    scrollbarPosition: null,
};
