/** 1 NodeModules */
import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
import { Entity } from "@packages/entity/Entity";
import { Obj } from "@packages/helpers/object/Obj";
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
import { useFormContext } from "react-hook-form";

/** 4 Components, Hooks - Custom */
import { Datagrid } from "@features/datagrid/Datagrid";
import { FormChooserCollectionControl } from "@features/form/chooser/collection/control/FormChooserCollectionControl";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Коллекция чузера
 *
 * @param {!Function} forEntity Сущность
 * @param {!Function} onEntityCached Функция для инициализации сущности
 * @param {!Function} onInputValue Функция, устанавливающая выбранное значение в input
 * @param {!Function} onFormValue Функция, устанавливающая выбранное значение в форму
 * @param {!string} forMethod Наименование метода выбора данных
 * @param {!string} relationName Наименование отношения
 * @param {!boolean} multiple Множественный выбор
 * @param {!boolean} single Одиночный выбор
 * @param {!object[]} columns Колонки таблицы
 * @param {!string} placeholder Плейсхолдер
 * @param {!string} name Наименование поля
 * @param {string} [heading=''] Заголовок модального окна с таблицей
 * @param {!Function} onChange Функция-обработчик изменения выбранного значения
 * @param {!Function} onBlur Функция-обработчик снятия фокуса
 * @param {object} [errors={}] Объект ошибок валидации
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormChooserCollection = ({
    forEntity,
    forMethod,
    onEntityCached,
    onInputValue,
    onFormValue,
    multiple,
    single,
    columns,
    onChange,
    onBlur,
    heading,
    name,
    errors,
    relationName,
    placeholder
}) => {
    const { entity } = useFormContext();
    /**
     * Возвращает значение для видимого поля input-а
     *
     * @param {Entity[]} entities Массив выбранных сущностей
     *
     * @return {string} Значение выдимого поля input
     */
    const getInputValue = useCallback((entities) => {
        let inputValue = '';

        if (single && entities.length === 1) {
            inputValue = onInputValue(entities[entities.length - 1]);
        } else if (multiple) {
            for (let entity of entities) {
                inputValue = `${inputValue}${Str.empty(inputValue) ? '' : ';'}${onInputValue(entity)}`;
            }
        }

        return inputValue ?? '';
    }, []);

    /**
     * Получает значение из поля формы
     *
     * @param {Entity[]} entities Массив выбранных сущностей
     *
     * @return {any|string|any[]} Значение чузера
     */
    const getFormValue = useCallback((entities) => {
        if (single && entities.length === 1) {
            return onFormValue(entities[entities.length - 1]);
        } else if (multiple) {
            let formValue = [];

            for (let entity of entities) {
                formValue.push(onFormValue(entity));
            }

            return formValue;
        }

        return '';
    }, []);

    const [inputValue, setInputValue] = useState(() => {
        if (single) {
            let relation = entity.relationshipOneToOne(relationName);

            return relation instanceof Entity ? getInputValue([relation]) : '';
        } else if (multiple) {
            return '';
        }

        return '';
    });

    /**
     * Обрабатывает событие на кнопку "Выбрать" в диалоговом окне чузера
     *
     * @param {Collection} collection Экземпляр коллекции
     *
     * @return {void}
     */
    let onSelectedDialog = (collection) => {
        const entities = collection.findEntitiesByCondition((entity) => Boolean(entity.property('selected')));
        const formValue = getFormValue(entities);
        const inputValue = getInputValue(entities);

        setInputValue(inputValue);
        onChange(formValue);
        onBlur(formValue);
    };

    /**
     * Очищает выбранное значение чузера
     *
     * @return {void}
     */
    let onDeselectedDialog = () => {
        setInputValue('');
        onChange('');
        onBlur('');
    };

    return (
        <Datagrid
            forEntity={forEntity}
            forMethod={forMethod}
            columns={columns}
            checkbox={{ multiple, single, name }}
            onEntityCached={onEntityCached}
            enablePushState={false}
        >
            {({ collection }) => (
                <>
                    <FormChooserCollectionControl
                        invalid={Obj.isset(errors, name)}
                        className={[classNames({ 'is-invalid': Obj.isset(errors, name) })]}
                        value={inputValue}
                        heading={heading}
                        onDeselected={onDeselectedDialog}
                        onSelected={() => onSelectedDialog(collection)}
                        onOpen={() => collection.fetch()}
                        placeholder={placeholder}
                        name={name}
                        onBlur={onBlur}
                        inputClassName={[classNames({ 'is-invalid': Obj.isset(errors, name) })]}
                    >
                        <Datagrid.Loader>
                            <Datagrid.Panel>
                                <Datagrid.Search />
                            </Datagrid.Panel>
                            <Datagrid.Table>
                                <Datagrid.TableHead />
                                <Datagrid.TableBody
                                    useRowCheckboxSelect
                                />
                            </Datagrid.Table>
                            <Datagrid.Score />
                            <Datagrid.Pagination />
                        </Datagrid.Loader>
                    </FormChooserCollectionControl>
                    {errors?.[name]?.message && <div className="invalid-feedback">{errors[name].message}</div>}
                </>
            )}
        </Datagrid>
    );
};

FormChooserCollection.propTypes = {
    name: propTypes.string.isRequired,
    forMethod: propTypes.string.isRequired,
    forEntity: propTypes.func.isRequired,
    onEntityCached: propTypes.func.isRequired,
    single: propTypes.bool.isRequired,
    multiple: propTypes.bool.isRequired,
    columns: propTypes.array.isRequired,
    onFormValue: propTypes.func.isRequired,
    onInputValue: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
    onBlur: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    relationName: propTypes.string.isRequired,
    errors: propTypes.object,
    heading: propTypes.string,
};

FormChooserCollection.defaultProps = {
    errors: {},
    heading: '',
};
