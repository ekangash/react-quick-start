/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Cls } from '@packages/helpers/class/Cls';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Cls.isClassInstance()', () => {
    it('Должно вернуть true, если переменная является экземпляром класса', () => {
        class SomeClass {}

        const someClass = new SomeClass();
        const someClassIsInstanceOfClass = Cls.isClassInstance(someClass);

        expect(someClassIsInstanceOfClass).toEqual(true);
    });
    it('Должно вернуть false, если переменная не является экземпляром класса', () => {
        const someClass = {};

        const someClassIsInstanceOfClass = Cls.isClassInstance(someClass);

        expect(someClassIsInstanceOfClass).toEqual(false);
    });
});