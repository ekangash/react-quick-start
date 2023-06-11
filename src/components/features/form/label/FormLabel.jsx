/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from '@packages/helpers/string/Str';

/** 3 Components, Hooks, Icons - NodeModules */
import { useFormContext } from 'react-hook-form';
import { FormLabel as Label } from 'react-bootstrap';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/form/label/FormLabel.css';

/**
 * Метка поля формы
 *
 * @param {!string} name Наименование поля
 * @param {string} [label=''] Метка
 * @param {boolean} [isShowRequired=true] Показывать ли звездочку
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormLabel = ({ label, name, isShowRequired}) => {
    const { entity, schema } = useFormContext();

    return (
        <>
            {(Str.contains(label) || Str.contains(entity.label(name))) && (
                <Label className={classNames({ 'required': isShowRequired && entity.fieldIsRequired(name, schema) })}>
                    {label || entity.label(name)}
                </Label>
            )}
        </>
    );
};

FormLabel.propTypes = {
    name: propTypes.string.isRequired,
    label: propTypes.string,
    isShowRequired: propTypes.bool,
};

FormLabel.defaultProps = {
    label: '',
    isShowRequired: true,
};