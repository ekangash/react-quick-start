/** 1 NodeModules */
import React, { useRef } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from '@packages/helpers/object/Obj';
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
import { useNavigate } from 'react-router';

/** 4 Components, Hooks - Custom */
import { DatagridTableBodyRowCellCheckbox } from '@features/datagrid/table/body/row/cell/checkbox/DatagridTableBodyRowCellCheckbox';
import { DatagridTableBodyRowCellShared } from '@features/datagrid/table/body/row/cell/shared/DatagridTableBodyRowCellShared';
import { DatagridTableActionColumnBodyCell } from '@features/datagrid/table/action-column/body/cell/DatagridTableActionColumnBodyCell';
import { useDatagridTableActionColumnCellHeight } from '@features/datagrid/table/action-column/useDatagridTableActionColumnCellHeight';
import { useDatagridContext } from  '@features/datagrid/context/DatagridContext';

/** 5 Entities, Stores, Services */
import { AppEntity } from '@entities/AppEntity';

/** 6 Resources */

/**
 * Строка тела таблицы
 *
 * @param {!AppEntity} entity Сущность
 * @param {boolean} [useRowCheckboxSelect=false] Использовать ли чекбокс в строке
 * @param {Function} [transitionToRoute=null] Функция для получения ссылки на сущность
 * @param {object} [rowOptions={}] Опции строки
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableBodyRow = ({ entity, useRowCheckboxSelect, transitionToRoute, rowOptions }) => {
    const { collection, checkbox, actionColumn, actions } = useDatagridContext();
    const navigate = useNavigate();

    const rowRef = useRef(null);
    const height = useDatagridTableActionColumnCellHeight(rowRef);

    return (
        <tr
            {...rowOptions}
            className={classNames(rowOptions?.className, {['datagrid-table-row_delete']: entity.attribute('created_at')})}
            ref={rowRef}
            {...(useRowCheckboxSelect && {
                onClick: () => {
                    let entitySelectedState = Boolean(entity.property('selected'));

                    if (checkbox?.single) {
                        collection.mapActiveEntities((entity) => entity.setProperty('selected', false));
                    }

                    entity.setProperty('selected', !entitySelectedState);
                    actions.nextVersion();
                },
            })}
            {...(Func.assert(transitionToRoute) && {
                onDoubleClick: () => navigate(String(transitionToRoute(entity))),
            })}
        >
            <DatagridTableBodyRowCellCheckbox
                entity={entity}
                {...checkbox}
            />
            {collection.eachActiveColumns((column) => (
                <DatagridTableBodyRowCellShared
                    key={nanoid(16)}
                    entity={entity}
                    value={column.property('value')}
                    name={column.property('name')}
                    cellOptions={column.property('cellOptions')}
                />
            ))}

            {Obj.empty(actionColumn) ? '' : <DatagridTableActionColumnBodyCell height={height} entity={entity} />}
        </tr>
    );
};

DatagridTableBodyRow.propTypes = {
    entity: propTypes.instanceOf(AppEntity).isRequired,
    transitionToRoute: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    useRowCheckboxSelect: propTypes.bool,
    rowOptions: propTypes.object,
};

DatagridTableBodyRow.defaultProps = {
    useRowCheckboxSelect: false,
    transitionToRoute: null,
    rowOptions: {},
};
