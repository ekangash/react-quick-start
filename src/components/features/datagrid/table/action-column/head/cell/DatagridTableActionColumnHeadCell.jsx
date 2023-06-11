/** 1 NodeModules */
import React from "react";
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */
import "@features/datagrid/table/action-column/DatagridTableActionColumn.scss";

/**
 * Ячейка ActionColumn шапки таблицы
 *
 * @param {number} [height='auto'] Высота
 * @param {!string} as Тег элемента
 *
 * @return {JSX.Element|string} DOM-элемент или пустую строку, если элемент не должен быть показан
 */
export const DatagridTableActionColumnHeadCell = ({ height, as: As }) => {
    const { actionColumn, collection } = useDatagridContext();
    const actionColumnIsEmpty = Obj.empty(actionColumn);
    const marginTop = As === 'td' ? '1px' : '-1px';
    const cellHeight = As === 'td' ? height : height + 10;
    const collectionIsEmpty = collection.empty() || collection.activeEntitiesIsEmpty();

    return (
        actionColumnIsEmpty || collectionIsEmpty ? '' : (
            <As className='datagrid-table-action-column__cell' style={{ height: cellHeight, marginTop: marginTop }}/>
        )
    );
};

DatagridTableActionColumnHeadCell.propTypes = {
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
    as:  propTypes.string.isRequired,
};

DatagridTableActionColumnHeadCell.defaultProps = {
    height: 'auto',
};