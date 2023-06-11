/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

describe('Метод map()', () => {
    const entriesEntities = [
        [1, { code: 14, name: 'foo' }],
        [2, { code: 28, name: 'bar' }],
        [3, { code: 59, name: 'mood' }]
    ];
    let collection = null;

    beforeEach(() => {
        collection = new Collection();
    });

    it('должно инициализировать обратный вызов для каждой сущности коллекции', () => {
        collection.entities = new Map(entriesEntities);
        const mapCallbackFn = jest.fn();
        collection.map(mapCallbackFn);

        expect(mapCallbackFn).toHaveBeenCalledTimes(collection.entities.size);

        for (let [primary ,entriesEntity] of entriesEntities) {
            expect(mapCallbackFn).toHaveBeenCalledWith(entriesEntity, primary);
        }
    });

    it('должно вернуть массив первичных ключей для каждой сущности коллекции', () => {
        collection.entities = new Map(entriesEntities);
        const resultEntityCodes = collection.map(({ code }) => code);

        expect(resultEntityCodes).toEqual([14, 28, 59]);
    });

    it('не должно изменять исходных размер коллекции', () => {
        collection.entities = new Map(entriesEntities);
        const originalSize = collection.entities.size;
        collection.map(({ code }) => code);

        expect(collection.entities.size).toEqual(originalSize);
    });

    it('должно возвращать пустой массив для пустой коллекции', () => {
        const resultEntityCodes = collection.map(({ code }) => code);

        expect(resultEntityCodes).toEqual([]);
    });
});