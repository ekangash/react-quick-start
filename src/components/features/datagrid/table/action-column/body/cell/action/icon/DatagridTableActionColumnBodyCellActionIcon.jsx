/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from '@packages/helpers/object/Obj';

/** 3 Components, Hooks, Icons - NodeModules */
import Icon from '@mdi/react';
import { mdiContentCopy, mdiDelete, mdiEye, mdiPencil } from '@mdi/js';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */

/** 6 Resources */

/**
 * Иконки для действий по умолчанию
 *
 * @type {{view: string, edit: string, createBasedOn: string, delete: string}}
 */
const ACTION_ICONS = {
    view: mdiEye,
    edit: mdiPencil,
    createBasedOn: mdiContentCopy,
    delete: mdiDelete,
};

/**
 * Иконка действия строки.
 *
 * @param {!string} action Наименования действия
 * @param {string} [path=null] Путь до mdi иконки.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridTableActionColumnBodyCellActionIcon = ({ action, path }) => {
    return (path || Obj.isset(ACTION_ICONS, action)) ? (
        <Icon
            path={path || Obj.get(ACTION_ICONS, action)}
            size={0.6}
        />
    ) : null
};

DatagridTableActionColumnBodyCellActionIcon.propTypes = {
    action: propTypes.string.isRequired,
    path: propTypes.oneOfType([
        propTypes.object,
        propTypes.instanceOf(null)
    ]),
};

DatagridTableActionColumnBodyCellActionIcon.defaultProps = {
    path: null,
};