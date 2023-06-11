/** 1 NodeModules */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
import { useLocation } from 'react-router-dom';

/** 4 Components, Hooks - Custom */
import { AppExceptionHandler } from "@app/exception/AppExceptionHandler";
import { DatagridTable } from "@features/datagrid/table/DatagridTable";
import { DatagridTableHead } from "@features/datagrid/table/head/DatagridTableHead";
import { DatagridTableBody } from "@features/datagrid/table/body/DatagridTableBody";
import { DatagridProvider } from  "@features/datagrid/context/DatagridContext";
import { DatagridPagination } from "@features/datagrid/pagination/DatagridPagination";
import { DatagridPanel } from "@features/datagrid/panel/DatagridPanel";
import { DatagridLoader } from "@features/datagrid/loader/DatagridLoader";
import { DatagridSettings } from "@features/datagrid/settings/DatagridSettings";
import { DatagridSearch } from "@features/datagrid/search/DatagridSearch";
import { DatagridScore } from "@features/datagrid/score/DatagridScore";

import { useConst } from "@hooks/useConst";
import { useVersion, ACTION_CHANGE } from "@hooks/useVersion";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities, Stores, Services */
import { AppBootboxStore } from '@store/app/AppBootbox';
import { DatagridCollection } from "@features/datagrid/collection/DatagridCollection";
import { DatagridSettings as DatagridSettingsEntity } from "@entities/public/DatagridSettings";

/** 6 Resources */

/**
 * Коллекция
 *
 * @param {!function} forEntity Класс сущности
 * @param {string} [forMethod='search'] Метод выбора данных из сущности
 * @param {boolean} [frame=false] Добавлять ли класс card к обертке таблицы
 * @param {function(query:Query)} [where=() => null] Условие поиска данных
 * @param {function(entity:Entity):void} [onEntityCached=() => null] Функция, срабатывающая при инициализации сущности
 * @param {bool} [useSearchWhenDidMounted=false] Инициализировать поиск, когда компонент был смонтирован
 * @param {!(JSX.Element[]|JSX.Element|function)} children Дочерние DOM узлы
 * @param {object[]} [columns=[]] Колонки таблицы
 * @param {array} [deps=[]] Зависимости обновления условия и таблицы
 * @param {object} [checkbox={}] Настройки для столбца чекбоксов
 * @param {string[]} [className=['']] Имена классов.
 * @param {object} [actionColumn={}] Опции для колонки действий
 * @param {boolean} [enablePushState=true] Скрывать/добавлять в адресную строку параметры фильтрации и сортировки таблицы
 *
 * @return {JSX.Element} DOM узлы
 */
export const Datagrid = ({
   forEntity,
   forMethod,
   frame,
   where,
   onEntityCached,
   useSearchWhenDidMounted,
   children,
   checkbox,
   columns,
   deps,
   className,
   actionColumn,
   enablePushState,
}) => {
    const reduceInitState = { searching: useSearchWhenDidMounted };
    const { state: { searching, version }, methods: reducerMethods, dispatch } = useVersion(reduceInitState);
    const { getWhereFunc } = useDatagridUrlSearchParams();
    const location = useLocation();

    const collection = useConst(() => {
        return (new DatagridCollection())
            .forEntity(forEntity)
            .forMethod(forMethod)
            .forColumns(columns)
            .where(where)
            .forSettings((new DatagridSettingsEntity()).getFromLocalStorage());
    });

    collection.onFetching = () => {
        if (searching === false) {
            dispatch({ type: ACTION_CHANGE, payload: { version: 0, searching: true } });
        }
    };
    collection.onFetched = () => {
        dispatch({type: ACTION_CHANGE, payload: {version: version + 1, searching: false}});
    };
    collection.onFetchFailed = (exception) => {
        (new AppExceptionHandler()).fillEvents({
            onNotFound: () => {
                AppBootboxStore.alert('Выборка данных к таблице потерпела неудачу');
            }
        }).handle(exception);
        dispatch({type: ACTION_CHANGE, payload: {version: version + 1, searching: false}});
    };

    useEffect(() => {
        if (version === 0) {
            collection.onEntityCached = onEntityCached;
        }

        if (version > 0) {
            collection.where(where);
        }

        if (useSearchWhenDidMounted) {
            if (enablePushState) {
                collection.where(getWhereFunc(collection));
            }

            collection.fetch();
        }
    }, [...deps, location]);

    return (
        <DatagridProvider
            searching={searching}
            state={{ searching, version }}
            collection={collection}
            actions={reducerMethods}
            checkbox={checkbox}
            actionColumn={actionColumn}
            columns={columns}
            enablePushState={enablePushState}
            forMethod={forMethod}
        >
            <section className={classNames({ ['card border-default']: frame }, ...className)}>
                {Func.assert(children) ? children({ collection }) : children}
            </section>
        </DatagridProvider>
    );
};

Datagrid.propTypes = {
    className: propTypes.array,
    forEntity: propTypes.func.isRequired,
    children: propTypes.any.isRequired,
    forMethod: propTypes.string,
    where: propTypes.func,
    onEntityCached: propTypes.func,
    deps: propTypes.array,
    frame: propTypes.bool,
    checkbox: propTypes.object,
    useSearchWhenDidMounted: propTypes.bool,
    columns: propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.object])),
    actionColumn: propTypes.object,
    enablePushState: propTypes.bool,
};

Datagrid.defaultProps = {
    className: [''],
    where: () => null,
    onEntityCached: () => null,
    useSearchWhenDidMounted: false,
    frame: false,
    forMethod: 'search',
    deps: [],
    checkbox: {},
    columns: [],
    actionColumn: {},
    enablePushState: true,
};

Datagrid.Settings = (props) => <DatagridSettings {...props}/>;
Datagrid.Loader = (props) => <DatagridLoader {...props}/>;
Datagrid.Panel = (props) => <DatagridPanel {...props}/>;
Datagrid.Search = (props) => <DatagridSearch {...props}/>;
Datagrid.Score = (props) => <DatagridScore {...props}/>;
Datagrid.Table = (props) => <DatagridTable {...props}/>;
Datagrid.TableBody = (props) => <DatagridTableBody {...props}/>;
Datagrid.TableHead = (props) => <DatagridTableHead {...props}/>;
Datagrid.Pagination = (props) => <DatagridPagination {...props}/>;
