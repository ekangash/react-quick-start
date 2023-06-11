/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableBodyRow } from '@features/datagrid/table/body/row/DatagridTableBodyRow';
import { useDatagridContext } from  '@features/datagrid/context/DatagridContext';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Тело таблицы
 *
 * @param {boolean} [useRowCheckboxSelect=false] Использовать ли чекбокс в строке
 * @param {Function} [transitionToRoute=null] Функция получения ссылки на сущность
 * @param {string[]|string} [className=[]] Класс(ы) тела таблицы
 * @param {object} [rowOptions={}] Опции строки
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableBody = ({ useRowCheckboxSelect, transitionToRoute, className, rowOptions }) => {
    const { collection } = useDatagridContext();

    return (
        <tbody className={classNames(className)}>
        {collection.empty() || collection.activeEntitiesIsEmpty() ? (
            <tr>
                <td colSpan='16'>
                    <div className='empty text-center w-100'>Ничего не найдено.</div>
                </td>
            </tr>
        ) : collection.mapActiveEntities((entity) =>
                <DatagridTableBodyRow
                    key={entity.key}
                    entity={entity}
                    useRowCheckboxSelect={useRowCheckboxSelect}
                    transitionToRoute={transitionToRoute}
                    rowOptions={rowOptions}
                />
            )
        }
        </tbody>
    );
};

DatagridTableBody.propTypes = {
    className: propTypes.array,
    transitionToRoute: propTypes.func,
    useRowCheckboxSelect: propTypes.bool,
    rowOptions: propTypes.object,
};

DatagridTableBody.defaultProps = {
    className: [],
    useRowCheckboxSelect: false,
    transitionToRoute: null,
    rowOptions: {},
};
