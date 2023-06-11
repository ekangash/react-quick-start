/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QuerySort', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('sort()', () => {
        it('добавляет параметры сортировки в экземпляр query', () => {
            query.sort('attrName1', '-attrName1','-attrName2');

            expect(query.sortParts).toEqual(new Set(['-attrName1', '-attrName2']));
        });

        it('должен добавить либо asc, либо des атрибут', () => {
            query.sortParts = new Set(['attrName1', '-attrName2']);
            query.sort('-attrName1');
            query.sort('attrName2');

            expect(query.sortParts).toEqual(new Set(['-attrName1', 'attrName2']));
            expect(query.sortParts.has('attrName1')).toBeFalsy();
        });
    });

    describe('asc()', () => {
        it('добавляет параметр сортировки "по возрастанию" в экземпляр query', () => {
            query.asc('attrName1');

            expect(query.sortParts).toEqual(new Set(['attrName1']));
        });

        it('удаляет параметр сортировки "по убыванию", если он уже был добавлен', () => {
            query.desc('attrName1');
            query.asc('attrName1');

            expect(query.sortParts).toEqual(new Set(['attrName1']));
        });
    });

    describe('desc()', () => {
        it('добавляет параметр сортировки "по убыванию" в экземпляр query', () => {
            query.desc('attrName1');

            expect(query.sortParts).toEqual(new Set(['-attrName1']));
        });

        it('удаляет параметр сортировки "по возрастанию", если он уже был добавлен', () => {
            query.asc('attrName1');
            query.desc('attrName1');

            expect(query.sortParts).toEqual(new Set(['-attrName1']));
        });
    });

    describe('isSortAscending()', () => {
        it('возвращает true, если параметр сортировки "по возрастанию"', () => {
            query.asc('attrName1');

            expect(query.isSortAscending('attrName1')).toBe(true);
        });

        it('возвращает false, если параметр сортировки "по убыванию"', () => {
            query.desc('attrName1');

            expect(query.isSortAscending('attrName1')).toBe(false);
        });

        it('возвращает false, если параметр сортировки не добавлен', () => {
            expect(query.isSortAscending('attrName1')).toBe(false);
        });
    });

    describe('isSortDescending()', () => {
        it('возвращает true, если параметр сортировки "по убыванию"', () => {
            query.desc('attrName1');

            expect(query.isSortDescending('attrName1')).toBe(true);
        });

        it('возвращает false, если параметр сортировки "по возрастанию"', () => {
            query.asc('attrName1');

            expect(query.isSortDescending('attrName1')).toBeFalsy();
        });

        it('возвращает false, если параметр сортировки не добавлен', () => {
            expect(query.isSortDescending('attrName1')).toBeFalsy();
        });
    });


    describe('deleteFromSort()', () => {
        it('должен удалить атрибут из параметра сортировки', () => {
            query.sort('attrName1', 'attrName2');

            expect(query.deletePartFromSorts('attrName1')).toBeTruthy();
            expect(query.sortParts).toEqual(new Set(['attrName2']));
        });

        it('должен удалить атрибут "по убыванию" из параметра сортировки', () => {
            query.sort('-attrName1', 'attrName2', '-attrName3');

            expect(query.deletePartFromSorts('attrName1')).toBeTruthy();
            expect(query.sortParts).toEqual(new Set(['attrName2', '-attrName3']));
        });

        it('должен вычеркнуть несуществующий атрибут из параметра сортировки', () => {
            query.sort('attrName1', 'attrName2');

            expect(query.deletePartFromSorts('attrName3')).toBeFalsy();
            expect(query.sortParts).toEqual(new Set(['attrName1', 'attrName2']));
        });
    });

    describe('parseSortParts()', () => {
        it('должны возвращать параметры сортировки', () => {
            query.sort('attrName1', '-attrName2');
            const sortParam = query.parseSortParts(sort => Array.from(sort));

            expect(sortParam).toEqual(['attrName1', '-attrName2']);
        });

        it('должен создать пустой набор параметра сортировки, если он не существует', () => {
            const sortParam = query.parseSortParts(sort => Array.from(sort));

            expect(sortParam).toEqual([]);
            expect(query.sortParts).toBeInstanceOf(Set);
        });
    });
});