/** 1 NodeModules */
import React from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { InputCheckbox } from "@shared/input/checkbox/InputCheckbox";
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Чекбокс в шапке таблицы
 *
 * @param {boolean} [single=false] Единичный чекбокс
 * @param {boolean} [multiple=false] Множественный чекбокс
 *
 * @return {JSX.Element|null} DOM-элемент
 */
export const DatagridTableHeadRowSharedCellCheckbox = ({ single, multiple }) => {
    const { collection, actions } = useDatagridContext();

    if (single && !multiple) {
        return <th/>
    }

    return (multiple && !single) ? (
        <th>
            <InputCheckbox
                checked={collection.someInActiveEntities((entity) => entity.property('selected', (val) => val, () => false))}
                onChange={(checked) => {
                    collection.mapActiveEntities((entity) => entity.setProperty('selected', checked));
                    actions.nextVersion();
                }}
            />
        </th>
    ) : null;
};

DatagridTableHeadRowSharedCellCheckbox.propTypes = {
    single: propTypes.bool,
    multiple: propTypes.bool,
};

DatagridTableHeadRowSharedCellCheckbox.defaultProps = {
    single: false,
    multiple: false,
};
