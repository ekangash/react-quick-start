/** 1 NodeModules */
import React from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Чекбокс в строке фильтров таблицы
 *
 * @param {boolean} [single=false] Единичный чекбокс
 * @param {boolean} [multiple=false] Множественный чекбокс
 *
 * @return {JSX.Element|null} DOM-элемент или null если не нужно показывать чекбокс
 */
export const DatagridTableHeadRowFilterCellCheckbox = ({ single, multiple}) => {
    return (single && !multiple) || (multiple && !single) ? <td /> : null;
};

DatagridTableHeadRowFilterCellCheckbox.propTypes = {
    single: propTypes.bool,
    multiple: propTypes.bool,
};

DatagridTableHeadRowFilterCellCheckbox.defaultProps = {
    single: false,
    multiple: false,
};
