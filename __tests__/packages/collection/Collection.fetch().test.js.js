/** 1 NodeModules */
import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";

/** 2 Config, Packages, Endpoints, Enums */
import { Collection } from "@packages/collection/Collection";
import { Query } from "@packages/query/Query";
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

const MY_ENTITY_SEARCH_ENDPOINT = 'http://localhost/api/my-entity/search';
const MY_ENTITY_COLLECTION = [{ code: 14, name: 'foo' }, { code: 28, name: 'bar' }, { code: 59, name: 'mood' }];
const MY_ENTITY_SEARCH_200 = { data: MY_ENTITY_COLLECTION, meta: { pagination: { total: MY_ENTITY_COLLECTION.length  } } };
const MY_ENTITY_SEARCH_500 = { message: 'Ошибка на стороне сервера', type: 'UnprocessableEntityException' };
/**
 * @class MyEntity
 */
class MyEntity extends Entity {
    static primaryKey = 'code'

    /**
     * @extends Entity
     */
    rules() {
        return { attributes: ['code', 'name'] };
    }

    /**
     * @return {Promise<AxiosResponse<object>>}
     */
    async search() {
        return await axios.get(MY_ENTITY_SEARCH_ENDPOINT).then(({ data }) => data);
    }
}

describe('Выполнение Axios запросов', () => {
    const axiosMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

    describe('Что метод .fetch() успешно извлекает данные и загружает в коллекцию - 200 код', () => {
        let collection;

        beforeEach(() => {
            collection = new Collection();
            collection.entityClass = MyEntity;
            collection.query = new Query();
        });

        beforeAll(() => {
            axiosMock.onGet(MY_ENTITY_SEARCH_ENDPOINT).reply(200, MY_ENTITY_SEARCH_200);
        });

        it('должен успешно обновлять коллекцию и обновить параметры пагинации запроса', async () => {
            await collection.fetch();

            expect(collection.entities.size).toEqual(MY_ENTITY_COLLECTION.length);
        });
        it("должен вызвать событие 'onFetching()'", async () => {
            collection.onFetching = jest.fn();
            await collection.fetch();

            expect(collection.onFetching).toHaveBeenCalledTimes(1);
            expect(collection.onFetching).toHaveBeenCalledWith();
        });
        it("должен вызвать событие 'onFetched()'", async () => {
            collection.onFetched = jest.fn();
            await collection.fetch();

            expect(collection.onFetched).toHaveBeenCalledTimes(1);
            expect(collection.onFetched).toHaveBeenCalledWith(MY_ENTITY_SEARCH_200);
        });
        it("должен вызвать метод коллекции 'fill()'", async () => {
            collection.fill = jest.fn();
            await collection.fetch();

            expect(collection.fill).toHaveBeenCalledTimes(1);
            expect(collection.fill).toHaveBeenCalledWith(MY_ENTITY_COLLECTION);
        });
        it('должен вернуть экземпляр коллекции', async () => {
            expect(await collection.fetch()).toBe(collection);
        });

        afterEach(() => {
            jest.resetAllMocks();
        });
    });


    describe('Что метод .fetch() 500', () => {
        const collection = new Collection();
        collection.entityClass = MyEntity;
        collection.query = new Query();
        console.warn = jest.fn();

        beforeAll(() => {
            axiosMock.onGet(MY_ENTITY_SEARCH_ENDPOINT).reply(500, MY_ENTITY_SEARCH_500);
            console.warn = jest.fn();
        });

        afterAll(() => {
            jest.resetAllMocks();
        });

        it("следует заполнить коллекцию данными из метода поиска объекта", async () => {
            await collection.fetch();

            expect(console.warn).toHaveBeenCalledWith(Error('Request failed with status code 500'));
            expect(collection.entities.size).toBe(0);
        });
    });

    afterAll(() => {
        axiosMock.restore();
    });
});


describe('Обработка Exception, что метод fetch() падает в конструкцию catch и вызывается событие onFetchFailed и console.warn', () => {
    let collection;

    beforeEach(() => {
        collection = new Collection();
        collection.onFetchFailed = jest.fn();
        console.warn = jest.fn();
    });

    describe("Должно регистрироваться предупреждение в 'console.warn'", () => {
        test("Если свойство entityClass не является прототипом Entity", async () => {
            collection.query = new Query();
            collection.entityClass = {};

            await collection.fetch();

            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(new Error("Класс не является потомком сущности 'Entity'"));
            expect(collection.onFetchFailed).toHaveBeenCalledTimes(1);
        });
        test("Если переданное имя метода в сущности entityClass не определен метод выборки", async () => {
            collection.query = new Query();
            collection.entityClass = MyEntity;

            collection.methodName = 'fetchTest';
            await collection.fetch();

            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(new Error(`Метод 'fetchTest' не определен в сущности 'MyEntity'`));
            expect(collection.onFetchFailed).toHaveBeenCalledTimes(1);
        });
        test("Если имя метода выборки по умолчанию в сущности entityClass не определено", async () => {
            collection.query = new Query();
            collection.methodName = "nonExistentMethod";
            collection.entityClass = MyEntity;

            await collection.fetch();

            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(new Error(`Метод 'nonExistentMethod' не определен в сущности 'MyEntity'`));
            expect(collection.onFetchFailed).toHaveBeenCalledTimes(1);
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});