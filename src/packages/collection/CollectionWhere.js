/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";
import { CollectionEntities } from "@packages/collection/CollectionEntities";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс запроса коллекции
 *
 * @class CollectionWhere
 */
export class CollectionWhere extends CollectionEntities {
    /**
     * Экземпляр объекта запроса.
     *
     * @type {Query}
     */
    query = new Query()

    /**
     * Предоставляет доступ к экземпляру объекта запроса API.
     *
     * @param {function(query:Query)} whereFn Функция к запросу.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    where(whereFn) {
        whereFn(this.query);

        return this;
    }

    /**
     * Парсит экземпляр запроса в нужный формат.
     *
     * @param {function(query:Query):any} parseFn Функция разбора, преобразующая экзепляр запроса в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parseQuery(parseFn) {
        Query.checkIsInstanceOfSelf(this.query);

        return parseFn(this.query);
    }
}