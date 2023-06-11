/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Entity } from "@packages/entity/Entity"

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Метод forEntity()', () => {
    let myEntityClass = null;
    let collection = null;

    beforeEach(() => {
        collection = new Collection();
        myEntityClass = class MyEntity extends Entity {
            static primaryKey = 'code'

            safeAttributes = ['code', 'name']
        };
    });

    describe('должен выдавать ожидаемый результат', () => {
        it('должно установить правильный класс сущности', () => {
            collection.forEntity(myEntityClass);

            expect(collection.entityClass).toEqual(myEntityClass);
        });
    });

    describe("должен выбрасывать ошибку", () => {
        test('если передать класс сущности, который не является потомком класса Entity', () => {
            const entityClass = class MyEntity {};

            expect(() => collection.forEntity(entityClass)).toThrowError(`Класс не является потомком сущности 'Entity'`);
        });

        test('если первичный ключ сущности не определен', () => {
            const entityClass = class MyEntity extends Entity {
                static primaryKey = ''
            }

            expect(() => collection.forEntity(entityClass)).toThrowError("Первичный ключ не определен в классе сущности 'MyEntity'");
        });
    });
});