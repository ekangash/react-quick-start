/** 1 NodeModules */
import React, { useCallback, useMemo } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { Entity } from '@packages/entity/Entity';
import { Func } from '@packages/helpers/function/Func';

/** 3 Components, Hooks, Icons - NodeModules */
import { FormProvider, useForm } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { AppExceptionHandler } from "@app/exception/AppExceptionHandler";
import { FormControl } from '@features/form/control/FormControl';
import { FormControlAddon } from '@features/form/control/addon/FormControlAddon';
import { FormChooser } from '@features/form/chooser/FormChooser';
import { FormFile } from '@features/form/file/FormFile';
import { FormDatepicker } from '@features/form/datepicker/FormDatepicker';
import { FormSelect } from '@features/form/select/FormSelect';
import { FormLabel } from '@features/form/label/FormLabel';
import { FormCheckbox } from '@features/form/checkbox/FormCheckbox';
import { FormConfirm } from '@features/form/confirm/FormConfirm';
import {useFormYupValidationResolver} from "@features/form/useFormYupValidationResolver";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Форма
 *
 * @param {array} [attributes=[]] Аттрибуты
 * @param {string} [mode='onBlur'] Режим
 * @param {string} [reValidateMode='onBlur'] Стратегия валидации после сабмита формы
 * @param {Function} [onSubmit=() => null] Функция-обработчик сабмита формы
 * @param {!(JSX.Element[]|JSX.Element|string)} children Дочерние элементы
 * @param {!AppEntity} entity Сущность
 * @param {string[]} [className=''] Массив классов
 * @param {boolean} [showAlertBeforeLeavePage=true] Показывать ли предупреждение при закрытии/обновлении страницы если форма была изменена
 *
 * @return {JSX.Element} DOM-элемент
 */
export const Form = ({
    attributes,
    mode,
    reValidateMode,
    onSubmit,
    children,
    entity,
    className,
    showAlertBeforeLeavePage,
}) => {
    let defaultFormValues = entity.getAttributes(attributes);

    const schema = useMemo(() => entity.getSchema(attributes), [entity]);
    const formMethods = useForm({
        mode: mode,
        reValidateMode: reValidateMode,
        defaultValues: defaultFormValues,
        resolver: useFormYupValidationResolver(schema, { abortEarly: true }),
    });
    const onSubmitCallback = useCallback(async (value) => {
        try {
            await onSubmit(entity.fill(value, true), value)
        } catch (exception) {
            (new AppExceptionHandler()).handle(exception);
        }
    }, []);

    return (
        <FormProvider {...formMethods} entity={entity} schema={schema}>
            <form
                id={entity.key}
                className={classNames(className)}
                onSubmit={formMethods.handleSubmit(onSubmitCallback)}
            >
                {Func.assert(children) ? children(formMethods) : children}
            </form>

            {showAlertBeforeLeavePage && (
                <FormConfirm showPrompt={formMethods.formState.isDirty && !formMethods.formState.isSubmitting && !formMethods.formState.isSubmitted}/>
            )}
        </FormProvider>
    );
};

Form.propTypes = {
    className: propTypes.string,
    children: propTypes.any.isRequired,
    entity: propTypes.instanceOf(Entity).isRequired,
    attributes: propTypes.array,
    mode: propTypes.string,
    reValidateMode: propTypes.string,
    onSubmit: propTypes.func,
    showAlertBeforeLeavePage: propTypes.bool,
};

Form.defaultProps = {
    className: '',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    onSubmit: () => null,
    attributes: [],
    showAlertBeforeLeavePage: true,
};

Form.Control = (props) => <FormControl {...props}/>;
Form.ControlAddon = (props) => <FormControlAddon {...props}/>;
Form.Chooser = (props) => <FormChooser {...props}/>;
Form.File = (props) => <FormFile {...props}/>;
Form.Datepicker = (props) => <FormDatepicker {...props}/>;
Form.Select = (props) => <FormSelect {...props}/>;
Form.Label = (props) => <FormLabel {...props}/>;
Form.Checkbox = (props) => <FormCheckbox {...props}/>;