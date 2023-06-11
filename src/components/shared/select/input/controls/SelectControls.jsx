/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { SelectControlsDelete } from "@shared/select/input/controls/delete/SelectControlsDelete";
import { SelectControlsDropdown } from "@shared/select/input/controls/dropdown/SelectControlsDropdown";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Обертка для элементов управления селектом
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectControls = () => {
    const { actions } = useSelectContext();

    /**
     * Обрабатывает клик на кнопку удаления элемента селекта
     *
     * @function
     *
     * @return {void}
     */
    const onRemoveBtnClick = () => {
        actions.removeAllOptions();
    };

    return (
        <div className='select__controls'>
            <SelectControlsDelete clickHandler={onRemoveBtnClick}/>
            <SelectControlsDropdown/>
        </div>
    );
};

SelectControls.propTypes = {};
SelectControls.defaultProps = {};