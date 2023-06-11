/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Заголовок списка с функционалом добавления пользовательских опций
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectListHeaderAdd = () => {
    const { inputValue, actions } = useSelectContext();
    const addOptionMessage = 'Добавить опцию:';

    /**
     * Добавляет новую пользовательскую опцию
     *
     * @function
     *
     * @return {void}
     */
    const onTagsAddListItemClick = () => {
        actions.addTagOption();
    };

    return (
        <Dropdown.Item
            className='select-list__item select-list__item_highlight'
            onClick={onTagsAddListItemClick}
        >
            {addOptionMessage} {inputValue}
        </Dropdown.Item>
    );
};

SelectListHeaderAdd.propTypes = {};
SelectListHeaderAdd.defaultProps = {};