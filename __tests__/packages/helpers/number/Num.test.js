/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Num } from '@packages/helpers/number/Num';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Num.assert()', () => {
    it('Должно вернуть true, если переменная является числом', () => {
        const value = 0;

        const valueIsNumber = Num.assert(value);

        expect(valueIsNumber).toEqual(true);
    });
    it('Должно вернуть false, если переменная не является числом', () => {
        const value = false;

        const valueIsNumber = Num.assert(value);

        expect(valueIsNumber).toEqual(false);
    });
});