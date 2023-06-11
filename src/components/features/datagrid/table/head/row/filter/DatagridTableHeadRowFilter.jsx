/** 1 NodeModules */
import React, { useCallback, useMemo, useRef } from "react";

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from '@packages/helpers/function/Func';
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableHeadRowFilterCellCheckbox } from "@features/datagrid/table/head/row/filter/cell/checkbox/DatagridTableHeadRowFilterCellCheckbox";
import { DatagridTableActionColumnHeadCell } from "@features/datagrid/table/action-column/head/cell/DatagridTableActionColumnHeadCell";
import { DatagridTableHeadRowFilterInput } from "@features/datagrid/table/head/row/filter/input/DatagridTableHeadRowFilterInput";
import { DatagridTableHeadRowFilterDatepicker } from "@features/datagrid/table/head/row/filter/datepicker/DatagridTableHeadRowFilterDatepicker";
import { DatagridTableHeadRowFilterSelect } from "@features/datagrid/table/head/row/filter/select/DatagridTableHeadRowFilterSelect";
import { useDatagridTableActionColumnCellHeight } from "@features/datagrid/table/action-column/useDatagridTableActionColumnCellHeight";
import { useDatagridContext } from "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
import { DatagridColumn } from "@features/datagrid/DatagridColumn";

/** 6 Resources */

/**
 * Строка фильтров таблицы
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridTableHeadRowFilter = () => {
    const { collection, checkbox } = useDatagridContext();
    const rowRef = useRef(null);
    const height = useDatagridTableActionColumnCellHeight(rowRef);

    const filterComponents = useMemo(() => ({
        date: (name, filterProps) => <DatagridTableHeadRowFilterDatepicker name={name} {...filterProps}/>,
        input: (name, filterProps) => <DatagridTableHeadRowFilterInput name={name} {...filterProps}/>,
        select: (name, filterProps) => <DatagridTableHeadRowFilterSelect name={name} {...filterProps}/>,
    }), []);

    /**
     * @todo Пометка о доработки функции рендера, возможно перенос логики в класс DatagridColumn.
     *
     * Рендерит фильтр ячейки по экземпляру колонки.
     *
     * @param {DatagridColumn} column Экземпляр колонки таблицы.
     *
     * @return {null|React.ReactNode} Фильтр
     */
    const renderFilterCellByColumn = useCallback((column) => {
        const filter = column.property('filter');
        const name = column.property('name');

        if (Obj.isset(filter, 'name')) {
            let { name: filterName, ...filterProps } = filter;

            if (Obj.isset(filterComponents, filterName)) {
                return filterComponents[filterName](name, filterProps);
            }
        } else if (Func.assert(filter)) {
            return filter(collection);
        }

        return null;
    }, []);

    return collection.columnsHasSomeEnabledFilter() && (
        <tr ref={rowRef}>
            <DatagridTableHeadRowFilterCellCheckbox
                {...checkbox}
            />
            {collection.eachActiveColumns((column) => (
                <td key={`filter-${column.property('name')}`}>
                    {renderFilterCellByColumn(column)}
                </td>
            ))}
            <DatagridTableActionColumnHeadCell height={height} as='td'/>
        </tr>
    );
};

DatagridTableHeadRowFilter.propTypes = {};
DatagridTableHeadRowFilter.defaultProps = {};