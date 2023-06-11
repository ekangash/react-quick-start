/** 1 NodeModules */
import React, { useRef } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from '@packages/helpers/object/Obj';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableActionColumnBodyCellAction } from '@features/datagrid/table/action-column/body/cell/action/DatagridTableActionColumnBodyCellAction';
import { useDatagridTableActionColumnCellWidth } from '@features/datagrid/table/action-column/useDatagridTableActionColumnCellWidth';
import { useDatagridContext } from  '@features/datagrid/context/DatagridContext';

/** 5 Entities, Stores, Services */
import { AppEntity } from '@entities/AppEntity';

/** 6 Resources */
import '@features/datagrid/table/action-column/DatagridTableActionColumn.scss';
import '@features/datagrid/table/DatagridTable.css';

/**
 * Ячейка ActionColumn в теле таблицы
 *
 * @param {string|number} [height='auto'] Высота ячейки ActionColumn
 * @param {!AppEntity} entity Сущность
 *
 * @return {string|JSX.Element} DOM-элемент
 */
export const DatagridTableActionColumnBodyCell = ({ height, entity }) => {
    const { actionColumn } = useDatagridContext();
    const actionColumnIsEmpty = Obj.empty(actionColumn);
    const cellRef = useRef(null);
    useDatagridTableActionColumnCellWidth(cellRef);

    /**
     * Предотвращает распространения события DoubleClick на строку.
     *
     * @param {Event} event Событие DoubleClick
     *
     * @return {void}
     */
    let onCellDoubleClick = (event) => {
        event.stopPropagation();
    };

    return actionColumnIsEmpty ? '' : (
        <td
            onDoubleClick={onCellDoubleClick}
            ref={cellRef}
            className={classNames(
                'datagrid-table-action-column__cell datagrid-table-action-column__cell_body border-left',
                {['datagrid-table-row_delete']: entity.attribute('created_at')},
            )}
            style={{ height: height }}
        >
            {Object.entries(actionColumn).map(([action, actionOptions]) => Obj.contains(actionOptions) && (
                <DatagridTableActionColumnBodyCellAction
                    key={nanoid(16)}
                    entity={entity}
                    action={action}
                    {...actionOptions}
                />
            ))}
        </td>
    );
};

DatagridTableActionColumnBodyCell.propTypes = {
    entity: propTypes.instanceOf(AppEntity).isRequired,
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

DatagridTableActionColumnBodyCell.defaultProps = {
    height: 'auto',
};