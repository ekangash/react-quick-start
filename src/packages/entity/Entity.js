/** 1 NodeModules */
import { nanoid } from "nanoid"

/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Arr } from "@packages/helpers/array/Arr";
import { Obj } from "@packages/helpers/object/Obj";
import { Cls } from "@packages/helpers/class/Cls";
import { Str } from "@packages/helpers/string/Str";
import { EntityRelationships } from "@packages/entity/EntityRelationships";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс сущности
 *
 * @class Entity
 */
export class Entity extends EntityRelationships {

    /**
     * Существует ли эта сущность в базе данных.
     *
     * @type {boolean}
     */
    isNewRecord = true

    /**
     * Уникальный идентификатор сущности.
     *
     * @type {string}
     */
    key = ''

    /**
     * Конструктор инициализации экземпляра.
     *
     * @constructor
     */
    constructor() {
        super();
        this.key = nanoid(16);
    }

    /**
     * Загружает/заполняет сущность данными.
     *
     * @param {object} content Содержимое сущности.
     * @param {boolean} [withFillable=false] Устанавливать атрибуты относительно заполняемых полей
     * (удобно при установление данных полученных из форм).
     *
     * @return {this} Экземпляр текущей сущности.
     */
    fill(content, withFillable = false) {
        this.fillAttributes(content, withFillable);
        this.fillRelationships(content);

        if (Number(this.primary()) > 0) {
            this.alreadyBeenCreated();
        }

        return this;
    }

    /**
     * Загружает/заполняет атрибуты сущности.
     *
     * @param {object} attributes Аттрибуты.
     * @param {boolean} [withFillable=false] Устанавливать атрибуты относительно заполняемых полей
     * (удобно при установление данных полученных из форм).
     *
     * @return {this} Экземпляр текущей сущности.
     */
    fillAttributes(attributes, withFillable = false) {
        const onlyAttributeRules = withFillable ? this.rule('fillable', []) : this.rule('attributes', []);
        this.attributes = Obj.mergeNested(this.attributes, Obj.onlyFromNested(attributes, onlyAttributeRules), true);

        return this;
    }

    /**
     * Загружает/заполняет отношения сущности.
     *
     * @param {object} content Содержимое сущности.
     *
     * @return {this} Экземпляр текущей сущности.
     */
    fillRelationships(content) {
        const onlyRelationshipRules = this.rule('relationships', []);

        if (Arr.contains(onlyRelationshipRules)) {
            const relationships = Obj.only(content, onlyRelationshipRules);

            for (let [relationshipName, relationshipValue] of Object.entries(relationships)) {
                this.checkHasMethodName(relationshipName);
                const relationship = this[relationshipName](relationshipValue);

                if (relationship instanceof Entity) {
                    this.relationships.one[relationshipName] = relationship;
                } else if (relationship instanceof Collection) {
                    this.relationships.many[relationshipName] = relationship;
                }
            }
        }

        return this;
    }

    /**
     * Возвращает все значения сущности.
     *
     * @return {object} Все значения сущности.
     */
    pull() {
        let content = this.attributes;

        for (let [relationshipName, relationship] of Object.entries({...this.relationships.one, ...this.relationships.many})) {
            content[relationshipName] = relationship.pull();
        }

        return content;
    }

    /**
     * Очищает атрибуты.
     *
     * @param {boolean} [withNewRecord=true] Состояние модели.
     *
     * @return {this} Экземпляр текущей сущности.
     */
    purge(withNewRecord = true) {
        this.attributes = {};
        this.relationships = {
            one: {},
            many: {}
        };
        this.isNewRecord = withNewRecord;

        return this;
    }

    /**
     * Указывает, что запись уже создана.
     *
     * @return {this} Экземпляр текущей сущности.
     */
    alreadyBeenCreated() {
        this.isNewRecord = false;

        return this;
    }

    /**
     * Проверят, что метод определен.
     *
     * @param {Entity|any} methodName Имя метода.
     *
     * @return {void}
     *
     * @throws {Error}
     */
    checkHasMethodName(methodName) {
        if (!Obj.in(this, methodName)) {
            throw new Error(`Метод '${methodName}' не определен в сущности '${Cls.name(this)}'`);
        }
    }

    /**
     * Проверят, что значение является экземпляром сущности.
     *
     * @param {Entity|any} value Значение.
     *
     * @return {void}
     *
     * @throws {Error}
     */
    static checkIsInstanceOfSelf(value) {
        if (!this.isInstanceOfSelf(value)) {
            throw new Error(`Значение не является экземпляром сущности!`);
        }
    }

    /**
     * Проверят, что значение является экземпляром сущности.
     *
     * @param {Entity|any} value Значение.
     *
     * @return {boolean} Является экземпляром сущности.
     */
    static isInstanceOfSelf(value) {
        return value instanceof Entity;
    }

    /**
     * Проверяет, является ли переданный класс потомком класса Entity.
     *
     * @param {Entity} subclass Проверяемый класс.
     *
     * @throws {Error} Если проверяемый класс не является потомком класса Entity.
     *
     * @return {void}
     */
    static checkSubclass(subclass) {
        if (!Cls.isSubclassOf(subclass, Entity)) {
            throw new Error("Класс не является потомком сущности 'Entity'");
        }
    }
    /**
     * Проверяет, определен ли первичный ключ сущности.
     *
     * @return {void}
     *
     * @throws {Error}
     */
    static checkPrimaryKeyIsDefined() {
        if (Str.empty(this.primaryKey)) {
            throw new Error(`Первичный ключ не определен в классе сущности '${this['name']}'`);
        }
    }
}