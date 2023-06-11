/** 1 NodeModules */
import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Опция выпадающего списка
 *
 * @param {!object} option Опция
 * @param {boolean} [isHighlight=false] Является ли элемент подсвеченным
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectListItem = ({ option, isHighlight }) => {
    const { actions, selectedOptions } = useSelectContext();
    const [isSelected, setIsSelected] = useState(false );
    const classes = classNames('select-list__item', { 'select-list__item_highlight': isHighlight });

    /**
     * Добавляет или удаляет из выбранных опцию из выпадающего списка при клике
     *
     * @funciton
     *
     * @return {void}
     */
    const onOptionClick = () => {
        if (isSelected) {
            actions.removeOption(option);
        } else {
            actions.selectOption(option);
        }
    };

    useEffect(() => {
        setIsSelected(selectedOptions.includes(option));
    }, [selectedOptions, option]);

    return (
        <Dropdown.Item
            disabled={option.disabled}
            active={isSelected}
            onClick={onOptionClick}
            className={classes}
        >
            {option.label}
        </Dropdown.Item>
    );
};

SelectListItem.propTypes = {
    option: propTypes.object.isRequired,
    isHighlight: propTypes.bool,
};

SelectListItem.defaultProps = {
    isHighlight: false,
};