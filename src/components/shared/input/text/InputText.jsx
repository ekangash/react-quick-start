/** 1 NodeModules */
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Текстовое поле ввода
 *
 * @param {string|number} [value=''] Значение
 * @param {Function} [onBlur=() => null] Обработчик снятия фокуса
 * @param {Function} [onChange=() => null] Обработчик изменения
 * @param {Function} [onEnter=() => null] Обработчик ввода
 * @param {string} [type='text'] Тип
 * @param {string[]} [className=[]] Массив классов
 * @param {boolean} [disabled=false] Заблокировать ли поле
 *
 * @return {JSX.Element} DOM-элемент
 */
export const InputText = ({ value, onBlur, onChange, onEnter, type, className, disabled }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    return (
        <input
            className={classNames('form-control', ...className)}
            onChange={(event) => {
                let value = event.target.value;
                setInputValue(value);
                onChange(value, event);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    onEnter(event.target.value, event);
                }
            }}
            onBlur={(event) => onBlur(event.target.value, event)}
            value={inputValue}
            type={type}
            disabled={disabled}
        />
    );
};

InputText.propTypes = {
    className: propTypes.array,
    onBlur: propTypes.func,
    onEnter: propTypes.func,
    onChange: propTypes.func,
    value: propTypes.string,
    type: propTypes.string,
    disabled: propTypes.bool,
};

InputText.defaultProps = {
    className: [],
    onBlur: () => null,
    onChange: () => null,
    onEnter: () => null,
    value: '',
    type: 'text',
    disabled: false,
};
