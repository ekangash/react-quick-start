/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";
import { EntityWhere } from "@packages/entity/EntityWhere";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс для работы с параметрами сущности.
 */
export class EntityProperties extends EntityWhere {

    /**
     * Параметры сущности и их значения.
     *
     * @type {object}
     */
    properties = {}

    /**
     * Возвращает значение аттрибута.
     *
     * @param {string} name Имя аттрибута
     * @param {function(value<any>)} [whenDefinedFunc=(val) => val] Значение по умолчанию.
     * @param {function(value<any>)} [whenUndefinedFunc=() => null] Значение по умолчанию.
     *
     * @return {string|null|number|object|array} Значения аттрибутов
     */
    property(name, whenDefinedFunc = (val) => val, whenUndefinedFunc = () => null) {
        return this.inProperties(name) ? whenDefinedFunc(this.properties[name]) : whenUndefinedFunc();
    }

    /**
     * Возвращает аттрибуты.
     *
     * @param {string[]} [only=[]] Имя аттрибута
     *
     * @return {object} Аттрибуты
     */
    getProperties(only = []) {
        let properties = {};
        const onlyIsEmpty = only.length === 0;

        for (let [name, value] of Object.entries(this.properties)) {
            if (onlyIsEmpty || only.includes(name)) {
                properties[name] = value;
            }
        }

        return properties;
    }

    /**
     * Удаляет коллекцию.
     *
     * @param {string} name Имя коллекции.
     *
     * @return {this} Экземпляр текущей сущности.
     */
    deleteProperty(name) {
        if (this.inProperties(name)) {
            delete this.properties[name];
        }

        return this;
    }

    /**
     * Очищает атрибуты.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    purgeProperties() {
        this.properties = {};

        return this;
    }

    /**
     * Загружает аттрибуты и их значения в сущность(переопределяя имеющейся значения).
     *
     * @param {object} properties Устанавливаемые атрибуты со значениями.
     *
     * @return {this} Экземпляр сущности
     */
    setProperties(properties) {
        for (let [propertyName, propertyValue] of Object.entries(properties)) {
            this.setProperty(propertyName, propertyValue);
        }

        this.properties = {...this.properties};

        return this;
    }

    /**
     * Изменяет значение атрибута модели.
     *
     * @param {string} name Имя атрибута
     * @param {any} value Значение атрибута.
     *
     * @return {this} Экземпляр сущности
     */
    setProperty(name, value) {
        this.properties[name] = value;

        return this;
    }

    /**
     * Проверяет определён ли атрибут.
     *
     * @param {string} name Имя параметра.
     *
     * @return {boolean} Определён ли атрибут.
     */
    inProperties(name) {
        return this.properties.hasOwnProperty(name);
    }

    /**
     * Проверяет, есть ли атрибуты
     *
     * @return {boolean} Флаг проверки на существование аттрибутов
     */
    propertiesIsEmpty() {
        return Obj.empty(this.properties);
    }
}