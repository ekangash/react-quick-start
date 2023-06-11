/** 1 NodeModules */
import React, { useEffect, useReducer } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Пользовательский хук редьюсера для селекта
 *
 * @param {object[]} _options Опции
 * @param {Array<string|number>} [_defaultValues=[]] Значения выбранных опций по умолчанию
 * @param {object} _settings Настройки
 *
 * @return {{settings, listVisibility, options, selectedOptions, inputValue, filteredOptions, actions: Object}}
 */
export function useSelectReducer(_options, _defaultValues = [], _settings) {
    /**
     * Редьюсер для обновления состояния селекта
     *
     * @param {object} state Предыдущее состояние
     * @param {{type: string, payload: object}} action Действие редьсера
     *
     * @return {object} Объект состояния
     */
    const stateReducer = (state, action) => {
        return {
            ...state,
            ...action.payload
        };
    };

    const [{ options, filteredOptions, selectedOptions, inputValue, defaultValues, settings, listVisibility }, dispatchState] = useReducer(stateReducer, {
        options: _options,
        filteredOptions: _options,
        selectedOptions: getSelectedOptions(_options, _defaultValues),
        inputValue: '',
        defaultValues: _defaultValues,
        settings: _settings,
        listVisibility: false,
    });

    /**
     * Обновляет состояние при изменении пропсов опций и опций по умолчанию
     *
     * @return {void}
     */
    useEffect(() => {
        actions.updateReducer(_options, _defaultValues, _settings);
    }, [_options, _defaultValues]);

    /**
     * Обновляет состояние при изменении пропсов настроек
     *
     * @return {void}
     */
    useEffect(() => {
        if (JSON.stringify(_settings) !== JSON.stringify(settings)) {
            actions.updateReducer(_options, _defaultValues, _settings);
        }
    }, [_settings]);

    /**
     * Действия редьюсера
     *
     * @type {object}
     */
    const actions = {
        /**
         * Добавляет опцию в выбранные
         *
         * @param {object} option Опциия
         *
         * @return {void}
         */
        selectOption: (option) => {
            let updatedInputValue = settings.multiple ? '' : option.label;
            let updatedSelectedOptions = settings.multiple ? [...selectedOptions, option] : [option];
            let updatedFilteredOptions = getFilteredOptions(options, '');

            dispatchState({
                type: 'add',
                payload: {
                    filteredOptions: updatedFilteredOptions,
                    selectedOptions: updatedSelectedOptions,
                    inputValue: updatedInputValue,
                },
            });

            triggerSelectChange(updatedSelectedOptions);
        },

        /**
         * Удаляет опцию из выбранных
         *
         * @param {object} removedOption Удаляемая опция
         *
         * @return {void}
         */
        removeOption: (removedOption) => {
            let updatedInputValue = settings.multiple ? '' : inputValue;
            let updatedSelectedOptions = [];

            if (settings.multiple) {
                updatedSelectedOptions = selectedOptions.filter((option) => {
                    return option.value !== removedOption.value;
                });
            }

            let updatedFilteredOptions = getFilteredOptions(options, updatedInputValue);

            dispatchState({
                type: 'remove',
                payload: {
                    filteredOptions: updatedFilteredOptions,
                    selectedOptions: updatedSelectedOptions,
                    inputValue: updatedInputValue,
                },
            });
            triggerSelectChange(updatedSelectedOptions);
        },

        /**
         * Удаляет последнюю опцию из выбранных при множественном выборе
         *
         * @return {void}
         */
        removeLastSelected: () => {
            if (!settings.multiple) {
                return;
            }

            let lastIsFound = false;
            let filteredSelectedOptions = selectedOptions.reverse().filter((option) => {
                if (lastIsFound || option.disabled) {
                    return option;
                }

                if (!option.disabled) {
                    lastIsFound = true;

                    return false;
                }
            }).reverse();

            dispatchState({
                type: 'removeLastSelected',
                payload: {
                    selectedOptions: filteredSelectedOptions,
                }
            });

            triggerSelectChange(filteredSelectedOptions);
        },

        /**
         * Удаление всех опций
         *
         * @return {void}
         */
        removeAllOptions: () => {
            let updatedSelectedOptions = options.filter((option) => {
                return option.disabled && (option.selected || defaultValues.includes(option.value));
            });
            let updatedInputValue = settings.multiple ||  updatedSelectedOptions.length === 0 ? '' : updatedSelectedOptions[0].label;
            let updatedFilteredOptions = getFilteredOptions(options, updatedInputValue);

            dispatchState({
                type: 'removeAll',
                payload: {
                    filteredOptions: updatedFilteredOptions,
                    selectedOptions: updatedSelectedOptions,
                    inputValue: updatedInputValue,
                },
            });

            triggerSelectChange(updatedSelectedOptions);
        },

        /**
         * Добавляет новую пользовательскую опцию
         *
         * @return {void}
         */
        addTagOption: () => {
            let addedOption = {
                value: inputValue,
                label: inputValue,
            };

            let updatedOptions = [...options, addedOption];
            let updatedInputValue = settings.multiple ? '' : inputValue;
            let updatedSelectedOptions = [addedOption];

            if (settings.multiple) {
                updatedSelectedOptions = [...selectedOptions, addedOption];
            }

            let updatedFilteredOptions = getFilteredOptions(options, updatedInputValue);

            dispatchState({
                type: 'addTagOption',
                payload: {
                    options: updatedOptions,
                    filteredOptions: updatedFilteredOptions,
                    selectedOptions: updatedSelectedOptions,
                    inputValue: updatedInputValue,
                }
            });

            triggerSelectChange(updatedSelectedOptions);
        },

        /**
         * Изменяет значение в поле ввода
         *
         * @param {string} newInputValue Новое значение инпута
         *
         * @return {void}
         */
        changeInputValue: (newInputValue) => {
            let updatedFilteredOptions = getFilteredOptions(options, newInputValue);

            dispatchState({
                type: 'changeInput',
                payload: {
                    filteredOptions: updatedFilteredOptions,
                    inputValue: newInputValue,
                    listVisibility: true,
                },
            });
        },

        /**
         * Заполняет селект нужным значением при снятии фокуса
         *
         * @return {void}
         */
        blurHandler: () => {
            let updatedInputValue = '';

            if (selectedOptions.length > 0 && !settings.multiple) {
                updatedInputValue = selectedOptions[0].label;
            }

            let updatedFilteredOptions = getFilteredOptions(options, '');

            dispatchState({
                type: 'blur',
                payload: {
                    filteredOptions: updatedFilteredOptions,
                    inputValue: updatedInputValue,
                },
            });
        },

        /**
         * Обновляет значения в редюсере
         *
         * @param {object[]} newOptions Новые опции
         * @param {Array<string|number>} newDefaultValues Новые значения по умолчанию
         * @param {object} newSettings Новые настройки
         *
         * @return {void}
         */
        updateReducer: (newOptions, newDefaultValues, newSettings) => {
            let updatedInputValue = '';
            let updatedSelectedOptions = getSelectedOptions(newOptions, newDefaultValues);

            if (!newSettings.multiple && updatedSelectedOptions.length > 0) {
                updatedInputValue = updatedSelectedOptions[0].label;
            }

            dispatchState({
                type: 'updateReducer',
                payload: {
                    options: newOptions,
                    filteredOptions: newOptions,
                    selectedOptions: updatedSelectedOptions,
                    inputValue: updatedInputValue,
                    defaultValues: newDefaultValues,
                    settings: newSettings,
                    listVisibility: false,
                },
            });
        },

        /**
         * Изменяет видимость выпадающего списка
         *
         * @param {boolean} listVisibility Видимость выпадающего списка
         *
         * @return {void}
         */
        changeListVisibility: (listVisibility) => {
            dispatchState({
                type: 'changeListVisibility',
                payload: { listVisibility: listVisibility },
            });
        },
    };

    /**
     * Возвращает значения выбранных опций
     *
     * @param {object[]} selectedOptions Выбранные опции
     *
     * @return {Array<string|number>} Значения выбранных опций
     */
    function getSelectedValues(selectedOptions) {
        let selectedOptionsValues = selectedOptions.map((option) => option.value);

        if (selectedOptionsValues.length === 0) {
            return null;
        }

        if (settings.multiple) {
            return selectedOptionsValues;
        }

        return selectedOptionsValues[0];
    }

    /**
     * Возвращает выбранные опции
     *
     * @param {object[]} options Опции
     * @param {string|number} value Значение для фильтрации
     *
     * @return {object[]} Выбранные опции
     */
    function getFilteredOptions(options, value) {
        let valueInLowerCase = value.toLowerCase();

        let filteredOptions = options.filter((option) => {
            return option.label.toLowerCase().includes(valueInLowerCase);
        });

        return filteredOptions;
    }

    /**
     * Возвращает выбранные опции
     *
     * @param {object[]} options Опции
     * @param {Array<string|number>} defaultValues Опции, выбранные по умолчанию
     *
     * @return {object[]} Массив выбранных опций
     */
    function getSelectedOptions(options, defaultValues) {
        let selected = options.filter((option) => {
            return option.selected || defaultValues.findIndex((element) => String(element) === String(option.value)) !== -1;
        });

        return selected;
    }

    /**
     * Триггерит изменения селекта с новыми выбранными опциями
     *
     * @param {Array<string|number>} selectedOptions Массив значений выбранных опций
     *
     * @return {void}
     */
    function triggerSelectChange(selectedOptions) {
        if (settings.onChange) {
            let selectedValues = getSelectedValues(selectedOptions);

            settings.onChange(selectedValues);
        }
    }

    return {
        options,
        filteredOptions,
        selectedOptions,
        inputValue,
        settings,
        listVisibility,
        actions,
    };
}