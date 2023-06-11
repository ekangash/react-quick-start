/** 1 NodeModules */
import React, { useState, useCallback } from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
import Icon from "@mdi/react";
import { mdiUnfoldMoreHorizontal, mdiSortAlphabeticalAscending, mdiSortAlphabeticalDescending } from "@mdi/js";

/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Общая ячейка шапки таблицы
 *
 * @param {!Entity} entity Сущность
 * @param {!string} label Наименование столбца таблицы
 * @param {!string} name Наименование атрибута
 * @param {!boolean} sort Сортировка
 *
 * @return {JSX.Element|null} DOM-элемент или null если столбец скрыт
 */
export const DatagridTableHeadRowSharedCell = ({ entity, label, name, sort }) => {
    const { collection } = useDatagridContext();
    const { changeSortUrlParams } = useDatagridUrlSearchParams();
    const [iconPath, setIconPath] = useState(() => {
        if (collection.query.isSortAscending(name)) {
            return mdiSortAlphabeticalDescending;
        } else if (collection.query.isSortDescending(name)) {
            return mdiSortAlphabeticalAscending;
        }

        return mdiUnfoldMoreHorizontal;
    });

    if (!sort) {
        return (
            <th>{Str.contains(label) ? label : entity.label(name)}</th>
        );
    }

    /**
     * Обрабатывает клик на сортировку колонки таблицы
     *
     * @return {void}
     */
    const onSortClickHandler = useCallback(() => collection.where(query => {
        let sortUrlParamValue = '';

        if (query.isSortAscending(name)) {
            query.clearSortParts();
            query.desc(name);
            sortUrlParamValue = `-${name}`;
            setIconPath(mdiSortAlphabeticalDescending);
        } else if (query.isSortDescending(name)) {
            query.clearSortParts();
            setIconPath(mdiUnfoldMoreHorizontal);
        } else {
            query.clearSortParts();
            query.asc(name);
            sortUrlParamValue = name;
            setIconPath(mdiSortAlphabeticalAscending);
        }

        changeSortUrlParams(sortUrlParamValue);
        collection.fetch();
    }), []);

    return (
        <th>
            <a
                style={{ cursor: 'pointer' }}
                onClick={onSortClickHandler}
            >
                {Str.contains(label) ? label : entity.label(name)}
                <Icon
                    path={iconPath}
                    size={0.8}
                    horizontal
                />
            </a>
        </th>
    );
};

DatagridTableHeadRowSharedCell.propTypes = {
    name: propTypes.string.isRequired,
    entity: propTypes.instanceOf(Entity).isRequired,
    sort: propTypes.bool.isRequired,
    label: propTypes.string.isRequired,
};

DatagridTableHeadRowSharedCell.defaultProps = {};
