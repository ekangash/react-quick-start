/** 1 NodeModules */
import React, { forwardRef, useCallback, useEffect } from "react";
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { SelectInputMultipleValues } from "@shared/select/input/multiple-values/SelectInputMultipleValues";
import { SelectControls } from "@shared/select/input/controls/SelectControls";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Ширина для инпута по умолчанию
 *
 * @type {number}
 * @const
 */
const DEFAULT_INPUT_WIDTH = 5;
/**
 * Отступ для инпута
 *
 * @type {number}
 * @const
 */
const INPUT_OFFSET = 4;

/**
 * Поле ввода и отображения выбранных значений селекта
 *
 * @param {boolean} [validationIsInvalid=false] Флаг не успешной валидации
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectInput = forwardRef(({ validationIsInvalid }, ref) => {
    const { inputValue, actions, settings, filteredOptions, selectedOptions } = useSelectContext();
    const inputRef = ref;

    const classes = classNames('form-control', 'select__input', 'select-input', 'd-flex', {
        'disabled': true,
        'is-invalid': validationIsInvalid,
    });

    useEffect(() => {
        setInputWidth(inputValue);
    }, [inputRef, inputValue]);

    /**
     * Изменяет длину поля ввода значения
     *
     * @function
     *
     * @param {string} inputValue Значение поля ввода
     *
     * @return {void}
     */
    const setInputWidth = useCallback((inputValue) => {
        let placeholder = settings.placeholder;
        let placeholderWidth = placeholder?.length;

        if (inputValue.length > 0) {
            inputRef.current.style.width = `${inputRef.current.scrollWidth + INPUT_OFFSET}px`;
            inputRef.current.placeholder = '';
        } else if (placeholderWidth) {
            inputRef.current.style.width = `${placeholderWidth}em`;
            inputRef.current.placeholder = placeholder;
        } else {
            inputRef.current.style.width = `${DEFAULT_INPUT_WIDTH}px`;
            inputRef.current.placeholder = '';
        }
    }, [inputRef, inputValue, settings]);

    /**
     * Обрабатывает изменение поля ввода
     *
     * @function
     *
     * @param {SyntheticInputEvent} event Событие изменение поля ввода
     *
     * @return {void}
     */
    const onChange = (event) => {
        let inputValue = event.target.value;

        setInputWidth(inputValue);
        actions.changeInputValue(inputValue);
    };

    /**
     * Обрабатывает событие прокрутки мыши в поле ввода и добавляет смещение
     *
     * @function
     *
     * @param {Event} event Событие прокрутки мыши
     *
     * @return {void}
     */
    const onInputWheel = (event) => {
        event.currentTarget.scrollLeft += 20 * Math.sign(event.deltaY);
    };

    /**
     * Обрабатывает нажание кнопки в поле ввода
     *
     * @function
     *
     * @param {Event} event Событие нажания клавиши
     *
     * @return {void}
     */
    const onKeyDown = (event) => {
        if (event.key === 'Backspace' && settings.multiple && selectedOptions.length > 0 && inputValue.length === 0) {
            actions.removeLastSelected();
        } else if (event.key === 'Enter' && inputValue.length > 0) {
            if (filteredOptions.length > 0) {
                let selectedOption = filteredOptions.find((option) => {
                    return !option.disabled && !selectedOptions.includes(option);
                });

                if (selectedOption) {
                    actions.selectOption(selectedOption);
                }
            } else if (settings.tags) {
                actions.addTagOption();
            }
        }
    };

    return (
        <Dropdown.Toggle
            as='fieldset'
            className={classes}
            disabled={settings.disabled}
        >
            <div className='select-input__overflow-hidden'>
                <div className='select-input__scroll-block' onWheel={onInputWheel}>
                    {settings.multiple ? <SelectInputMultipleValues/> : ''}
                    <div>
                        <input
                            spellCheck={false}
                            tabIndex={0}
                            ref={inputRef}
                            className='select-input__value'
                            value={inputValue}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                        />
                    </div>
                </div>
            </div>
            <SelectControls/>
        </Dropdown.Toggle>
    );
});

SelectInput.propTypes = {
    validationIsInvalid: propTypes.bool,
};

SelectInput.defaultProps = {
    validationIsInvalid: false,
};