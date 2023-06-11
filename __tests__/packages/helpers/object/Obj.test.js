/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from '@packages/helpers/object/Obj';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Obj.contains()', () => {
    it('Должно вернуть true, если у объекта есть свойства', () => {
        const obj = { name: 'name' };

        const objIsFilled = Obj.contains(obj);

        expect(objIsFilled).toEqual(true);
    });
    it('Должно вернуть false, если у объект пустой', () => {
        const obj = {};

        const objIsFilled = Obj.contains(obj);

        expect(objIsFilled).toEqual(false);
    });
});

describe('Obj.empty()', () => {
    it('Должно вернуть true, если объект пустой', () => {
        const obj = {};

        const objIsEmpty = Obj.empty(obj);

        expect(objIsEmpty).toEqual(true);
    });
    it('Должно вернуть false, если объект не пустой', () => {
        const obj = { name: 'name' };

        const objIsEmpty = Obj.empty(obj);

        expect(objIsEmpty).toEqual(false);
    });
});

describe('Obj.isset()', () => {
    it('Должно вернуть true, если переменная является объектом и у нее есть необходимое свойство', () => {
        const obj = { name: 'name' };

        const nameIsIssetInObj = Obj.isset(obj, 'name');

        expect(nameIsIssetInObj).toEqual(true);
    });
    it('Должно вернуть false, если переменная является объектом, но у нее нет необходимого свойства', () => {
        const obj = { name: 'name' };

        const lastNameIsIssetInObj = Obj.isset(obj, 'lastName');

        expect(lastNameIsIssetInObj).toEqual(false);
    });
    it('Должно вернуть false, если переменная не является объектом', () => {
        const fakeObj = '';

        const nameIsIssetInFakeObj = Obj.isset(fakeObj, 'name');

        expect(nameIsIssetInFakeObj).toEqual(false);
    });
});

describe('Obj.get()', () => {
    const OBJ_NAME_VALUE = 'example';
    const OBJ_NAME_DEFAULT_VALUE = 'example default';
    const obj = { name: OBJ_NAME_VALUE };

   it('Должен вернуть значение "example", так как свойство в объекте определено!', () => {
      const objNameValue = Obj.get(obj, 'name');

      expect(objNameValue).toEqual(OBJ_NAME_VALUE);
   });

    it('Должен вернуть null, так как свойство names в объекте не определено как и значения по умолчанию.', () => {
        const objNameValue = Obj.get(obj, 'names');

        expect(objNameValue).toBeNull();
    });

    it('Должен вернуть значение по умолчанию, так как свойство "names" не определено.', () => {
        const objNameValue = Obj.get(obj, 'names', OBJ_NAME_DEFAULT_VALUE);

        expect(objNameValue).toEqual(OBJ_NAME_DEFAULT_VALUE);
    });
});

describe('Obj.assert()', () => {
    it('Должно вернуть true, если переменная является объектом', () => {
        const obj = {};

        const objIsObject = Obj.assert(obj);

        expect(objIsObject).toEqual(true);
    });
    it('Должен вернуть false, если переменная не является объектом', () => {
        const arr = [];
        const func = () => {};
        const nullable = null;
        const undefinedValue = undefined;
        const num = 0;
        const str = '';
        const bool = true;

        const arrIsObject = Obj.assert(arr);
        const funcIsObject = Obj.assert(func);
        const nullableIsObject = Obj.assert(nullable);
        const undefinedIsObject = Obj.assert(undefinedValue);
        const numIsObject = Obj.assert(num);
        const strIsObject = Obj.assert(str);
        const boolIsObject = Obj.assert(bool);

        expect(arrIsObject).toEqual(false);
        expect(funcIsObject).toEqual(false);
        expect(nullableIsObject).toEqual(false);
        expect(undefinedIsObject).toEqual(false);
        expect(numIsObject).toEqual(false);
        expect(strIsObject).toEqual(false);
        expect(boolIsObject).toEqual(false);
    });
});

describe('Obj.freeFromEmptiness()', () => {
    it('Должно вернуть объект с заполненными значениями', () => {
        const obj = {
            name: 'name',
            age: 1,
            arr: [1, 2, 3],
            undefinedValue: undefined,
            nullValue: null,
            emptyObj: {},
        };

        const expectedObj = {
            name: 'name',
            age: 1,
            arr: [1, 2, 3],
        };

        const freeFromEmptinessObject = Obj.freeFromEmptiness(obj);

        expect(freeFromEmptinessObject).toEqual(expectedObj);
    });
});

describe('Obj.fromNested()', () => {
    it('Должно вернуть глубоко вложенное значение из объекта', () => {
        const obj = {
            nested1: {
                nested2: {
                    nested3: 'name',
                },
            },
        };

        const nestedValue = Obj.fromNested(obj, ['nested1', 'nested2', 'nested3']);

        const expectedValue = 'name';

        expect(nestedValue).toEqual(expectedValue);
    });
    it('Должно вернуть значение по-умолчанию, если объект пустой', () => {
        const obj = {};
        const defaultValue = 'default';

        const nestedValue = Obj.fromNested(obj, ['nested'], defaultValue);

        expect(nestedValue).toEqual(defaultValue);
    });
    it('Должно вернуть значение по-умолчанию, если при поиске значения во вложенностях, оно не было найдено', () => {
        const obj = {
            nested1: 'nested',
        };

        const nestedValue = Obj.fromNested(obj, ['nested1', 'nested2'], null);

        expect(nestedValue).toBeNull();
    });
});

