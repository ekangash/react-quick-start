/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Entity } from "@packages/entity/Entity"

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/** Mocks */
const entity1 = { code: 1, name: 'foo' };
const entity2 = { code: 2, name: 'bar' };
const entity3 = { code: 3, name: 'mood' };
const entities = [entity1, entity2, entity3];

describe('Метод fill()', () => {
    let collection = null;

    beforeEach(() => {
        collection = new Collection();
        collection.entityClass = class MyEntity extends Entity {
            static primaryKey = 'code'

            safeAttributes = ['code', 'name']
        };
    });

    it('должен заполнить коллекцию нужным количеством данных', () => {
        collection.fill(entities);

        expect(collection.count()).toBe(entities.length);
    });

    it('должен кэшировать или обновлять все не пустые сущности', () => {
        collection.cacheOrUpdateEntity = jest.fn();
        collection.fill(entities);

        expect(collection.cacheOrUpdateEntity).toHaveBeenCalledTimes(entities.length);
    });

    it('должен корректно обрабатывать пустой массив или любые иные значения', () => {
        collection.cacheOrUpdateEntity = jest.fn();
        collection.fill({});
        collection.fill(1);
        collection.fill('');
        collection.fill(null);
        collection.fill(undefined);

        expect(collection.cacheOrUpdateEntity).not.toHaveBeenCalled();
    });

    it('должен корректно обрабатывать если передавать не массив', () => {
        collection.cacheOrUpdateEntity = jest.fn();
        collection.fill([]);

        expect(collection.cacheOrUpdateEntity).not.toHaveBeenCalled();
    });

    it('должен вызывать cacheOrUpdateEntity только для заполненных объектов', () => {
        collection.cacheOrUpdateEntity = jest.fn();
        collection.fill([entity1, {}, entity2, {}, 2, [], 'mood']);

        expect(collection.cacheOrUpdateEntity).toHaveBeenCalledTimes(2);
    });
});