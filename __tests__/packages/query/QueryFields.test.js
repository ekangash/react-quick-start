/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Query } from "@packages/query/Query";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('QueryFields', () => {
    let query;

    beforeEach(() => {
       query =  new Query();
    });

    describe('fields()', () => {
        it('должен добавляет только уникальные имена атрибутов в параметр полей', () => {
            query.fields('attrName1', 'attrName1','attrName2');

            expect(query.fieldParts).toEqual(new Set(['attrName1', 'attrName2']));
        });
    });

    describe('parseFieldParts()', () => {
        it('должны возвращать параметры полей', () => {
            query.fields('attrName1', 'attrName2');
            const fieldsParam = query.parseFieldParts(fields => Array.from(fields));

            expect(fieldsParam).toEqual(['attrName1', 'attrName2']);
        });

        it('должен создать пустой набор параметра полей, если он не существует', () => {
            const fieldsParam = query.parseFieldParts(fields => Array.from(fields));

            expect(fieldsParam).toEqual([]);
            expect(query.fieldParts).toBeInstanceOf(Set);
        });
    });
});