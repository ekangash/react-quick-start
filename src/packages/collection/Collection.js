/** 1 NodeModules */
import { nanoid } from "nanoid";

/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";
import { Str } from "@packages/helpers/string/Str";
import { Obj } from "@packages/helpers/object/Obj"
import { CollectionWhere } from "@packages/collection/CollectionWhere";
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс коллекции
 *
 * @class Collection
 */
export class Collection extends CollectionWhere {
    /**
     * Уникальный идентификатор коллекции.
     *
     * @type {string}
     */
    key = ''

    /**
     * Имя метода сущности, который производит поиск коллекции.
     *
     * @type {string}
     */
    methodName = 'search'

    /**
     * Метаданные выборки.
     *
     * @type {object}
     */
    meta = {}

    /**
     * Событие перед выборкой
     *
     * @return {void}
     */
    onFetching() {}

    /**
     * Событие после выборки.
     *
     * @param {array} entities Данные полученные в результате выборки
     *
     * @return {void}
     */
    onFetched(entities) {}

    /**
     * Событие при неудачной выборки.
     *
     * @return {void}
     */
    onFetchFailed(err) {}

    /**
     * Конструктор класса.
     *
     * @return {void}
     */
    constructor() {
        super();
        this.key = nanoid(16);
    }

    /**
     * Отправляет запрос на получение данных и обновляет коллекцию.
     *
     * @param {string} [methodName=this.methodName] Наименование метода.
     *
     * @return {Promise<this>} Промис экземпляра текущего объекта.
     */
    async fetch(methodName = this.methodName) {
        try {
            this.onFetching();
            Query.checkIsInstanceOfSelf(this.query);
            Entity.checkSubclass(this.entityClass)
            const entity = new this.entityClass();
            entity.checkHasMethodName(methodName);

            const fetchResponse = await entity[methodName](this.query.toPath());
            this.meta = fetchResponse._meta;
            this.activeEntities = [];

            this.fill(fetchResponse.data);
            this.onFetched(fetchResponse);
        } catch (err) {
            console.warn(err);
            this.onFetchFailed(err);
        }

        return this;
    }

    /**
     * Устанавливает имя метода для поиска коллекции.
     *
     * @param {string} methodName Имя метода.
     *
     * @return {this} Экземпляр текущей коллекции.
     */
    forMethod(methodName) {
        if (Str.contains(methodName)) {
            this.methodName = methodName;
        }

        return this;
    }

    /**
     * Возвращает наименование метода.
     *
     * @return {string} Наименование метода.
     */
    getMethodName() {
        return this.methodName;
    }

    /**
     * Возвращает значение из метаданных.
     *
     * @param {string} name Имя.
     * @param {number|string} [defaultValue=null] Значение по умолчанию.
     *
     * @return {number|string} Значение из метаданных или по умолчанию.
     */
    getMeta(name, defaultValue = null) {
        return Obj.get(this.meta, name, defaultValue);
    }
}