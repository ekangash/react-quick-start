/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { QuerySort } from "@packages/query/QuerySort";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс пагинации запроса.
 */
export class QueryPagination extends QuerySort {
    /**
     * Части параметра пагинации.
     *
     * @type {Map<string,number>}
     */
    paginationParts = new Map()

    /**
     * Монтирована ли разбивка на страницы.
     *
     * @type {boolean}
     */
    paginationIsInitialized = false

    /**
     * Инициализирует значения пагинации по умолчанию.
     *
     * @returns {this} Экземпляр текущего объекта.
     */
    initializePagination() {
        if (!this.paginationIsInitialized) {
            this.paginationParts.set('per-page', 10);
            this.paginationParts.set('page', 1);
            this.paginationIsInitialized = true;
        }

        return this;
    }

    /**
     * Очищает значения параметра пагинации.
     *
     * @returns {this} Экземпляр текущего объекта.
     */
    clearPaginationParts() {
        if (!this.paginationIsInitialized && this.paginationParts.size > 0) {
            this.paginationParts.clear();
        }

        this.paginationIsInitialized = false;

        return this;
    }

    /**
     * Парсит части пагинации в нужный формат.
     *
     * @param {function(Map<string,string|number|object>):any} parseFn Функция разбора, преобразующая части пагинации в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parsePaginationParts(parseFn) {
        return parseFn(this.paginationParts);
    }

    /**
     * Устанавливает лимит.
     *
     * @param {number} perPage Лимит.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    perPage(perPage) {
        this.initializePagination();

        if (perPage > 0) {
            this.paginationParts.set('per-page', perPage);
        }

        return this;
    }

    /**
     * Проверят, равен ли лимит переданному.
     *
     * @param {number} withPearPage Лимит.
     *
     * @return {boolean} Экземпляр текущего объекта.
     */
    perPageIsEqualWith(withPearPage) {
        return this.paginationParts.get('per-page') === withPearPage;
    }

    /**
     * Устанавливает смещение.
     *
     * @param {number} page Смещение.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    page(page) {
        this.initializePagination();

        if (page >= 1) {
            this.paginationParts.set('page', page);
        }

        return this;
    }

    /**
     * Проверят, равно ли смещение с переданному.
     *
     * @param {number} withPage Смещение.
     *
     * @return {boolean} Экземпляр текущего объекта.
     */
    pageIsEqualWith(withPage) {
        return this.paginationParts.get('page') === withPage;
    }
}