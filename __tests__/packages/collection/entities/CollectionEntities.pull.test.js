/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Entity } from "@packages/entity/Entity"

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

class MyEntity extends Entity {
    static primaryKey = 'code'

    /**
     * @extends Entity
     */
    rules() {
        return { attributes: ['code', 'name'] };
    }
};

const initialEntities = [
    { code: 1, name: 'foo' },
    { code: 2, name: 'bar' },
    { code: 3, name: 'mood' }
];

describe('Метод pull()', () => {
    let collection;

    beforeEach(() => {
        collection = new Collection();
        collection.entityClass = MyEntity;
        collection.fill(initialEntities);
    });

    it("Должен возвращать массив аттрибутов сущности, при использовании параметра usePullFromEntity со значением true", () => {
        const resultEntities = collection.pull(true);

        expect(resultEntities).toBeInstanceOf(Array);
        expect(resultEntities.length).toBe(initialEntities.length);

        for (let resultEntity of resultEntities) {
            expect(resultEntity).not.toBeInstanceOf(MyEntity);
            expect(resultEntity).toBeInstanceOf(Object);
        }

        expect(resultEntities).toEqual(initialEntities);
    });
});