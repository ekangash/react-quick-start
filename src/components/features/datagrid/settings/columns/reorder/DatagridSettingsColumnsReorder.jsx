/** 1 NodeModules */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff, mdiSwapHorizontal } from '@mdi/js/commonjs/mdi';

/** 4 Components, Hooks - Custom */
import { DatagridSettingsColumnsReorderColumn } from '@features/datagrid/settings/columns/reorder/column/DatagridSettingsColumnsReorderColumn';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Переопределитель положения колонок
 *
 * @param {!object[]} columns Колонки
 * @param {function} [onChange=() => null] Обработчик изменения
 * @param {!object} entityLabel Метка
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridSettingsColumnsReorder = ({columns, onChange, entityLabel}) => {
    const [columnsDrag, setColumnsDrag] = useState({
        items: [...columns].filter(column => column.active),
        selected: [...columns].filter(column => !column.active),
    });

    useEffect(() => {
        onChange([...columnsDrag.items, ...columnsDrag.selected])
    }, [columnsDrag]);

    const idList = {
        droppable: 'items',
        droppableSecond: 'selected'
    };

    const getList = id => columnsDrag[idList[id]];

    /**
     * Переопределяет положение элементов внутри колонки
     *
     * @param {object[]} list Массив с элементами колонки
     * @param {number} startIndex Индекс элемента до перемещения
     * @param {number} endIndex Индекс элемента после перемещения
     *
     * @return {object[]} Массив с текущим расположением элементов в колонке
     */
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Перемещает элемент между колонками
     *
     * @param {object[]} source Массив с перемещаемым элементом
     * @param {object[]} destination Массив элементов колонки места назначения
     * @param {object} droppableSource Данные об исходном местоположении элемента
     * @param {object} droppableDestination Данные о конечном местоположении элемента
     *
     * @return {object} Объекты с элементами после перемещения
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = [...source];
        const destClone = [...destination];

        const [removed] = sourceClone.splice(droppableSource.index, 1);
        removed.active = !removed.active;

        destClone.splice(droppableDestination.index, 0, removed);

        return {
            [droppableSource.droppableId]: sourceClone,
            [droppableDestination.droppableId]: destClone,
        };
    };

    /**
     * Завершает обработку перемещения между между колонками
     *
     * @param {object} result Данные о перемещении элемента
     *
     * @return {void}
     */
    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            setColumnsDrag({ ...columnsDrag, [idList[source.droppableId]]: items });

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setColumnsDrag({
                items: result.droppable,
                selected: result.droppableSecond
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='datagrid-settings-columns-container'>
                <Droppable droppableId='droppable'>
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            className='datagrid-settings-columns-sortable'
                        >
                            <li className='datagrid-settings-columns-header'>
                                Отображаемые колонки
                            </li>
                            {columnsDrag.items.map((column, idx) => (
                                <DatagridSettingsColumnsReorderColumn
                                    column={column}
                                    key={column.key}
                                    index={idx}
                                    icon={mdiEye}
                                    nameColumn={'-on'}
                                    entityLabel={entityLabel}
                                />
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <div className='col-sm-2 text-center'>
                    <Icon path={mdiSwapHorizontal} size={2.5} color={'#999'}/>
                </div>
                <Droppable droppableId='droppableSecond'>
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            className='datagrid-settings-columns-sortable'
                        >
                            <li className='datagrid-settings-columns-header'>
                                Скрытые колонки
                            </li>
                            {columnsDrag.selected.map((column, idx) => (
                                <DatagridSettingsColumnsReorderColumn column={column} key={column.key} index={idx} icon={mdiEyeOff} nameColumn={'-off'} entityLabel={entityLabel}/>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

DatagridSettingsColumnsReorder.propTypes = {
    columns: propTypes.array.isRequired,
    entityLabel: propTypes.object.isRequired,
    onChange: propTypes.func,
};

DatagridSettingsColumnsReorder.defaultProps = {
    onChange: () => null,
};