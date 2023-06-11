/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { Obj } from "@packages/helpers/object/Obj";
import { QueryExpand } from "@packages/query/QueryExpand";
import { Num } from "@packages/helpers/number/Num";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс фильтрации запроса.
 */
export class QueryFilter extends QueryExpand {
    /**
     * Части параметра фильтра.
     *
     * @type {Map<string,string|number|object>}
     */
    filterParts = new Map()

    /**
     * Парсит части фильтра в нужный формат.
     *
     * @param {function(filterParts:Map<string,string|number|object>):any} parseFn Функция разбора, преобразующая части фильтра в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parseFilterParts(parseFn) {
        return parseFn(this.filterParts);
    }

    /**
     * Очищает параметр фильтра.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    clearFilterParts() {
        this.filterParts.clear();

        return this;
    }

    /**
     * Устанавливает свойство в параметр фильтра.
     *
     * @param {string} name Имя  свойства.
     * @param {string|number} value Значение свойства.
     * @param {string} condition Наименование условия
     *
     * @return {this} Экземпляр текущего объекта.
     */
    filter(name, value, condition) {
        if (Str.empty(value) || (!Str.assert(value) && !Num.assert(value))) {
            return this;
        }

        if (Str.contains(condition)) {
            const previousFilterValue = this.filterParts.get(name);
            const newFilterValue = Obj.assert(previousFilterValue) ? { ...previousFilterValue, [condition]: value } : { [condition]: value };

            this.filterParts.set(name, newFilterValue);
        } else {
            this.filterParts.set(name, value);
        }

        return this;
    }

    /**
     * Возвращает значение свойство из параметра фильтра.
     *
     * @param {string} name Имя фильтрующего атрибута.
     * @param {string} [condition=''] Условие фильтрации.
     * @param {string} [defaultValue=''] Значение по умолчанию.
     *
     * @return {string|number} Значение свойства фильтра.
     */
    getFilter(name, condition = '', defaultValue = '') {
        if (!this.filterParts.has(name)) {
            return defaultValue;
        }

        const filterValue = this.filterParts.get(name);

        if (Str.contains(condition) && Obj.assert(filterValue)) {
            return Obj.get(filterValue, condition, defaultValue);
        } else if (Str.assert(filterValue) || Num.assert(filterValue)) {
            return filterValue;
        }

        return defaultValue;
    }

    /**
     * Удаляет свойство из параметра фильтра.
     *
     * @param {string} name Имя свойства.
     * @param {string} [condition=''] Условие фильтрации.
     *
     * @return {boolean} Удалено ли свойство из параметра фильтра.
     */
    deletePartFromFilters(name, condition= '') {
        if (!this.filterParts.has(name)) {
            return false;
        }

        const previousFilterValue = this.filterParts.get(name);

        if (Str.contains(condition) && previousFilterValue && Obj.isset(previousFilterValue, condition)) {
            delete previousFilterValue[condition];
            this.filterParts.set(name, previousFilterValue);

            return true;
        }

        return this.filterParts.delete(name);
    }
}