/** 1 NodeModules */
import React, { useRef } from "react";
import { nanoid } from "nanoid";

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableHeadRowSharedCell } from "@features/datagrid/table/head/row/shared/cell/DatagridTableHeadRowSharedCell";
import { DatagridTableHeadRowSharedCellCheckbox } from "@features/datagrid/table/head/row/shared/cell/checkbox/DatagridTableHeadRowSharedCellCheckbox";
import { DatagridTableActionColumnHeadCell } from "@features/datagrid/table/action-column/head/cell/DatagridTableActionColumnHeadCell";

import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { useDatagridTableActionColumnCellHeight } from "@features/datagrid/table/action-column/useDatagridTableActionColumnCellHeight";
import { useConst } from "@hooks/useConst";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Строка шапки таблицы
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableHeadRowShared = () => {
    const { collection, checkbox } = useDatagridContext();
    const entity = useConst(() => new collection.entityClass());

    const rowRef = useRef(null);
    const height = useDatagridTableActionColumnCellHeight(rowRef);

    return (
        <tr ref={rowRef} >
            <DatagridTableHeadRowSharedCellCheckbox
                {...checkbox}
            />
            {collection.eachActiveColumns((column) => {
                const name = column.property('name');
                const label = column.property('label');

                return (
                    <DatagridTableHeadRowSharedCell
                        key={nanoid(16)}
                        label={Str.contains(label) ? label : entity.label(name)}
                        sort={column.property('sort')}
                        name={name}
                        entity={entity}
                    />
                )
            })}
            <DatagridTableActionColumnHeadCell height={height} as='th'/>
        </tr>
    );
};

DatagridTableHeadRowShared.propTypes = {};
DatagridTableHeadRowShared.defaultProps = {};