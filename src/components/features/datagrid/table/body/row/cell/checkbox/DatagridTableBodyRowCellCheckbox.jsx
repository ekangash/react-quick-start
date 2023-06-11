/** 1 NodeModules */
import React from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { InputCheckbox } from "@shared/input/checkbox/InputCheckbox";
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { InputRadio } from "@shared/input/radio/InputRadio";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Чекбокс, для выбора записей из таблицы
 *
 * @param {!AppEntity} entity Сущность
 * @param {boolean} [single=false] Единичный выбор записей из таблицы
 * @param {boolean} [multiple=false] Множественный выбор записей из таблицы
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridTableBodyRowCellCheckbox = ({ entity, single, multiple}) => {
    const { collection, actions } = useDatagridContext();

    let  input = null;

    if (single && !multiple) {
        input = (
            <InputRadio
                name={collection.key}
                selected={entity.property('selected', (val) => val, () => false)}
                onChange={(selected) => {
                    collection.mapActiveEntities((entity) => entity.setProperty('selected', false));
                    entity.setProperty('selected', selected);
                    actions.nextVersion();
                }}
            />
        );
    } else if (!single && multiple) {
        input = (
            <InputCheckbox
                checked={entity.property('selected', (val) => val, () => false)}
                onChange={(checked) => {
                    entity.setProperty('selected', checked);
                    actions.nextVersion();
                }}
            />
        );
    }

    return ( input != null ?
            <td>
                {input}
            </td> : null
    );
};

DatagridTableBodyRowCellCheckbox.propTypes = {
    entity: propTypes.instanceOf(Entity).isRequired,
    single: propTypes.bool,
    multiple: propTypes.bool,
};

DatagridTableBodyRowCellCheckbox.defaultProps = {
    single: false,
    multiple: false,
};
