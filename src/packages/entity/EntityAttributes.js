/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";
import { Arr } from "@packages/helpers/array/Arr";
import { EntityProperties } from "@packages/entity/EntityProperties";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс для работы с аттрибутами сущности.
 */
export class EntityAttributes extends EntityProperties {
    /**
     * Первичный ключ сущности.
     *
     * @type {string}
     * @static
     */
    static primaryKey = 'id'

    /**
     * Аттрибуты сущности и их значения.
     *
     * @type {object}
     */
    attributes = {}

    /**
     * Возвращает значение аттрибута первичного ключа.
     *
     * @return {number} Значение первичного ключа.
     */
    primary() {
        const primaryKey = this.constructor.primaryKey;

        return this.inAttributes(primaryKey) ? this.attributes[primaryKey] : null;
    }

    /**
     * Возвращает значение аттрибута.
     *
     * @param {string} attributeName Имя аттрибута.
     * @param {function} [modifyFn=(attributeValue) => attributeValue] Функция модифицирования значения атрибута.
     * @param {boolean|number|string|any[]|object|null} defaultValue Значение по умолчанию.
     *
     * @return {boolean|number|string|any[]|object|null} Значение аттрибута.
     */
    attribute(attributeName, modifyFn = (attributeValue) => attributeValue, defaultValue = null) {
        const attributeValue = this.attributes.hasOwnProperty(attributeName)
            ? this.attributes[attributeName]
            : defaultValue;

        return modifyFn(attributeValue);
    }

    /**
     * Возвращает значение аттрибута мз вложенного объекта.
     *
     * @param {string[]} names Имя аттрибута.
     * @param {object} [defaultValue=null] Значение по умолчанию.
     *
     * @return {object} Значение аттрибута.
     */
    attributeFromNested(names, defaultValue = null) {
        return Obj.fromNested(this.attributes, names, defaultValue);
    }

    /**
     * Возвращает атрибуты.
     *
     * @param {Array<string|object>} [onlyAttributeRules=[]] Правила только для атрибутов.
     *
     * @return {object} Атрибуты.
     */
    getAttributes(onlyAttributeRules= []) {
        return Arr.contains(onlyAttributeRules) ?  Obj.onlyFromNested(this.attributes, onlyAttributeRules)  : this.attributes;
    }

    /**
     * Возвращает атрибуты заполняемых полей.
     * Заполняемые атрибуты используются при отправке данных на сервер.
     *
     * @param {Array<string|object>} [onlyAttributeRules=[]] Правила только для атрибутов.
     *
     * @return {object} Аттрибуты заполняемых полей.
     */
    getFillableAttributes(onlyAttributeRules = []) {
        const onlyFillableAttributeRules = this.rule('fillable', []);
        const fillableAttributes = Obj.onlyFromNested(this.attributes, onlyFillableAttributeRules);

        return Arr.contains(onlyAttributeRules) ? Obj.onlyFromNested(fillableAttributes, onlyAttributeRules) : fillableAttributes;
    }

    /**
     * Проверяет определён ли атрибут.
     *
     * @param {string} name Имя атрибута.
     *
     * @return {boolean} Определён ли атрибут.
     */
    inAttributes(name) {
        return this.attributes.hasOwnProperty(name);
    }

    /**
     * Проверяет, отсутствуют ли значения атрибутов сущности.
     *
     * @return {boolean} Отсутствуют ли значения атрибутов сущности.
     */
    attributesAreEmpty() {
        return Obj.empty(this.attributes);
    }

    /**
     * Возвращает метки аттрибутов.
     *
     * @return {object} Метки аттрибутов.
     */
    labels() {
        return {};
    }

    /**
     * Возвращает подсказки аттрибутов.
     *
     * @return {object} Подсказки аттрибутов.
     */
    placeholders() {
        return {};
    }

    /**
     * Возвращает метку.
     *
     * @param {string} attributeName Имя атрибута.
     *
     * @return {string} Метка.
     */
    label(attributeName) {
        return Obj.get(this.labels(), attributeName, '');
    }

    /**
     * Возвращает текст-подсказку для аттрибутов или пустую строку
     *
     * @param {string} attributeName Имя атрибута.
     *
     * @return {string} Placeholder
     */
    placeholder(attributeName) {
        return Obj.get(this.placeholders(), attributeName, '');
    }
}