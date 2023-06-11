/** 1 NodeModules */
import * as npmYup from "yup";

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */

/**
 * Максимальное значение integer в postgres
 *
 * @type {number}
 */
const MAX_NUMBER_SQL_LIMIT = 2147483647;

/**
 * Минимальное значение integer в postgres
 *
 * @type {number}
 */
const MIN_NUMBER_SQL_LIMIT = -2147483648;

/**
 * Трансформирует схему для обработки пустой строки
 *
 * @param {any} value Преобразованное значение
 * @param {any} originalValue Значение, введенное в поле
 *
 * @return {null|string} Непустая строка или null, если в поле ничего не введено
 */
function transformSchemaToAllowEmptyString(value, originalValue) {
    if (this.isType(value)) {
        return value;
    }

    if (Str.empty(originalValue.trim())) {
        return null;
    }

    return originalValue;
}

/**
 * Функция валидации числовых данных с возможностью передачи пустой строки
 *
 * @return {NumberSchema<number | undefined | null, AnyObject>} Схема валидации чисел
 */
export const YupCustomNumberSchema = function() {
    return new npmYup.NumberSchema()
        .transform(transformSchemaToAllowEmptyString)
        .nullable(true)
        .max(MAX_NUMBER_SQL_LIMIT)
        .min(MIN_NUMBER_SQL_LIMIT);
};

/**
 * Функция валидации поля даты с возможностью передачи пустой строки
 *
 * @return {DateSchema<Date | undefined | null, AnyObject>} Схема валидации даты
 */
export const YupCustomDateSchema = function() {
    return new npmYup.DateSchema().transform(transformSchemaToAllowEmptyString).nullable(true);
};

/**
 * Добавляет к схеме валидации правило для возможности содержания в поле null значения (для корректной отправки на сервер)
 *
 * @param {string} schemaName Наименование схемы валидации
 *
 * @return {function()} Функция-конструктор схемы валидации
 */
export const YupSchemaWithNullableValues = function(schemaName) {
    return () => new npmYup[schemaName]().nullable(true);
};