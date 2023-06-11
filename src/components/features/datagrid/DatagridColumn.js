/** 1 NodeModules */
import { nanoid } from "nanoid";

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";
import { Obj } from "@packages/helpers/object/Obj";
import { TABLE_COLUMN_FILTER_NAMES } from "@enums/table/Table";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppEntity } from "@entities/AppEntity";

/** 6 Resources */

/**
 * Заполняемые свойства колонки.
 *
 * @type {string[]}
 */
const FILLABLE_PROPERTIES = ['name', 'label', 'filter', 'value','sort', 'active'];

/**
 * Класс колонки таблицы.
 */
export class DatagridColumn {
    /**
     * Имя
     *
     * @type {string}
     */
    name = ''
    /**
     * Метка
     *
     * @type {string}
     */
    label = ''
    /**
     * Значение
     *
     * @type {function(entity:AppEntity, name:string)}
     */
    value = (entity, name) => entity.attribute(name)
    /**
     * Фильтрация
     *
     * @type {boolean|object}
     */
    filter = false
    /**
     * Сортировка
     *
     * @type {boolean}
     */
    sort = false
    /**
     * Состояние активности
     *
     * @type {boolean}
     */
    active = true
    /**
     * Опции ячейки
     *
     * @type {object}
     */
    cellOptions = {}
    /**
     * Уникальный ключ
     *
     * @type {string}
     */
    key = null

    /**
     * Конструктор класса.
     *
     * @return {void}
     */
    constructor() {
        this.key = nanoid(16);
    }

    /**
     * Соответствует ли колонка переданному имени.
     *
     * @param {string} name Имя
     *
     * @return {boolean} Соответствует ли колонка переданному имени.
     */
    equalToName(name) {
        return name === this.name;
    }

    /**
     * Возвращает свойство столбца.
     *
     * @param {string} name Имя свойства.
     * @param {any} [defaultValue=null] Значение по умолчанию
     *
     * @return {any} Свойство столбца
     */
    property(name, defaultValue = null) {
        return Obj.get(this, name, defaultValue);
    }

    /**
     * Возвращает свойства колонки.
     *
     * @param {string[]} [only=FILLABLE_PROPERTIES] Только нужные свойства.
     *
     * @return {object} Свойства колонки
     */
    properties(only = FILLABLE_PROPERTIES) {
        return Obj.only(this, only);
    }

    /**
     * Проверяет состояние активности фильтра.
     *
     * @return {boolean} Состояние активности фильтра.
     */
    filterIsEnabled() {
        return (Obj.contains(this.filter) && Obj.isset(this.filter, 'name')) || Func.assert(this.filter);
    }

    /**
     * Проверяет, является ли фильтр инпутом.
     *
     * @return {boolean} Является ли фильтр инпутом.
     */
    filterIsInput() {
        return Obj.get(this.filter, 'name', '') === TABLE_COLUMN_FILTER_NAMES.INPUT
    }

    /**
     * Проверяет, является ли фильтр датой.
     *
     * @return {boolean} Является ли фильтр датой.
     */
    filterIsDate() {
        return Obj.get(this.filter, 'name', '') === TABLE_COLUMN_FILTER_NAMES.DATE
    }

    /**
     * Проверяет, является ли фильтр селектом.
     *
     * @return {boolean} Является ли фильтр селектом.
     */
    filterIsSelect() {
        return Obj.get(this.filter, 'name', '') === TABLE_COLUMN_FILTER_NAMES.SELECT
    }

    /**
     * Обновляет свойства колонки.
     *
     * @param {object} properties Свойства.
     *
     * @return {DatagridColumn} Экземпляр текущего объекта.
     */
    update(properties) {
        for (let [propertyName, propertyValue] of Object.entries(properties)) {
            if (Obj.isset(this, propertyName) && propertyName !== 'key') {
                this[propertyName] = propertyValue;
            }
        }

        return this;
    }
}