describe('Obj.only()', () => {
    it('Должен вернуть пустой объект, ибо параметры функции пусты', () => {
        const obj = {};
        const onlyProps = [];

        const extractedProps = Obj.only(obj, onlyProps);

        expect(extractedProps).toEqual({});
    });

    it("Должен вернуть объект с свойствами 'name' и 'filter'.", () => {
        const obj = { name: 'example', active: true, filter: false };
        const onlyProps = ['name', 'filter'];

        const extractedProps = Obj.only(obj, onlyProps);

        expect(extractedProps).toEqual({ name: 'example', filter: false });
    });
});


describe('obj.mergeNested()', () => {
    const srcObj = {
        id: 10,
        title: 'The Art of Learning',
        category: 'Personal Development',
        scores: { reviews: 2 },
        files: { cover: 'https://initial.jpg', publisher: 'https://initial.jpg'},
        author: { sign: 4444, nickname: 'Josh Waitzkin', nationality: 'American'},
        reviews: [
            { id: 1, user: { name: 'John', surname: 'Doe' }, message: 'A brilliant book!' },
            { id: 2, user: { name: 'Jane', surname: 'Smith'}, message: 'This book is amazing!' }
        ],
        content: [
            { id: "1WsEkqSDgh1Illl4", type: "heading-two" },
            { id: "jduohsmUdHYMBRdF", type: "paragraph" },
            { id: "Ks0RVnLW8IhhARZX", type: "image" },
        ]
    };

    const secondaryObj = {
        title: 'The Art of Develop',
        files: { cover: 'https://initial.jpg', publisher: new File([''], '')},
        author: { sign: 55555, nickname: 'Josh Waitzkin', nationality: 'Island'},
        reviews: [
            { id: 2, user: { name: 'Jane', surname: 'Rail'}, message: 'This book is beautifully!' }
        ],
        content: [
            { id: "Ks0RVnLW8IhhARZX", type: "image" },
        ]
    };

    it('Должен обновить или дополнить вложенный набор данных, учитывая объекты во вложенность массивов', () => {
        expect(Obj.mergeNested(srcObj, secondaryObj, true)).toEqual({
            id: 10,
            title: "The Art of Develop",
            category: "Personal Development",
            files: { cover: "https://initial.jpg", publisher: new File([''], '') },
            author: { nationality: "Island", nickname: "Josh Waitzkin",  sign: 55555 },
            reviews: [
                { id: 2, message: "This book is beautifully!", user: { name: "Jane", surname: "Rail" } },
                { id: 2, message: "This book is amazing!", user: { name: "Jane", surname: "Smith" } }
            ],
            content: [
                { id: "Ks0RVnLW8IhhARZX", type: "image" },
                { id: "jduohsmUdHYMBRdF", type: "paragraph"},
                { id: "Ks0RVnLW8IhhARZX", type: "image" }
            ],
            scores: { reviews: 2 }
        });
    });
    it('Должен обновить или дополнить вложенный набор данных объекта, заменяя структуру массивов', () => {
        expect(Obj.mergeNested(srcObj, secondaryObj)).toEqual({
            id: 10,
            title: "The Art of Develop",
            category: "Personal Development",
            files: { cover: "https://initial.jpg", publisher: new File([''], '') },
            author: { nationality: "Island", nickname: "Josh Waitzkin",  sign: 55555 },
            reviews: [ { id: 2, user: { name: 'Jane', surname: 'Rail'}, message: 'This book is beautifully!' } ],
            content: [ { id: "Ks0RVnLW8IhhARZX", type: "image" } ],
            scores: { reviews: 2 }
        });
    });
});


describe('Obj.onlyFromNested()', () => {
    const srcObj = {
        id: 10,
        title: 'The Art of Learning',
        category: 'Personal Development',
        scores: { reviews: 2 },
        files: { cover: 'https://initial.jpg', publisher: 'https://initial.jpg'},
        author: { sign: 4444, nickname: 'Josh Waitzkin', nationality: 'American'},
        reviews: [
            { id: 1, user: { name: 'John', surname: 'Doe' }, message: 'A brilliant book!' },
            { id: 2, user: { name: 'Jane', surname: 'Smith'}, message: 'This book is amazing!' }
        ],
        content: [
            { id: "1WsEkqSDgh1Illl4", type: "heading-two" },
            { id: "jduohsmUdHYMBRdF", type: "paragraph" },
            { id: "Ks0RVnLW8IhhARZX", type: "image" },
        ]
    };

    it('Должен вернуть вложенный набор данных', () => {
        const onlyPropRules = ['id', 'category', {
            files: ['cover'],
            scores: ['reviews'],
            reviews: ['message', { user: ['surname'] }]
        }];

        expect(Obj.onlyFromNested(srcObj, onlyPropRules)).toEqual({
            id: 10,
            category: 'Personal Development',
            files: { cover: 'https://initial.jpg' },
            scores: { reviews: 2 },
            reviews: [
                { user: { surname: 'Doe' }, message: 'A brilliant book!' },
                { user: { surname: 'Smith' }, message: 'This book is amazing!'}
            ]
        });
    });
});