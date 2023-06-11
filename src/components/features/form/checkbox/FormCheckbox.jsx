/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { FormGroup, FormCheck } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { Form } from '@features/form/Form';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Чекбокс формы
 *
 * @param {string} [label=''] Метка чекбокса
 * @param {!string} name Наименование поля
 * @param {boolean} [defaultValue=false] Значение по умолчанию
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormCheckbox = ({ name, label, defaultValue }) => {
    const { entity, control } = useFormContext();

    return (
        <FormGroup
            controlId={name}
        >
            <Controller
                name={name}
                control={control}
                defaultValue={entity.attribute(name, (value) => value, defaultValue)}
                render={({
                    field: { name, value, onBlur, onChange, ref},
                }) => {
                    return (
                        <FormCheck>
                            <FormCheck.Input
                                isInvalid
                                type={'checkbox'}
                                checked={value}
                                onChange={() => onChange(!value)}
                                onBlur={onBlur}
                                ref={ref} />
                            <Form.Label label={label} name={name} />
                        </FormCheck>
                    );
                }}
            />
        </FormGroup>
    );
};

FormCheckbox.propTypes = {
    label: propTypes.string,
    name: propTypes.string.isRequired,
    defaultValue: propTypes.bool,
};

FormCheckbox.defaultProps = {
    label: '',
    defaultValue: false,
};