/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
import { FormControl as  FormControlBootstrap, FormGroup, FormText } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormContext, Controller } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { Form } from '@features/form/Form';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/form/control/addon/FormControlAddon.scss';

/**
 * Поле формы с дополнением
 *
 * @param {!string} name Наименование поля
 * @param {string} [text=''] Текст, отображаемый под полем
 * @param {string} [textAddon=''] Текст, отображаемый в дополнительной плашке
 * @param {string} [type='text'] Тип поля
 * @param {boolean} [disabled=false] Сделать поле неактивным
 * @param {boolean} [readOnly=false] Только чтение
 * @param {string} [label=''] Метка поля
 * @param {string} [placeholder=''] Плейсхолдер
 * @param {string[]} [className=[]] Массив классов
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormControlAddon = ({
     name,
     text,
     textAddon,
     type,
     disabled,
     readOnly,
     label,
     placeholder,
     className,
}) => {
    const { entity, control } = useFormContext();

    return (
        <FormGroup
            className={classNames(...className)}
            controlId={name}
        >
            <Form.Label label={label} name={name} isShowRequired={false} />
            <Controller
                control={control}
                name={name}
                defaultValue={''}
                render={({
                    field: { onChange: onChange, onBlur, name: filedName, value, ref},
                    formState: {errors}
                }) => (
                    <>
                        <InputGroup className="mb-3">
                            <FormControlBootstrap
                                className={classNames({'is-invalid': errors.hasOwnProperty(name)})}
                                ref={ref}
                                value={value ?? ''}
                                readOnly={readOnly}
                                disabled={entity.property('only', (only) => !only.includes(name) || disabled, () => disabled)}
                                placeholder={Str.contains(placeholder) ? placeholder : entity.placeholder(name)}
                                onChange={(event) => {
                                    onChange(event.target.value || '');
                                }}
                                onBlur={onBlur}
                                type={type}
                                name={filedName}
                            />
                            <InputGroup.Text className='form-control-addon-text'>{textAddon}</InputGroup.Text>
                        </InputGroup>
                        {Str.contains(text) && (
                            <FormText muted>
                                {text}
                            </FormText>
                        )}
                        {errors?.[name]?.message && <div className='invalid-feedback'>{errors[name].message}</div>}
                    </>
                )}
            />
        </FormGroup>
    );
};

FormControlAddon.propTypes = {
    name: propTypes.string.isRequired,
    className: propTypes.array,
    type: propTypes.string,
    disabled: propTypes.bool,
    readOnly: propTypes.bool,
    placeholder: propTypes.string,
    label: propTypes.string,
    text: propTypes.string,
    textAddon: propTypes.string,
};

FormControlAddon.defaultProps = {
    disabled: false,
    readOnly: false,
    placeholder: '',
    label: '',
    className: [],
    type: 'text',
    text: '',
    textAddon: '',
};