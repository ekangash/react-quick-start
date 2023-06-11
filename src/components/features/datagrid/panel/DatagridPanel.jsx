/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Панель таблицы (используется для рендера как верхней части таблицы, так и нижней)
 *
 * @param {!(JSX.Element[]|JSX.Element|string)} children Дочерние элементы
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridPanel = ({ children }) => {
    return (
        <div className={'d-flex align-items-center justify-content-between datagrid-table-panel'}>
            {children}
        </div>
    );
};

DatagridPanel.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
    ]).isRequired,
};

DatagridPanel.defaultProps = {};