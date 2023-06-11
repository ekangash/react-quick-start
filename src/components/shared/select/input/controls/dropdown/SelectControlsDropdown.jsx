/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Элемент управления отображением списка
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectControlsDropdown = ()  => {

    return (
        <div className='select__control select__control_dropdown'>
            <Icon
                path={mdiChevronDown}
                size={0.9}
                title='Раскрыть список'
            />
        </div>
    );
};

SelectControlsDropdown.propTypes = {};
SelectControlsDropdown.defaultProps = {};