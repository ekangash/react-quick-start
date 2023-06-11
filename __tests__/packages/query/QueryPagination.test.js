/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QueryPagination', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('perPage()', () => {
        it('Должно обновить параметр лимита, если он больше 1', () => {
            query.perPage(20);

            expect(query.paginationParts.get('per-page')).toEqual(20);
        });

        it('Должно пропустить обновление параметра лимита, если он меньше 1', () => {
            query.perPage(0);
            query.perPage(-1);

            expect(query.paginationParts.get('perPage')).not.toEqual(0);
            expect(query.paginationParts.get('perPage')).not.toEqual(-1);
        });
    });

    describe('perPageEqual()', () => {
        it('Должно проверить равенство установленного лимита', () => {
            query.perPage(20);

            expect(query.perPageIsEqualWith(20)).toBe(true);
        });
    });

    describe('parsePaginationParts()', () => {
        it('Должно возвращать все параметры пагинации', () => {
            query.page(5);
            query.perPage(20);
            const paginationParam = query.parsePaginationParts(pagination => Array.from(pagination));

            expect(paginationParam).toEqual([['per-page', 20], ['page', 5]]);
        });

        it('Должно вернуть пустое значение если параметр пагинации не проинициализирован', () => {
            const paginationParam = query.parsePaginationParts(pagination => Array.from(pagination));

            expect(paginationParam).toEqual([]);
            expect(query.paginationParts).toBeInstanceOf(Map);
        });

        it('Должно заполнить параметр пагинации свойствами по умолчанию при инициализации', () => {
            query.initializePagination();
            const paginationParam = query.parsePaginationParts(pagination => Object.fromEntries(pagination));

            expect(paginationParam).toEqual({ 'per-page': 10, page: 1 });
            expect(query.paginationParts).toBeInstanceOf(Map);
        });
    });
});