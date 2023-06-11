/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Arr } from '@packages/helpers/array/Arr';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Arr.empty()', () => {
    it('Должен вернуть true, если массив пустой', () => {
        const emptyArray = [];

        const arrayIsEmpty = Arr.empty(emptyArray);

        expect(arrayIsEmpty).toEqual(true);
    });
    it('Должен вернуть false, если массив заполнен', () => {
        const filledArray = [1];

        const arrayIsEmpty = Arr.empty(filledArray);

        expect(arrayIsEmpty).toEqual(false);
    });
});

describe('Arr.contains()', () => {
    it('Должен вернуть true, если массив заполнен', () => {
        const filledArray = [1];

        const arrayIsFilled = Arr.contains(filledArray);

        expect(arrayIsFilled).toEqual(true);
    });
    it('Должен вернуть false, если массив пустой', () => {
        const emptyArray = [];

        const arrayIsFilled = Arr.contains(emptyArray);

        expect(arrayIsFilled).toEqual(false);
    });
});