/** 1 NodeModules */
import React, { forwardRef, useReducer, useRef } from "react";
import { createPortal } from 'react-dom';
import classNames from "classnames";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { SelectProvider } from "@shared/select/context/SelectContext";
import { SelectLabel } from "@shared/select/label/SelectLabel";
import { SelectInput } from "@shared/select/input/SelectInput";
import { SelectList } from "@shared/select/list/SelectList";
import { useSelectReducer } from "@shared/select/useSelectReducer";
import { ACTION_FOCUSED, ACTION_UNFOCUSED, FocusReducer } from '@shared/select/SelectActions';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@shared/select/Select.scss';

/**
 * Селект
 *
 * @param {object[]} [options=[]] Массив опций
 * @param {Array<string|number>} [defaultValues=[]] Массив выбранных значений по умолчанию
 * @param {object} [_settings={}] Объект настроек
 *
 * @return {JSX.Element} DOM-элемент
 */
export const Select = forwardRef(({ options: _options, defaultValues: _defaultValues, ..._settings }, ref) => {
    const [focused, dispatchFocused] = useReducer(FocusReducer, false);
    const {
        options,
        filteredOptions,
        selectedOptions,
        inputValue,
        settings,
        listVisibility,
        actions,
        getSelectedValues
    } = useSelectReducer(_options, _defaultValues, _settings);

    const inputValueRef = useRef();
    const listRef = useRef();
    const classes = classNames('select', { 'select_focused': focused }, _settings?.className);
    const validationIsInvalid = _settings?.className.split(' ').includes('is-invalid');

    /**
     * Обрабатывает фокусировку на элементах селекта
     *
     * @function
     *
     * @param {Event} event Событие фокуса
     *
     * @return {void}
     */
    const onSelectBlur = (event) => {
        const clickedElementInBelongToSelect = (settings.portal && listRef.current.contains(event.relatedTarget))
            || event.currentTarget.contains(event.relatedTarget);

        if (!clickedElementInBelongToSelect) {
            if (settings.onBlur) {
                settings.onBlur(event);
            }

            actions.blurHandler();
            dispatchFocused({ type: ACTION_UNFOCUSED});
            actions.changeListVisibility(false);
        }
    };

    /**
     * Обрабатывает фокусировку на селекте
     *
     * @function
     *
     * @param {Event} event Событие фокуса
     *
     * @return {void}
     */
    const onSelectFocus = (event) => {
        if (settings.onFocus) {
            settings.onFocus(event);
        }

        dispatchFocused({ type: ACTION_FOCUSED});
        actions.changeListVisibility(true);
    };

    /**
     * Обрабатывает событие клика на селект
     *
     * @function
     *
     * @param {Event} event Событие клика
     *
     * @return {void}
     */
    const onClick = (event) => {
        let onClick = _settings.onClick;

        if (onClick) {
            onClick(event);
        }

        inputValueRef.current.focus();
    };

    return (
        <SelectProvider
            options={options}
            filteredOptions={filteredOptions}
            selectedOptions={selectedOptions}
            inputValue={inputValue}
            settings={settings}
            listVisibility={listVisibility}
            actions={actions}
        >
            <div
                className={classes}
                onFocus={onSelectFocus}
                onBlur={onSelectBlur}
                onClick={onClick}
            >
                <SelectLabel text={settings.label}/>
                <Dropdown show={listVisibility}>
                    <SelectInput ref={inputValueRef} validationIsInvalid={validationIsInvalid}/>
                    {settings.portal ? createPortal(<SelectList
                            show={false}
                            className='w-auto'
                            ref={listRef}
                        />, document.querySelector('#root'))
                        : <SelectList show={false}/>}
                </Dropdown>
            </div>
        </SelectProvider>
    );
});

Select.propTypes = {
    label: propTypes.string, // Метка селекта
    multiple: propTypes.bool, // Множественный селект
    tags: propTypes.bool, // Разрешено ли добавление пользовательских опций
    disabled: propTypes.bool,
    required: propTypes.bool,
    name: propTypes.string, // Наименование селекта
    className: propTypes.string,
    placeholder: propTypes.string,
    width: propTypes.oneOfType([propTypes.string, propTypes.number]), // Ширина
    listHeight: propTypes.oneOfType([propTypes.string, propTypes.number]), // Высота списка
    loadingError: propTypes.bool,
    closeOnSelect: propTypes.bool, // Скрывать ли список при выборе значения
    options: propTypes.arrayOf(propTypes.shape({
        value: propTypes.oneOfType([propTypes.string, propTypes.number]),
        label: propTypes.oneOfType([propTypes.string, propTypes.number]),
        selected: propTypes.bool,
        disabled: propTypes.bool,
    })),
    defaultValues: propTypes.arrayOf(propTypes.oneOfType([propTypes.number, propTypes.string])),
    portal: propTypes.bool, // Показывать ли выпадающий список вне основного потока рендера
};

Select.defaultProps = {
    label: '',
    multiple: false,
    tags: false,
    disabled: false,
    required: true,
    name: '',
    className: '',
    placeholder: '',
    width: 'auto',
    listHeight: 'auto',
    loadingError: false,
    closeOnSelect: true,
    options: [],
    defaultValues: [],
    portal: false,
};