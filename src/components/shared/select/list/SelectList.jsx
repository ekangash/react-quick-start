/** 1 NodeModules */
import React, { forwardRef, useCallback } from "react";
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { SelectListItem } from "@shared/select/list/item/SelectListItem";
import { SelectListHeader } from "@shared/select/list/header/SelectListHeader";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Выпадающий список
 *
 * @param {boolean} [show=false] Видимость выпадающего списка
 * @param {string} [className=''] Класс
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectList = forwardRef(({ show, className }, ref) => {
    const { selectedOptions, filteredOptions, settings } = useSelectContext();

    /**
     * Рендерит массив элементов списка опций
     *
     * @function
     *
     * @return {JSX.Element[]} Массив DOM-элементов опций
     */
    const renderOptionsList = useCallback(() => {
        let isOptionAlreadyHighlighted = false;

        return filteredOptions.map((option) => {
            let isHighlight = !option.disabled && !selectedOptions.includes(option) && !isOptionAlreadyHighlighted;
            isOptionAlreadyHighlighted = isHighlight || isOptionAlreadyHighlighted;

            return <SelectListItem key={option.value} isHighlight={isHighlight} option={option}/>
        });
    }, [filteredOptions, selectedOptions]);

    return (
        <Dropdown.Menu
            style={{maxHeight: settings.listHeight}}
            className={classNames(className, 'select__list select-list')}
            ref={ref}
        >
            <SelectListHeader/>
            {renderOptionsList()}
        </Dropdown.Menu>
    );
});

SelectList.propTypes = {
    show: propTypes.bool,
    className: propTypes.string,
};

SelectList.defaultProps = {
    show: false,
    className: '',
};