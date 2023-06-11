/** 1 NodeModules */
import React, { useEffect, useReducer } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Collection as CollectionUtil } from '@packages/collection/Collection';
import { Obj } from "@packages/helpers/object/Obj";
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
import { FormGroup } from 'react-bootstrap';
import { useFormContext, Controller } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { Select } from '@shared/select/Select';
import { Form } from '@features/form/Form';
import { AppExceptionHandler } from '@app/exception/AppExceptionHandler';
import { useConst } from '@hooks/useConst';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Действие изменения
 *
 * @type {number}
 */
const ACTION_CHANGE = 1;

/**
 * Действия редюсера
 *
 * @param {object} state Состояние
 * @param {string} type Тип
 * @param {object} payload Полезная нагрузка
 *
 * @return {object} Состояние
 */
const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTION_CHANGE:
            return {...state, ...payload};
        default:
            return state;
    }
};

/**
 * Компонент селекта формы
 *
 * @param {Function} [forEntity=null] Класс сущности
 * @param {string} [forMethod='search'] Метод получения данных из сущности
 * @param {string} [attrName=''] Наименование атрибута
 * @param {object[]} [options=[]] Опции селекта
 * @param {Function} [where=() => {}] Условие поиска в сущности
 * @param {string} [label=''] Метка селекта
 * @param {!string} name Наименование поля
 * @param {string[]} [className=[]] Массив классов
 * @param {Array<string|number>} [defaultValues=[]] Значения опций по умолчанию
 * @param {object} [selectSettings={}] Пропсы для селекта
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormSelect = ({
    forEntity,
    forMethod,
    attrName,
    options,
    where,
    label,
    name,
    className,
    defaultValues,
    selectSettings
}) => {
    const { entity, control } = useFormContext();
    const [{ version, searching, selectOptions, loadingError }, dispatch] = useReducer(reducer, {
        version: 0,
        searching: true,
        selectOptions: options,
        loadingError: false,
    });

    let selectEntity = null;
    let selectCollection = null;

    if (forEntity !== null && Str.contains(attrName)) {
        selectEntity = new forEntity;
        selectCollection = () => (new CollectionUtil()).forEntity(forEntity).forMethod(forMethod).where(where);
    }

    const collection = useConst(selectCollection);

    if (collection) {
        collection.onFetching = () => searching === false && actions.changePayload({ version: 0, searching: true });
        collection.onFetched = ({ data }) => {
            const options = data.map((entity) => ({ value: entity.id, label: entity[attrName] }));
            actions.changePayload({ version: version + 1, searching: false, selectOptions: options });
        };
        collection.onFetchFailed = (exception) => {
            (new AppExceptionHandler()).handle(exception);
            actions.changePayload({ version: version + 1, searching: false, loadingError: true });
        };
    }

    useEffect(() => {
        if (collection) {
            collection.fetch();
        }
    }, []);

    const actions = {
        /**
         * Изменяет полезную нагрузку состояния
         *
         * @param {object} [payload={}] Полезная нагрузка
         *
         * @return {void}
         */
        changePayload: (payload = {}) => {
            dispatch({ type: ACTION_CHANGE, payload });
        }
    };

    return (
        <FormGroup controlId={name} className={classNames(...className)}>
            <Form.Label label={label} name={name} />
            <Controller
                name={name}
                control={control}
                defaultValue={null}
                render={({
                    field: { name, onBlur, onChange, ref },
                    formState: { errors },
                    fieldState: { error },
                }) => {
                    const fieldHasError = Obj.isset(errors, name);

                    return (
                        <div>
                            <Select
                                className={classNames({ 'is-invalid': fieldHasError })}
                                options={selectOptions}
                                name={name}
                                defaultValues={defaultValues}
                                onChange={onChange}
                                onBlur={onBlur}
                                ref={ref}
                                loadingError={loadingError}
                                {...selectSettings}
                                disabled={entity.property('only', (only) => !only.includes(name) || selectSettings.disabled, () => selectSettings.disabled)}
                            />
                            {fieldHasError ? (<div className='invalid-feedback'>
                                {error.message}
                            </div>) : ''}
                        </div>
                    );
                }}
            />
        </FormGroup>
    );
};

FormSelect.propTypes = {
    forEntity: propTypes.oneOfType([
        propTypes.func,
        propTypes.instanceOf(null),
    ]),
    forMethod: propTypes.string,
    attrName: propTypes.string,
    options: propTypes.arrayOf(propTypes.object),
    where: propTypes.func,
    label: propTypes.string,
    name: propTypes.string.isRequired,
    className: propTypes.arrayOf(propTypes.string),
    defaultValues: propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
    selectSettings: propTypes.object,
};

FormSelect.defaultProps = {
    forEntity: null,
    forMethod: 'search',
    attrName: '',
    options: [],
    where: () => {},
    label: '',
    className: [],
    defaultValues: [],
    selectSettings: {},
};