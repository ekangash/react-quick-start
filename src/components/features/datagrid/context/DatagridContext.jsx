/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { DatagridCollection } from "@features/datagrid/collection/DatagridCollection";

/** 6 Resources */

/**
 * Контекст таблицы
 *
 * @type {React.Context<null>}
 */
const HookDatagridContext = React.createContext({});

/**
 * Хук для получения данных контекста таблицы
 *
 * @return {object} Контекст таблицы
 */
export const useDatagridContext = () => React.useContext(HookDatagridContext);

/**
 * Провайдер таблицы
 *
 * @param {JSX.Element[]} children DOM узлы
 * @param {object} value Значение контекста
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridProvider = ({ children, ...value }) => {
    return (
        <HookDatagridContext.Provider value={value}>
            {children}
        </HookDatagridContext.Provider>
    );
};

DatagridProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
    ]).isRequired,
    settings: propTypes.object,
    searching: propTypes.bool,
    state: propTypes.object.isRequired,
    collection: propTypes.instanceOf(DatagridCollection).isRequired,
    actions: propTypes.object.isRequired,
    checkbox: propTypes.object,
    actionColumn: propTypes.object,
    enablePushState: propTypes.bool,
    forMethod: propTypes.string,
};

DatagridProvider.defaultProps = {
    searching: false,
    checkbox: {},
    actionColumn: {},
    enablePushState: true,
    forMethod: 'search',
};