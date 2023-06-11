/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { CollectionProperties } from "@packages/collection/CollectionProperties";
import { Entity } from "@packages/entity/Entity";
import { Obj } from "@packages/helpers/object/Obj";
import { Arr } from "@packages/helpers/array/Arr";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс-обертка для работы с коллекцией сущностей.
 *
 * @class CollectionEntities
 */
export class CollectionEntities extends CollectionProperties {

    /**
     * Элементы этого массива.
     *
     * @type {Map}
     */
    entities = new Map()

    /**
     * Класс сущности коллекции.
     *
     * @type {Entity}
     */
    entityClass = null

    /**
     * Все загруженные элементы.
     *
     * @type {number[]}
     */
    activeEntities = []

    /**
     * Событие кэширования сущности.
     *
     * @param {Entity} entity Сущность
     *
     * @return {any}
     */
    onEntityCached = (entity) => {}

    /**
     * Итерирует сущности коллекции.
     *
     * @param {function(entity:Entity, entityPrimary:number)} callbackFn Функция обратного вызова.
     *
     * @return {any[]} Результат выполнения функции обратного вызова.
     */
    map(callbackFn) {
        return Array.from(this.entities, ([entityPrimary, entity]) => callbackFn(entity, entityPrimary));
    }

    /**
     * Итерирует сущности коллекции на странице.
     *
     * @param {function(entity:AppEntity, entityPrimary:number)} callback Функция обратного вызова.
     *
     * @return {any[]} Результат выполнения функции обратного вызова.
     */
    mapActiveEntities(callback) {
        let pageEntityResults = [];

        for (let primaryActiveEntity of this.activeEntities) {
            if (this.entities.has(primaryActiveEntity)) {
                pageEntityResults.push(callback(this.entities.get(primaryActiveEntity), primaryActiveEntity))
            }
        }

        return pageEntityResults;
    }

    /**
     * Проверяет есть ли в хранилище сущности удовлетворявшие условию.
     *
     * @param {function(entity:Entity, order:number):boolean} someConditionFn Функция некоторых условий.
     *
     * @return {boolean}
     */
    someInActiveEntities(someConditionFn) {
        return Array.from(this.entities).filter(([orderEntityId, entity]) => this.activeEntities.includes(orderEntityId))
        .some(([order, entity]) => someConditionFn(entity, order));
    }

    /**
     * Устанавливает класс сущности коллекции.
     *
     * @param {Entity} entityClass - Класс сущности коллекции.
     *
     * @throws {Error} Если переданный класс не является наследником класса Entity.
     * @throws {Error} Если первичный ключ сущности не определен.
     *
     * @return {this} Экземпляр текущей коллекции.
     */
    forEntity(entityClass) {
        Entity.checkSubclass(entityClass);
        entityClass.checkPrimaryKeyIsDefined();

        this.entityClass = entityClass;

        return this;
    }

    /**
     * Загружает объекты.
     *
     * @param {objects[]} entities Объекты.
     *
     * @return {this} Экземпляр сущности.
     */
    fill(entities) {
        if (!Arr.contains(entities)) {
            return this;
        }

        for (let entity of entities) {
            if (Obj.contains(entity)) {
                this.cacheOrUpdateEntity(entity);
            }
        }

        return this;
    }

    /**
     * Кэширует или обновляет экземпляр сущности в хранилище.
     *
     * @param {object} entity Экземпляр сущности
     *
     * @throws {Error} Если класс сущности коллекции не является потомком класса Entity.
     * @throws {Error} Если первичный ключ сущности не определен в классе сущности.
     * @throws {Error} Если первичный ключ сущности не найден в переданном объекте.
     * @throws {Error} Если значение первичного ключа равно null.
     *
     * @return {this} Текущий экземпляр коллекции
     */
    cacheOrUpdateEntity(entity) {
        Entity.checkSubclass(this.entityClass);
        this.entityClass.checkPrimaryKeyIsDefined();
        const entityPrimaryKey = this.entityClass.primaryKey;

        if (!Obj.isset(entity, entityPrimaryKey)) {
            throw new Error(`Первичный ключ '${entityPrimaryKey}' не найден в загружаемом объекте`);
        }

        const entityPrimary = Obj.get(entity, entityPrimaryKey);

        if (entityPrimary === null) {
            throw new Error('Значение первичного ключа не может быть null');
        }

        const entityAlreadyIsCashed = this.entities.has(entityPrimary);
        const entityInstance = entityAlreadyIsCashed ? this.entities.get(entityPrimary).fill(entity) : (new this.entityClass()).fill(entity);
        this.entities.set(entityPrimary, entityInstance);

        if (!entityAlreadyIsCashed) {
            this.onEntityCached(entityInstance);
        }

        this.activeEntities.push(entityPrimary);

        return this;
    }

