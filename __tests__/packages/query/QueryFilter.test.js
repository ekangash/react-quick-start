/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QueryFilter', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('filter()', () => {
        it('Должно добавлять только уникальные атрибуты в параметр "filter" объекта запроса', () => {
            query.filter('attrName1', 'attrValue1');
            query.filter('attrName1', 'attrValue');
            query.filter('attrName2', 'attrValue2');

            expect(query.filterParts).toEqual(new Map([['attrName1', 'attrValue'], ['attrName2', 'attrValue2']]));
        });

        it('Должно пропустить пустые значения атрибута фильтра объекта запроса', () => {
            query.filter('attrName2', '');

            expect(query.filterParts).toEqual(new Map([]));
        });
    });

    describe('deletePartFromFilters()', () => {
        it('Должно вернуть true если удалось удалить атрибут фильтра, false если удаление не вышло или нечего удалять', () => {
            query.filter('attrName1', 'attrValue1');
            query.filter('attrName2', 'attrValue2');

            expect(query.deletePartFromFilters('attrName1')).toBe(true);
            expect(query.deletePartFromFilters('attrName1')).toBe(false);
            expect(query.filterParts).toEqual(new Map([['attrName2', 'attrValue2']]));
        });
    });

    describe('parseFilterParts()', () => {
        it('Должно возвращать все имена связей из параметра "filter"', () => {
            query.filter('attrName1', 'attrValue1');
            const filterParam = query.parseFilterParts(filter => Array.from(filter));

            expect(filterParam).toEqual([['attrName1', 'attrValue1']]);
        });

        it('Должно создать пустой набор параметра "filter", если он не определен', () => {
            const filterParam = query.parseFilterParts(filter => Array.from(filter));

            expect(filterParam).toEqual([]);
            expect(query.filterParts).toBeInstanceOf(Map);
        });
    });
});