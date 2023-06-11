/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { YupLocale } from '@config/yup/YupLocale';
import { Str } from "@packages/helpers/string/Str";
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */

/** 6 Resources */

/**
 * Возвращает объект значений yup-рефов
 *
 * @param {object} schema Объект схемы валидации
 * @param {object} refs Объект рефов
 *
 * @return {object} Объект значений рефов
 */
const getRefsValues = (schema, refs) => {
    let refsValues = {};

    if (Obj.contains(refs)) {
        try {
            Object.entries(refs).forEach(([key, ref]) => {
                refsValues[key] = schema.resolve(ref) ?? '';
            });
        } catch(error) {
            throw Error('Не удалось получить значение yup-рефа');
        }
    }

    return refsValues;
};

/**
 * Кастомная валидация
 *
 * @param {function(string, object, object):boolean} validationCallback Функция валидации
 *      возвращает boolean,
 *      принимает текущее значение поля (value),
 *      массив yup-рефов на связанные поля (refs),
 *      другие параметры для валидации (...params)
 *
 * @param {string} message Сообщение валидации
 * @param {object} refs Объект ссылок на другие поля схемы (связанные поля)
 * @param {object} params Остальные параметры
 *
 * @return {object} Объект схемы валидации
 */
export function yupClientValidationMethod(validationCallback, message, refs, ...params) {
    return this.test({
        name: 'clientValidation',
        message: Str.contains(message) ? message : 'Поле не прошло валидацию!',
        test: function(value) {
            let refsValues = getRefsValues(this, refs);

            return validationCallback(value, refsValues, ...params);
        },
    });
}

/**
 * Серверная валидация
 *
 * @param {null|function(object, array, ...params): boolean} [validationCallback=null] Функция валидации
 *      возвращает объект с сообщением валидации,
 *
 *      принимает объект со значениями всех полей формы (formValues),
 *      объект ответа от серверной валидации (response),
 *      другие параметры для валидации (...params)
 * @param {object} params Остальные параметры для валидации
 *
 * @return {object} Объект схемы валидации
 */
export function yupServerValidationMethod(validationCallback = null,  ...params) {
    return this.test({
        name: 'serverValidation',
        params: {
            validationCallback: validationCallback,
            params: params,
        },
        test: async function() {
            return true;
        },
    });
}

/**
 * Метод валидации кириллицы
 *
 * @param {boolean} strict Должно ли значение содержать только символы кириллицы
 *
 * @return {object} Объект схемы валидации
 */
export function yupCyrillicValidationMethod(strict) {
    return this.test({
        name: 'cyrillic',
        message: YupLocale.string.cyrillic,
        params: {
            strict: strict,
        },
        test: function (value) {
            const regexp = strict ? /^[А-Яа-я]+$/ : /^[^A-Za-z]+$/;
            const valueIsCyrillic = value.search(regexp);

            return Str.empty(value) || valueIsCyrillic > -1;
        }
    });
}

/**
 * Метод валидации латиницы
 *
 * @param {boolean} strict Должно ли значение содержать только символы латиницы
 *
 * @return {object} Объект схемы валидации
 */
export function yupLatinValidationMethod(strict) {
    return this.test({
        name: 'latin',
        message: YupLocale.string.latin,
        params: {
            strict: strict,
        },
        test: function (value) {
            const regexp = strict ? /^[A-Za-z]+$/ : /^[^А-Яа-я]+$/;
            const valueIsLatin = value.search(regexp);

            return Str.empty(value) || valueIsLatin > -1;
        }
    });
}