    /**
     * Вытягивает сущности из коллекции.
     *
     * @return {object[]} Сущности из коллекции.
     */
    pull() {
        return Array.from(this.entities).reduce((entities, [_, entity]) => {
            entities.push(entity.pull());

            return entities;
        }, []);
    }

    /**
     * Возвращает элемент по пути, дабы получить доступ к нему и изменить
     *
     * @param {function(entity:Entity, entityPrimary:number):boolean} [entityConditionFn=null] Первичное значение сущности.
     * @param {function(entity:Entity):Entity} [whenDefinedFn=(entity) => entity] Функция обратного вызова в случае если коллекция определена.
     * @param {function():null} [whenUndefinedFn=() => null] Функция обратного вызова в случае если коллекция не определена.
     *
     * @return {Entity|null} Найденный элемент в случае успеха, иначе null.
     */
    findEntityByCondition(entityConditionFn = null, whenDefinedFn = (entity) => entity, whenUndefinedFn = () => null) {
        let finedEntity = null;

        for (let [orderEntityId, entity] of this.entities) {
            if (entityConditionFn(entity, orderEntityId)) {
                finedEntity = entity;

                break;
            }
        }

        return finedEntity instanceof Entity ? whenDefinedFn(finedEntity) : whenUndefinedFn();
    }

    /**
     * Возвращает элементы по пути, дабы получить доступ к нему и изменить
     *
     * @param {function(entity:Entity, entityPrimary:number):boolean} [entityCondition=null] Первичное значение сущности.
     * @param {function(entities:Entity[]):Entity[]} [whenDefinedFn=(entities) => entities] Функция обратного вызова в случае если коллекция определена.
     * @param {function():array} [whenUndefinedFn=() => []] Функция обратного вызова в случае если коллекция не определена.
     *
     * @return {Entity[]|array} Найденный элемент в случае успеха, иначе null.
     */
    findEntitiesByCondition(entityCondition = null, whenDefinedFn = (entities) => entities, whenUndefinedFn = () => []) {
        let finedEntities = [];

        for (let [orderEntityId, entity] of this.entities) {
            if (entityCondition(entity, orderEntityId)) {
                finedEntities.push(entity);
            }
        }

        return Arr.contains(finedEntities) ? whenDefinedFn(finedEntities) : whenUndefinedFn();
    }

    /**
     * Проверяет есть ли в хранилище сущности удовлетворявшие условию.
     *
     * @param {function(entity:Entity, order:number):boolean} callback Колбэк-функция для проверки условия
     *
     * @return {boolean} Флаг проверки сущностей
     */
    some(callback) {
        return Array.from(this.entities).some(([order, entity]) => callback(entity, order));
    }

    /**
     * Удаляет элемент из кэша
     *
     * @param {number|string} entityPrimary Первичный ключ сущности
     *
     * @return {void}
     */
    delete(entityPrimary) {
        this.entities.delete(entityPrimary);
    }

    /**
     * Очищает кэш
     *
     * @return {void}
     */
    clear() {
        this.entities.clear();
    }

    /**
     * Пуста ли коллекция.
     *
     * @return {boolean} Флаг проверки коллекции на пустоту
     */
    empty() {
        return Array.from(this.entities).length === 0;
    }

    /**
     * Содержит ли коллекция сущности.
     *
     * @return {boolean} Флаг проверки коллекции на заполненность
     */
    contains() {
        return Array.from(this.entities).length > 0;
    }

    /**
     * Определяет количество элементов в коллекции.
     *
     * @return {number} Количество элементов в коллекции
     */
    count() {
        return Array.from(this.entities).length;
    }

    /**
     * Очищает кэш
     *
     * @return {void}
     */
    resetActiveEntities() {
        this.activeEntities = [];
    }

    /**
     * Определяет количество элементов в коллекции.
     *
     * @return {number} Количество элементов в коллекции
     */
    activeEntitiesCount() {
        return this.activeEntities.length;
    }

    /**
     * Проверяет, пуста ли страница.
     *
     * @return {boolean} Флаг проверки страницы на пустоту
     */
    activeEntitiesIsEmpty() {
        return this.activeEntities.length === 0
    }
}