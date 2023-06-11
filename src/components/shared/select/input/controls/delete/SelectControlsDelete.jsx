/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Элемент управления удалением
 *
 * @param {!Function} clickHandler Callback-функция, срабатывающия при клике на элемент управления
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectControlsDelete = ({ clickHandler }) => {
    const { selectedOptions, inputValue } = useSelectContext();

    return selectedOptions.length === 0 && inputValue?.length === 0 ? null : (
        <div className='select__control select__control_delete'>
            <Icon
                path={mdiCloseThick}
                size={0.6}
                title='Удалить'
                onClick={clickHandler}
            />
        </div>
    );
};

SelectControlsDelete.propTypes = {
    clickHandler: propTypes.func.isRequired,
};

SelectControlsDelete.defaultProps = {};