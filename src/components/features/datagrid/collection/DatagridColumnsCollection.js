/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";
import { Str } from "@packages/helpers/string/Str";
import { Collection } from "@packages/collection/Collection";

/** 3 Components, Hooks, Icons - NodeModules */
import { DatagridColumn } from "@features/datagrid/DatagridColumn";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс колонок коллекции таблицы.
 *
 * @class DatagridColumnsCollection
 */
export class DatagridColumnsCollection extends Collection {
    /**
     * Колонки таблицы.
     *
     * @type {Map<string, DatagridColumn>}
     */
    columns = new Map()

    /**
     * Инициализирует экземпляры колонок.
     *
     * @param {object} columns Колонки
     *
     * @return {DatagridColumnsCollection} Экземпляр текущего объекта.
     */
    forColumns(columns) {
        this.columns = new Map();

        for(let column of columns) {
            this.checkColumnObjHasName(column);
            this.columns.set(column.name, (new DatagridColumn()).update(column));
        }

        return this;
    }

    /**
     * Обновляет экземпляры колонок.
     *
     * @param {object} columns Колонки.
     *
     * @return {DatagridColumnsCollection} Экземпляр текущего объекта.
     */
    updateColumns(columns) {
        let orderedColumns = new Map();

        for(let column of columns) {
            this.checkColumnObjHasName(column);
            const columnName = column.name;

            if (this.columns.has(columnName)) {
                orderedColumns.set(columnName, this.columns.get(columnName).update(column));
            }
        }

        this.columns = orderedColumns;

        return this;
    }

    /**
     * Итерирует колонки таблицы.
     *
     * @param {function(DatagridColumn, string)} callback Функция обратного вызова.
     *
     * @return {string[]} Результат выполнения функции обратного вызова.
     */
    eachColumns(callback) {
        return Array.from(this.columns, ([columnName, column]) => callback(column, columnName));
    }

    /**
     * Итерирует активные колонки таблицы.
     *
     * @param {function(column:DatagridColumn, columnName:string)} callback Функция обратного вызова.
     *
     * @return {string[]} Результат выполнения функции обратного вызова.
     */
    eachActiveColumns(callback) {
        return Array.from(this.columns).filter(([_, column]) => column.property('active', false))
        .map(([columnName, column]) => callback(column, columnName));
    }

    /**
     * Проверяет, колонки на наличие у некоторых включенного фильтра.
     *
     * @return {boolean} Определен ли отключенный фильтр минимум одной колонки.
     */
    columnsHasSomeEnabledFilter() {
        return Array.from(this.columns).some(([_, column]) => column.filterIsEnabled());
    }

    /**
     * Проверят, определено ли имя колонки.
     *
     * @param {object} column Колонка.
     *
     * @return {void}
     */
    checkColumnObjHasName(column) {
        if (!Obj.isset(column, 'name') && !Str.contains(column.name)) {
            throw new Error(`Свойство name не определено в свойствах столбца.`);
        }
    }
}