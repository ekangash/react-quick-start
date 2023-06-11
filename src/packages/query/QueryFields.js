/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { QueryFilter } from "@packages/query/QueryFilter";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс полей запроса.
 */
export class QueryFields extends QueryFilter {
    /**
     * Части параметра полей.
     *
     * @type {Set<string>}
     */
    fieldParts =  new Set()

    /**
     * Парсит части полей в нужный формат.
     *
     * @param {function(fieldParts:Set<string>):any} parseFn Функция разбора, преобразующая части полей в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parseFieldParts(parseFn) {
        return parseFn(this.fieldParts);
    }

    /**
     * Очищает параметр полей.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    clearFieldParts() {
        this.fieldParts.clear();

        return this;
    }

    /**
     * Добавляет свойства в параметр полей.
     *
     * @param {string} names Имена элементов сортировки.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    fields(...names) {
        for (let name of names) {
            this.fieldParts.add(name);
        }

        return this;
    }

    /**
     * Удаляет свойство из параметра полей.
     *
     * @param {string} name Имя свойства.
     *
     * @return {boolean} Удалено ли свойство из параметра полей.
     */
    deletePartFromFields(name) {
        if (this.fieldParts.has(name)) {
            return this.fieldParts.delete(name);
        }

        return false;
    }
}