/** 1 NodeModules */
import { useCallback } from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from '@packages/helpers/object/Obj';
import { Func } from '@packages/helpers/function/Func';
import { API_RESPONSE } from "@enums/api/response/ApiResponse";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { AppExceptionHandler } from "@app/exception/AppExceptionHandler";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Возвращает валидируемые поля
 *
 * @param {object} clientValidationFields Поля формы, которые прошли клиентскую валидацию
 * @param {object} serverValidationFields Поля, для которых в схеме валидации указана серверная валидация
 * @param {object} currentValidationFields Текущие поля формы, для которых требуется валидация (при снятии фокуса это одно поле, при сабмите - все поля формы)
 *
 * @return {object[]} Массив валидируемых полей
 */
const getFieldsRequiredServerValidation = (clientValidationFields, serverValidationFields, currentValidationFields) => {
    const validationFieldsNames = Object.keys(clientValidationFields).filter((fieldName) => {
        return Obj.isset(currentValidationFields, fieldName) && Obj.isset(serverValidationFields, fieldName);
    });

    const validationFields = validationFieldsNames.map((fieldName) => {
        return {
            fieldName: fieldName,
            validationCallbackParams: serverValidationFields[fieldName].params.params,
            validationCallback: serverValidationFields[fieldName].params.validationCallback,
        };
    });

    return validationFields;
};

/**
 * Возвращает данные для отправки на сервер с приведенными значениями null и undefined к пустой строке
 *
 * @param {object} formFields Поля формы
 *
 * @return {object} Объект с приведенными данными
 */
const getConvertedValidationFields = (formFields) => {
    const convertedFormFields = {};

    Object.entries(formFields).forEach(([fieldName, fieldValue]) => {
        convertedFormFields[fieldName] = fieldValue ?? '';
    });

    return convertedFormFields;
};

/**
 * Отправляет запрос на сервер для валидации
 *
 * @param {object} clientValidationFields Объект значений, которые будут отправляться на сервер для валидации
 * @param {object} schema Схема валидации
 * @param {object} currentValidationFields Текущие поля для валидации
 * @param {object} formValues Все поля формы
 *
 * @return {object} Объект ошибок валидации сервера
 */
const serverValidation = async (clientValidationFields, schema, currentValidationFields, formValues) => {
    const validationFields = getFieldsRequiredServerValidation(clientValidationFields, schema.serverValidationFields, currentValidationFields);

    if (validationFields.length === 0) {
        return {};
    }

    const convertedFormFields = getConvertedValidationFields(clientValidationFields);

    return await schema.entity.validate(convertedFormFields)
        .then(() => ({}))
        .catch((exception) => {
            const response = Obj.get(exception, 'response');
            const exceptionResponseStatus = Obj.get(response, 'status');

            if (exceptionResponseStatus === API_RESPONSE.STATUSES.UNPROCESSABLE_ENTITY) {
                const exceptionResponseData = Obj.get(response, 'data', []);
                let serverValidationErrors = {};

                // Конвертация ответа сервера в формат ошибок react-hook-form
                exceptionResponseData.forEach(({ field, message }) => {
                    serverValidationErrors[field] = {
                        type: 'serverValidation',
                        message: message,
                    }
                });

                // Вызов callback-функции для поля после серверной валидации
                validationFields.forEach((validationField) => {
                    if (Func.assert(validationField.validationCallback)) {
                        const validationCallbackError = validationField.validationCallback(formValues, response, validationField.validationCallbackParams);
                        serverValidationErrors = { ...serverValidationErrors, ...validationCallbackError };
                    }
                });

                return serverValidationErrors;
            } else {
                (new AppExceptionHandler()).handle(exception);

                return {};
            }
        });
}

/**
 * Resolver для валидации формы
 *
 * @param {object} validationSchema Схема валидации
 *
 * @return {{values: {}, errors: {}}} Объект со значениями полей и ошибками валидации
 */
export const useFormYupValidationResolver = (validationSchema) => useCallback(
    async function(formValues, context, options) {
        try {
            const values = await validationSchema.validate(formValues, { abortEarly: false });
            const serverValidationErrors = await serverValidation(formValues, validationSchema, options.fields, formValues);

            return {
                values,
                errors: serverValidationErrors,
            };
        } catch (error) {
            const clientValidationErrors = error.inner.reduce(
                (allErrors, currentError) => ({
                    ...allErrors,
                    [currentError.path]: {
                        type: currentError.type ?? "validation",
                        message: currentError.message,
                    }
                }), {});

            const clientValidationFields = {};

            // Получение всех полей, которые прошли клиентскую валидацию чтобы их отправить для проверки на сервер
            Object.entries(formValues).forEach(([fieldName, fieldValue]) => {
                if (!Obj.isset(clientValidationErrors, fieldName)) {
                    clientValidationFields[fieldName] = fieldValue;
                }
            });

            const serverValidationErrors = await serverValidation(clientValidationFields, validationSchema, options.fields, formValues);

            return {
                values: {},
                errors: { ...serverValidationErrors, ...clientValidationErrors },
            };
        }
    }
);