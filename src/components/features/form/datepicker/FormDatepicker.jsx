/** 1 NodeModules */
import React  from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
import { Controller, useFormContext } from 'react-hook-form';
import { Button, FormGroup } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

/** 4 Components, Hooks - Custom */
import { InputDatepicker } from '@shared/input/datepicker/InputDatepicker';
import { Form } from '@features/form/Form';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Поле формы с выбором даты
 *
 * @param {!string} name Наименование поля
 * @param {string[]} [className=[]] Массив классов
 * @param {string} [label=''] Метка поля
 * @param {boolean} [showClear=false] Показывать ли кнопку очищения в поле ввода
 * @param {boolean} [showIcon=true] Показывать ли иконку календаря в поле ввода
 * @param {boolean} [disabled=false] Заблокировать ли поле
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormDatepicker = ({ name, className, label, showClear, showIcon, disabled }) => {
    const { entity, control } = useFormContext();

    return (
        <FormGroup
            className={classNames(...className)}
            controlId={name}
        >
            <Form.Label label={label} name={name} />
            <Controller
                control={control}
                name={name}
                defaultValue={null}
                render={({
                    field: { onChange, onBlur, value},
                    formState: { errors },
                }) => (
                    <>
                        <div className={classNames('d-flex', { 'is-invalid': Obj.contains(errors, name) })}>
                            <InputDatepicker
                                value={value ?? ''}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder={entity.placeholder(name)}
                                showIcon={showIcon}
                                showClear={showClear}
                                disabled={entity.property('only', (only) => !only.includes(name) || disabled, () => disabled)}
                            />
                            <Button
                                onClick={() => {
                                    onChange(null);
                                    onBlur('');
                                }}
                                variant={'danger'}
                                className='ml-2'
                                size='sm'
                            >
                                <Icon path={mdiCloseCircle} size={0.8} color={'white'} />
                            </Button>
                        </div>
                        {errors?.[name]?.message && <div className='invalid-feedback'>{errors[name].message}</div>}
                    </>
                )}
            />
        </FormGroup>
    );
};

FormDatepicker.propTypes = {
    name: propTypes.string.isRequired,
    className: propTypes.array,
    label: propTypes.string,
    showIcon: propTypes.bool,
    showClear: propTypes.bool,
    disabled: propTypes.bool,
};

FormDatepicker.defaultProps = {
    className: [],
    label: '',
    showIcon: true,
    showClear: false,
    disabled: false,
};