/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Func } from '@packages/helpers/function/Func';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Func.assert()', () => {
    it('Должно вернуть true, если переменная является функцией', () => {
        const someFunc = () => {};

        const someFuncIsFunction = Func.assert(someFunc);

        expect(someFuncIsFunction).toEqual(true);
    });
    it('Должно вернуть false, если переменная не является функцией', () => {
        const someFunc = 0;

        const someFuncIsFunction = Func.assert(someFunc);

        expect(someFuncIsFunction).toEqual(false);
    });
});
