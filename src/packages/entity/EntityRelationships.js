/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { EntityAttributes } from "@packages/entity/EntityAttributes";
import { Entity } from "@packages/entity/Entity";
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс с отношениями сущности 1:1 и 1:N.
 *
 * @class EntityRelationships
 */
export class EntityRelationships extends EntityAttributes {
    /**
     * Хранилище связей
     *
     * @type {object}
     */
    relationships = {
        one: {},
        many: {}
    }

    /**
     * Возвращает отношение 1:1
     *
     * @param {string} name Имя отношения.
     * @param {function(relationship:Entity):any} onRelationshipDefined Функция обратного вызова в случае если отношение определено.
     * @param {function():any} onRelationshipUndefined Функция обратного вызова в случае если отношение не определено.
     *
     * @return {any} Результат выполнения функции обратного вызова.
     */
    relationshipOneToOne(name, onRelationshipDefined = (relationship) => relationship, onRelationshipUndefined = () => null) {
        return this.relationshipIsLoaded('one', name)
            ? onRelationshipDefined(this.relationships.one[name])
            : onRelationshipUndefined();
    }

    /**
     * Возвращает отношение 1:N
     *
     * @param {string} name Имя отношения.
     * @param {function(relationship:Collection):any} onRelationshipDefined Функция обратного вызова в случае если отношение определено.
     * @param {function():any} onRelationshipUndefined Функция обратного вызова в случае если отношение не определено.
     *
     * @return {any} Результат выполнения функции обратного вызова.
     */
    relationshipOneToMany(name, onRelationshipDefined = (relationship) => relationship, onRelationshipUndefined = () => null) {
        return this.relationshipIsLoaded('many', name)
            ? onRelationshipDefined(this.relationships.many[name])
            : onRelationshipUndefined();
    }

    /**
     * Проверяет загружена ли связь.
     *
     * @param {string} type Тип отношения "one" или "many".
     * @param {string} name Имя связи.
     *
     * @return {boolean} Загружена ли связь.
     */
    relationshipIsLoaded(type, name) {
        return Obj.isset(Obj.get(this.relationships, type, {}), name);
    }

    /**
     * Удаляет связь.
     *
     * @param {string} type Тип отношения "one" или "many".
     * @param {string} name Имя удаляемого отношения.
     *
     * @return {this} Экземпляр текущей сущности.
     */
    deleteRelationship(type, name) {
        delete this.relationships[type][name];

        return this;
    }
}