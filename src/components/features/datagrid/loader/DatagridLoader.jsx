/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Загрузчик таблицы
 *
 * @param {!ReactNode} children Дочерние DOM узлы
 * @param {string[]} [className=['']] Имена классов
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridLoader = ({children, className}) => {
    const { searching } = useDatagridContext();

    return (
        <div className={classNames({ ['datagrid-container-shadow']: searching }, ...className)}>
            {searching && <div className="datagrid-container-loader"/>}
            {children}
        </div>
    );
};

DatagridLoader.propTypes = {
    className: propTypes.array,
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
    ]).isRequired,
};

DatagridLoader.defaultProps = {
    className: [''],
};