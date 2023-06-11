/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import {Query} from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QueryPagination', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('toPath()', () => {
        it('должен сформировать все установленные параметры в строку пути', () => {
            query
                .perPage(40)
                .filter('foo', 'value', 'like')
                .filter('bar', 'value', 'gte')
                .fields('attr1', 'attr2')
                .sort('attr1', '-attr2')
                .expand('relation1', 'relation2');

            const expected = 'per-page=40&page=1&filter[foo][like]=value&filter[bar][gte]=value&fields=attr1,attr2&sort=attr1,-attr2&expand=relation1,relation2';

            expect(query.toPath()).toEqual(expected);
            expect(query.paginationParts).toBeInstanceOf(Map);
        });
    });
});