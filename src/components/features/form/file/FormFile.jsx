/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { FormFile as FormFileBootstrap, FormGroup, Button } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

/** 4 Components, Hooks - Custom */
import { Form } from '@features/form/Form';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/form/file/FormFile.css';

/**
 * Поле формы с выбором файла
 *
 * @param {!string} name Наименование поля
 * @param {boolean} [disabled=false] Флаг скрытия поля
 * @param {string} [label=''] Метка поля
 * @param {string[]} [className=[]] Наименования классов
 *
 * @return {JSX.Element} DOM узлы
 */
export const FormFile = ({ name, disabled, label, className }) => {
    const { entity, control, formState: {errors}, setValue } = useFormContext();

        return (
        <FormGroup
            className={classNames(...className)}
            controlId={name}
        >
            <Form.Label label={label} name={name} />
            <Controller
                control={control}
                name={name}
                render={({
                    field: { onChange, onBlur, name: filedName, value, ref },
                    formState: { errors }
                }) => (
                    <>
                        <div className='d-flex'>
                            <FormFileBootstrap
                                className={[classNames({ 'is-invalid': errors.hasOwnProperty(name) })]}
                                ref={ref}
                                value={''}
                                onChange={event => {
                                    let files = event.target.files;

                                    if (files instanceof FileList && files.length > 0) {
                                        onChange(files[0]);
                                        onBlur();
                                    }
                                }}
                                onBlur={onBlur}
                                name={filedName}
                                disabled={disabled}
                                custom={true}
                                label={value instanceof File ? value.name : 'Добавить файл'}
                                lang={'ru'}
                                data-browse={'Загрузить'}
                            />
                            {value instanceof File && (
                                <Button
                                    className='ml-2'
                                    variant={'danger'}
                                    size='sm'
                                    onClick={(event) => {
                                        onChange({})
                                        onBlur()
                                    }}
                                >
                                    <Icon path={mdiCloseCircle} size={0.8} className={'remove-button-icon'} />
                                </Button>
                            )}
                        </div>
                        {errors?.[name]?.message && <div className='invalid-feedback'>{errors[name].message}</div>}
                    </>
                )}
            />
        </FormGroup>
    );
};

FormFile.propTypes = {
    name: propTypes.string.isRequired,
    className: propTypes.array,
    disabled: propTypes.bool,
    label: propTypes.string,
};

FormFile.defaultProps = {
    disabled: false,
    label: '',
    className: [],
};