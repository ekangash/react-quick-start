/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
import { FormGroup } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { FormChooserCollection } from '@features/form/chooser/collection/FormChooserCollection';
import { Form } from '@features/form/Form';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Чузер формы
 *
 * @param {!Function} forEntity Сущность
 * @param {Function} [onEntityCached=() => ''] Функция для инициализации сущности
 * @param {Function} [onInputValue=() => ''] Функция, устанавливающая выбранное значение в input
 * @param {Function} [onFormValue=() => ''] Функция, устанавливающая выбранное значение в форму
 * @param {string} [forMethod='search'] Наименование метода выбора данных
 * @param {string} [relationName=''] Наименование отношения
 * @param {boolean} [multiple=false] Множественный выбор
 * @param {boolean} [single=false] Одиночный выбор
 * @param {object[]} [columns=[]] Колонки таблицы
 * @param {string} [label=''] Метка поля
 * @param {string} [placeholder=''] Плейсхолдер
 * @param {string} [name=''] Наименование поля
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormChooser = ({
    forEntity,
    onEntityCached,
    onInputValue,
    onFormValue,
    forMethod,
    relationName,
    multiple,
    single,
    columns,
    label,
    placeholder,
    name,
}) => {
    const { entity, control } = useFormContext();

    return (
        <FormGroup
            controlId={name}
        >
            <Form.Label label={label} name={name} />
            <Controller
                control={control}
                name={name}
                defaultValue={entity.attribute(name) ?? ''}
                render={({
                    field: { onChange, onBlur, name: filedName, value},
                    formState: { errors }
                }) => {
                    return (
                        <FormChooserCollection
                            name={filedName}
                            onEntityCached={(entity) => onEntityCached(entity, value)}
                            heading={entity.label(name)}
                            forEntity={forEntity}
                            forMethod={forMethod}
                            columns={columns}
                            single={single}
                            multiple={multiple}
                            onInputValue={onInputValue}
                            onFormValue={onFormValue}
                            relationName={relationName}
                            onChange={(value) => onChange( value || '')}
                            onBlur={onBlur}
                            errors={errors}
                            placeholder={Str.contains(placeholder) ? placeholder : entity.placeholder(name)}
                        />
                    )
                }}
            />
        </FormGroup>
    );
};

FormChooser.propTypes = {
    forEntity: propTypes.func.isRequired,
    name: propTypes.string,
    forMethod: propTypes.string,
    placeholder: propTypes.string,
    label: propTypes.string,
    relationName: propTypes.string,
    columns: propTypes.array,
    onInputValue: propTypes.func,
    onFormValue: propTypes.func,
    onEntityCached: propTypes.func,
    multiple: propTypes.bool,
    single: propTypes.bool,
};

FormChooser.defaultProps = {
    forMethod: 'search',
    name: '',
    placeholder: '',
    label: '',
    relationName: '',
    multiple: false,
    single: false,
    columns: [],
    onInputValue: () => '',
    onFormValue: () => '',
    onEntityCached: () => '',
};