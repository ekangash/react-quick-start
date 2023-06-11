/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { endpoints } from "@endpoints/endpoints";
import { Obj } from "@packages/helpers/object/Obj";
import { Bool } from "@packages/helpers/boolean/Bool";
import { Arr } from "@packages/helpers/array/Arr";
import { Str } from '@packages/helpers/string/Str';
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppEntitySchema } from "@entities/AppEntitySchema";

/** 6 Resources */

/**
 * Базовый класс сущности приложения.
 */
export class AppEntity extends AppEntitySchema {
    /**
     * Процесс выполнения запроса на сервер.
     *
     * @type {boolean}
     */
    executing = false

    /**
     * Схема в бд
     *
     * @type {string}
     */
    endpointSchemaName = ''
    /**
     * Таблица в схеме бд
     *
     * @type {string}
     */
    endpointTableName = ''

    /**
     * Конвертирует значение в snake-case
     *
     * @param {string} value Значение
     *
     * @return {string} Конвертированное значение
     */
    convertToSnakeCase(value) {
        return value.split('-').join('_');
    }

    /**
     * Возвращает конечную точку
     *
     * @param {string} name Имя конечной точки
     *
     * @return {function|null} Функцию конечной точки
     */
    endpoint(name) {
        return endpoints.get(this.convertToSnakeCase(this.endpointSchemaName), this.convertToSnakeCase(this.endpointTableName), name);
    }

    /**
     * Возвращает полезную нагрузку.
     *
     * @param {string[]} [only=[]] Только аттрибуты.
     *
     * @return {FormData} Полезная нагрузка
     */
    payload(only = []) {
        return this.createPayloadFormData(this.getFillableAttributes(only), new FormData());
    }

    /**
     * Формирует и заполняет экземпляр FormData полезной нагрузки.
     *
     * @param {any} fillableAttributes Заполняемые аттрибуты.
     * @param {FormData} formData Экземпляр FormData
     * @param {string} [parentKey=''] Родительский ключ.
     *
     * @return {FormData} Сформированный и заполнений экземпляр FormData полезной нагрузки.
     */
    createPayloadFormData(fillableAttributes, formData, parentKey = '') {
        if (Obj.assert(fillableAttributes)) {
            Object.entries(fillableAttributes).forEach(([fillableAttributeName, payloadChild]) => {
                this.createPayloadFormData(payloadChild, formData, parentKey ? `${parentKey}[${fillableAttributeName}]` : fillableAttributeName);
            });

            return formData;
        } else if (Array.isArray(fillableAttributes)) {
            fillableAttributes.forEach((payloadChild, idx) => {
                this.createPayloadFormData(payloadChild, formData, parentKey ? `${parentKey}[${idx}]` : idx);
            });

            return formData;
        } else if (Bool.assert(fillableAttributes)) {
            formData.append(parentKey, fillableAttributes ? 1 : 0);

            return formData;
        }

        let writableValue = fillableAttributes;

        if (Str.contains(fillableAttributes)) {
            writableValue = fillableAttributes.trim();
        } else if (fillableAttributes === null) {
            writableValue = '';
        }

        formData.append(parentKey, writableValue);

        return formData;
    }

    /**
     * Загружает данные сущности из API по ID
     *
     * @param {string|null} [id=null] Идентификатор объекта
     *
     * @return {Promise<object>} Полученные данные аттрибутов.
     */
    async get(id = null) {
        if (!id) {
            throw new Error('Первичный ключ сущности не определен!');
        }

        const whereParams = this.query instanceof Query ? this.query.toPath() : '';
        const receivedAttributes = await this.endpoint('get')(id, whereParams).then(({data}) => data);
        this.purge(false);
        this.fill(receivedAttributes);

        return receivedAttributes;
    }

    /**
     * Сохраняет запись в БД
     *
     * @param {string[]} [only=[]] Массив только отправляемых атрибутов
     *
     * @return {Promise<object>} Данные, полученные с сервера после создания записи
     */
    async create(only = []) {
        let onlyProperty = only;

        if (Arr.empty(only)) {
            onlyProperty = this.property('only');
        }

        this.executing = true;
        const payloadFormData = this.payload(onlyProperty);

        const responseAttributes = await this.endpoint('create')(payloadFormData).then(({data}) => data);
        this.fill(responseAttributes);
        this.executing = false;

        return responseAttributes;
    }

    /**
     * Обновляет значения в базе данных.
     *
     * @param {string[]} [only=[]] Массив только отправляемых атрибутов
     *
     * @return {Promise<object>} Данные, полученные с сервера после обновления записи
     */
    async patch(only = []) {
        if (!this.inAttributes(this.constructor.primaryKey)) {
            throw new Error('Первичный ключ сущности не определен!');
        }

        let onlyProperty = only;

        if (Arr.empty(only)) {
            onlyProperty = this.property('only');
        }

        this.executing = true;
        const responseAttributes = await this.endpoint('patch')(this.primary(), this.payload(onlyProperty)).then(({data}) => data);
        this.fill(responseAttributes);
        this.executing = false;

        return responseAttributes;
    }

    /**
     * Удаляет текущую сущность.
     *
     * @return {Promise<Entity>} Текущая сущность
     */
    async delete() {
        if (!this.inAttributes(this.constructor.primaryKey)) {
            throw new Error('Первичный ключ сущности не определен!');
        }

        await this.endpoint('delete')(this.primary());
        this.purge();
        this.isNewRecord = true;

        return this;
    }

    /**
     * Обновляет данные сущности из API по ID.
     *
     * @param {string} params Параметры для запроса.
     *
     * @return {Promise<void>}
     */
    async refresh(params) {
        await this.get(this.attribute('id'), params);
    }

    /**
     * Поиск коллекции сущностей.
     *
     * @param {string} whereParams Полезная нагрузка запроса.
     *
     * @return {Promise<*>} Набор текущих сущностей
     */
    async search(whereParams) {
        return await this.endpoint('search')(whereParams).then(({data}) => data);
    }

    /**
     * Быстрый поиск в коллекции сущностей
     *
     * @param {string} whereParams Полезная нагрузка запроса
     *
     * @return {Promise<*>} Набор текущих сущностей
     */
    async quickSearch(whereParams) {
        return await this.endpoint('quickSearch')(whereParams).then(({ data }) => data);
    }

    /**
     * Валидация полей
     *
     * @param {object} validatedAttributesObj Объект валидируемых данных
     *
     * @return {Promise<*>} Результат валидации
     */
    async validate(validatedAttributesObj) {
        const primaryKeyValue = this.primary();
        const formData = this.createPayloadFormData(validatedAttributesObj, new FormData());

        return await this.endpoint('validate')(formData, primaryKeyValue).then(({ data }) => data);
    }

    /**
     * Возвращает ссылку для сущности
     *
     * @param {string} action Действие, добавляемое к ссылке (edit, view)
     *
     * @return {string} Ссылка
     */
    getPageUrl(action) {
        return `${this.getIndexPageUrl()}/${this.primary()}/${action}`;
    }

    /**
     * Возвращает ссылку для индексовой страницы
     *
     * @return {string} Ссылка
     */
    getIndexPageUrl() {
        return `/${this.endpointSchemaName}/${this.endpointTableName}`;
    }
}