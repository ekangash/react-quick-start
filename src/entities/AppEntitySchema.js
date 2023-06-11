/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { yup } from '@config/yup/yup';
import { Obj } from "@packages/helpers/object/Obj";
import { Arr } from "@packages/helpers/array/Arr";
import { Str } from "@packages/helpers/string/Str";
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс для работы со схемой валидации сущности
 *
 * @class AppEntitySchema
 */
export class AppEntitySchema extends Entity {

    /**
     * Функция-getter схемы валидации
     *
     * @return {object} Объект схемы валидации
     */
    schema = () => yup.object({});

    /**
     * Возвращает схему валидации
     *
     * @param {string[]} [attributes=[]] Массив атрибутов
     *
     * @return {object} Схема валидации
     */
    getSchema(attributes= []) {
        return this.getFilteredSchemaWithLabels(this.schema(), attributes);
    }

    /**
     * Проверяет является ли поле обязательным
     *
     * @param {string} fieldName Наименование поля
     * @param {object|null} [schema=null] Объект схемы валидации
     *
     * @return {boolean} Является ли поле обязательным
     */
    fieldIsRequired(fieldName, schema= null) {
        let validateSchema = schema;

        if (schema === null) {
            validateSchema = this.getSchema();
        }

        const fieldRules = validateSchema.describe().fields[fieldName];

        if (Obj.isset(fieldRules, 'tests')) {
            return fieldRules.tests.findIndex(({ name }) => name === 'required') >= 0;
        }

        return false;
    }

    /**
     * Задает метку полю в схеме валидации
     *
     * @param {string} fieldName Наименование поля
     * @param {string} label Метка поля
     * @param {object} validationSchema Схема валидации
     *
     * @return {void}
     */
    setLabel(fieldName, label, validationSchema) {
        validationSchema.fields[fieldName].spec.label = label;
    }

    /**
     * Задает метки из сущности для всех полей схемы валидации
     *
     * @param {object} validationSchema Схема валидации
     *
     * @return {void}
     */
    setDefaultLabels(validationSchema) {
        Object.keys(validationSchema.fields).forEach((fieldName) => {
            const fieldSpec = validationSchema.fields[fieldName].spec;

            if (!Str.contains(fieldSpec.label)) {
                this.setLabel(fieldName, this.label(fieldName), validationSchema);
            }
        });
    }

    /**
     * Возвращает отфильтрованную схему валидации с добавленными из сущности метками
     *
     * @param {object} validationSchema Схема валидации
     * @param {string[]} [attributes=[]] Массив наименований атрибутов для фильтрации
     *
     * @return {object} Отфильтрованная схема валидации с проставленными метками
     */
    getFilteredSchemaWithLabels(validationSchema, attributes = []) {
        let filteredSchema = validationSchema;

        if (Arr.contains(attributes)) {
            filteredSchema = validationSchema.pick(attributes);
        }

        this.setDefaultLabels(filteredSchema);

        let serverValidationFields = {};
        const fieldsDescription = validationSchema.describe().fields;

        Object.entries(fieldsDescription).forEach(([fieldName, field]) => {
            field.tests.forEach((fieldTest) => {
                if (fieldTest.name === 'serverValidation') {
                    serverValidationFields[fieldName] = fieldTest;
                }
            });
        });

        filteredSchema.serverValidationFields = serverValidationFields;
        filteredSchema.entity = this;

        return filteredSchema;
    }
}