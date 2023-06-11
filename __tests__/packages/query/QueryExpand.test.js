/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QueryExpand', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('expand()', () => {
        it('должен добавляет только уникальные имена связей в параметр "expand" объекта запроса', () => {
            query.expand('relationName1', 'relationName1','relationName2');

            expect(query.expandParts).toEqual(new Set(['relationName1', 'relationName2']));
        });
    });

    describe('deleteFromExpand()', () => {
        it('должен вернуть true если удалось удалить имя связи и false если нечего удалять', () => {
            query.expand('relationName1', 'relationName2');

            expect(query.deletePartFromExpands('relationName1')).toBe(true);
            expect(query.deletePartFromExpands('relationName1')).toBe(false);
            expect(query.expandParts).toEqual(new Set(['relationName2']));
        });
    });

    describe('getFromExpandParam()', () => {
        it('должны возвращать все имена связей из параметра "expand"', () => {
            query.expand('relationName1', 'relationName2');
            const expandParam = query.parseExpandParts(expand => Array.from(expand));

            expect(expandParam).toEqual(['relationName1', 'relationName2']);
        });

        it('должен создать пустой набор параметра "expand", если он не определен', () => {
            const expandParam = query.parseExpandParts(expand => Array.from(expand));

            expect(expandParam).toEqual([]);
            expect(query.expandParts).toBeInstanceOf(Set);
        });
    });
});