/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Entity } from '@packages/entity/Entity';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Ячейка тела таблицы
 *
 * @param {!AppEntity} entity Сущность
 * @param {!string} name Наименование атрибута сущности
 * @param {!Function} value Функция для получения значения ячейки
 * @param {object} [cellOptions={}] Опции ячейки
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridTableBodyRowCellShared = ({ entity, name, value, cellOptions}) => (
    <td
        {...cellOptions}
    >
        {value(entity, name)}
    </td>
);

DatagridTableBodyRowCellShared.propTypes = {
    entity: propTypes.instanceOf(Entity).isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.func.isRequired,
    cellOptions: propTypes.object,
};

DatagridTableBodyRowCellShared.defaultProps = {
    cellOptions: {},
};