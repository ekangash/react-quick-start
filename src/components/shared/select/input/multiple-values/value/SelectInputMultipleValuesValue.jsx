/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { SelectControlsDelete } from "@shared/select/input/controls/delete/SelectControlsDelete";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Выбранная опции при множественном выборе
 *
 * @param {!object} option Опция
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectInputMultipleValuesValue = ({ option }) => {
    const { actions } = useSelectContext();
    const classes = classNames('select-input__values', 'select-input__values_multiple', { 'select-input__values_disabled': option.disabled })

    /**
     * Обрабатывает клик на кнопку удаления опции при множественном выборе
     *
     * @function
     *
     * @return {void}
     */
    const onMultipleSelectedOptionDeleteBtnClick = () => {
        actions.removeOption(option);
    };

    return (
        <span className={classes}>
            {option.label}
            {option.disabled ? '' : (<SelectControlsDelete clickHandler={onMultipleSelectedOptionDeleteBtnClick}/>) }
        </span>
    );
};

SelectInputMultipleValuesValue.propTypes = {
    option: propTypes.object.isRequired,
};

SelectInputMultipleValuesValue.defaultProps = {};