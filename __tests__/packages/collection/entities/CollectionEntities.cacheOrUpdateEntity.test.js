/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Entity } from "@packages/entity/Entity"

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Метод cacheOrUpdateEntity()', () => {
    let myEntityClass = null;
    let collection = null;

    beforeEach(() => {
        collection = new Collection();
        myEntityClass = class MyEntity extends Entity {
            static primaryKey = 'code'

            /**
             * @extends Entity
             */
            rules() {
                return { attributes: ['code', 'name'] };
            }
        };
    });

    describe('должен выдавать ожидаемый результат', () => {
        let entity1 = { code: 1, name: 'foo' };
        let entity2 = { code: 1, name: 'bar' };
        let entity3 = { code: 3, name: 'mood' };

        beforeEach(() => {
            collection.entityClass = myEntityClass;
            collection.onEntityCached = jest.fn();
            collection.onEntityCachedOrUpdated = jest.fn();
        });

        test('что корректно кэширует объект', () => {
            collection.cacheOrUpdateEntity(entity1);

            expect(collection.entities.size).toEqual(1);
            expect(collection.entities.get(1)).toBeInstanceOf(myEntityClass);
        });

        it('что обновляет кэшированный объект при совпадении значений первичный ключей', () => {
            collection.cacheOrUpdateEntity(entity1);

            expect(collection.entities.size).toEqual(1);
            expect(collection.entities.get(1)).toBeInstanceOf(myEntityClass);
            expect(collection.entities.get(1).attribute('name')).toEqual('foo');

            collection.cacheOrUpdateEntity(entity2);

            expect(collection.entities.size).toEqual(1);
            expect(collection.entities.get(1)).toBeInstanceOf(myEntityClass);
            expect(collection.entities.get(1).attribute('name')).toEqual('bar');
        });

        describe('что события вызвались нужное количество раз', () => {
            beforeEach(() => {
                collection.cacheOrUpdateEntity(entity1);
                collection.cacheOrUpdateEntity(entity2);
                collection.cacheOrUpdateEntity(entity3);
            });

            it('должно кэшироваться 2 объекта', () => {
                expect(collection.entities.size).toEqual(2);
                expect(collection.entities.get(1)).toBeInstanceOf(myEntityClass);
            });
            it('должно вызваться событие onEntityCached 2 раза', () => {
                expect(collection.onEntityCached).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe("должен выбрасывать ошибку", () => {
        test('если класс сущности не определен', () => {
            expect(() => collection.cacheOrUpdateEntity({ id: 1 }))
                .toThrowError("Класс не является потомком сущности 'Entity'");
        });

        test('если первичный ключ не определен', () => {
            expect(() => {
                collection.entityClass = myEntityClass;
                collection.entityClass.primaryKey = '';
                collection.cacheOrUpdateEntity({});
            }).toThrowError("Первичный ключ не определен в классе сущности 'MyEntity'");
        });

        test('если первичный ключ не найден в загружаемом объекте', () => {
            const entity = { id: 1, name: 'bar' };
            collection.entityClass = myEntityClass;

            expect(() => collection.cacheOrUpdateEntity(entity))
                .toThrowError("Первичный ключ 'code' не найден в загружаемом объекте");
        });
    });
});