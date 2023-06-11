/** 1 NodeModules */
import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableHeadRowShared } from "@features/datagrid/table/head/row/shared/DatagridTableHeadRowShared";
import { DatagridTableHeadRowFilter } from "@features/datagrid/table/head/row/filter/DatagridTableHeadRowFilter";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Шапка таблицы
 *
 * @param {string[]} [className=[]] Имена классов.
 *
 * @return {JSX.Element} DOM узлы.
 */
export const DatagridTableHead = ({ className}) => {

     return (
        <thead className={classNames(className)}>
            <DatagridTableHeadRowShared />
            <DatagridTableHeadRowFilter />
        </thead>
    );
};

DatagridTableHead.propTypes = {
    className: propTypes.array,
};

DatagridTableHead.defaultProps = {
    className: [],
};
