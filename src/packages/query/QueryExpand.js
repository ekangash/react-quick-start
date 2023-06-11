/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { QueryPagination } from "@packages/query/QueryPagination";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс связей запроса.
 */
export class QueryExpand extends QueryPagination {
    /**
     * Части параметра отношений.
     *
     * @type {Set<string>}
     */
    expandParts =  new Set()

    /**
     * Парсит части расширения в нужный формат.
     *
     * @param {function(expandParts:Set<string>):any} parseFn Функция разбора, преобразующая части расширения в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parseExpandParts(parseFn) {
        return parseFn(this.expandParts);
    }

    /**
     * Очищает параметр связей.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    clearExpandParts() {
        this.expandParts.clear();

        return this;
    }

    /**
     * Устанавливает имена аттрибутов в параметр сортировки.
     *
     * @param {string} names Имена аттрибутов.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    expand(...names) {
        for (let name of names) {
            this.expandParts.add(name);
        }

        return this;
    }

    /**
     * Удаляет имя связи из параметра.
     *
     * @param {string} name Имя связи.
     *
     * @return {boolean} Удалено ли имя связи из параметра.
     */
    deletePartFromExpands(name) {
        if (this.expandParts.has(name)) {
            return this.expandParts.delete(name);
        }

        return false;
    }
}