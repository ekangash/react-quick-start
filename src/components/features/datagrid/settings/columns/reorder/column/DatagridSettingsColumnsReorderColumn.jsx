/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Draggable } from 'react-beautiful-dnd';

import Icon from '@mdi/react';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/datagrid/settings/columns/DatagridSettingsColumns.scss';

/**
 * Настраиваемая колонка
 *
 * @param {!string} icon Иконка
 * @param {!number} index Индекс колонки
 * @param {!object} column Колонка
 * @param {!string} nameColumn Класс колонки
 * @param {!object} entityLabel Метка
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridSettingsColumnsReorderColumn = ({
     icon,
     index,
     column,
     nameColumn,
     entityLabel,
 }) => {

    return (
        <Draggable
            index={index}
            draggableId={column.key}
        >
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`datagrid-settings-columns-sortable${nameColumn}`}
                >
                    <Icon path={icon} size={0.8} />
                    <span className='ml-2'>
                        {entityLabel.label(column.name)}
                    </span>
                </li>
            )}
        </Draggable>
    );
};

DatagridSettingsColumnsReorderColumn.propTypes = {
    icon: propTypes.string.isRequired,
    index: propTypes.number.isRequired,
    nameColumn: propTypes.string.isRequired,
    column: propTypes.object.isRequired,
    entityLabel: propTypes.object.isRequired,
};

DatagridSettingsColumnsReorderColumn.defaultProps = {};