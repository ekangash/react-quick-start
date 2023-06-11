/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { UrlHelper } from '@packages/helpers/url/Url';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('UrlHelper.split()', () => {
    it('Должно вернуть корректный массив участков маршрута URL', () => {
        const url = '/home/page/index';

        const urlSplitted = UrlHelper.split(url);

        const expectedArray = ['/', 'home', 'page', 'index'];
        expect(urlSplitted).toEqual(expectedArray);
    });
    it('Должно вернуть массив с единственным значением "/", если приходит корневой URL', () => {
        const url = '/';

        const urlSplitted = UrlHelper.split(url);

        const expectedArray = ['/'];
        expect(urlSplitted).toEqual(expectedArray);
    });
});
describe('UrlHelper.concat()', () => {
    it('Должно вернуть корректный URL при конкатенации участков URL в единую строку', () => {
        const urlPaths = ['', 'id', 'view'];
        const urlPathsWithSlash = ['/', 'id', 'view'];

        const urlPathsConcatted = UrlHelper.concat(urlPaths);
        const urlPathsWithSlashConcatted = UrlHelper.concat(urlPathsWithSlash);

        const urlExpected = '/id/view';
        expect(urlPathsConcatted).toEqual(urlExpected);
        expect(urlPathsWithSlashConcatted).toEqual(urlExpected);
    });
});

describe('UrlHelper.query()', () => {
    it('Должен сформировать строку запроса', () => {
        let paths = {
            limit: 40,
            offset: 0,
            filter: { attrName: 'attrValue' },
            fields: [ 'attr1', 'attr2' ],
            expand: [ 'relation1', 'relation2' ]
        }

        expect(UrlHelper.query(paths)).toBe('limit=40&offset=0&filter[attrName]=attrValue&fields=attr1,attr2&expand=relation1,relation2')
    })
    it('Должен сформировать строку запроса с вложенными объектами', () => {
        let paths = {
            limit: 40,
            offset: 0,
            filter: {
                attrName: {
                    like: 'attrValue'
                }
            },
            fields: [ 'attr1', 'attr2' ],
            expand: [ 'relation1', 'relation2' ]
        }

        expect(UrlHelper.query(paths)).toBe('limit=40&offset=0&filter[attrName][like]=attrValue&fields=attr1,attr2&expand=relation1,relation2')
    })
});