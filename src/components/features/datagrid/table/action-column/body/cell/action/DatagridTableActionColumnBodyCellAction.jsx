/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";
import { Obj } from '@packages/helpers/object/Obj';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableActionColumnBodyCellActionIcon } from "@features/datagrid/table/action-column/body/cell/action/icon/DatagridTableActionColumnBodyCellActionIcon";
import { useDatagridContext } from "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
import { AppEntity } from '@entities/AppEntity';

/** 6 Resources */

/**
 * Текст всплывающего описания кнопок
 *
 * @type {{view: string, edit: string, createBasedOn: string, delete: string}}
 */
const ACTION_TITLES = {
    view: 'Просмотр',
    edit: 'Редактирование',
    createBasedOn: 'Создать на основе',
    delete: 'Удалить',
};

/**
 * Компонент действия ActionColumn
 *
 * @param {!string} action Наименования действия
 * @param {!AppEntity} entity Сущность
 * @param {JSX.Element[]|JSX.Element|string|number} [element=<button/>] Отображаемый элемент в колонке
 * @param {string} [path=null] SVG-path иконки
 * @param {Function} [visibility=() => true] Функция видимости действия
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableActionColumnBodyCellAction = ({
    action,
    entity,
    element,
    path,
    visibility,
}) => {
    const { collection } = useDatagridContext();

    return (Func.assert(visibility) && visibility(entity)) && element({
        icon: (
            <DatagridTableActionColumnBodyCellActionIcon
                action={action}
                path={path}
            />
        ),
        props: {
            className: `datagrid-table-action-column__action`,
            ...(Obj.isset(ACTION_TITLES, action) ? { title: ACTION_TITLES[action] } : {})
        },
        entity,
        collection
    });
};

DatagridTableActionColumnBodyCellAction.propTypes = {
    action: propTypes.string.isRequired,
    entity: propTypes.instanceOf(AppEntity).isRequired,
    path: propTypes.oneOfType([
        propTypes.object,
        propTypes.instanceOf(null)
    ]),
    element: propTypes.oneOfType([
        propTypes.func,
        propTypes.instanceOf(null)
    ]),
    visibility:  propTypes.func,
};

DatagridTableActionColumnBodyCellAction.defaultProps = {
    path: null,
    element: ({ icon, props }) => (
        <button
            {...props}
        >
            {icon}
        </button>
    ),
    visibility: () => true,
};