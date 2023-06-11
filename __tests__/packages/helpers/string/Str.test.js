/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Str } from '@packages/helpers/string/Str';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Str.contains()', () => {
    it('Должно вернуть true, если строка не пустая', () => {
        const str = '1';

        const stringIsFilled = Str.contains(str);

        expect(stringIsFilled).toEqual(true);
    });
    it('Должно вернуть false, если строка пустая', () => {
        const str = '';

        const stringIsFilled = Str.contains(str);

        expect(stringIsFilled).toEqual(false);
    });
});

describe('Str.empty()', () => {
    it('Должно вернуть true, если строка пустая', () => {
        const str = '';

        const stringIsEmpty = Str.empty(str);

        expect(stringIsEmpty).toEqual(true);
    });
    it('Должно вернуть false, если строка не пустая', () => {
        const str = '1';

        const stringIsEmpty = Str.empty(str);

        expect(stringIsEmpty).toEqual(false);
    });
});