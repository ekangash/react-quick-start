/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { TABLE_COLUMN_FILTER_NAMES } from "@enums/table/Table";
import { Entity } from "@packages/entity/Entity";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { DatagridColumn } from "@features/datagrid/DatagridColumn";


/** 6 Resources */

const COLUMN_PROPERTY_NAME = 'person';
const COLUMN_PROPERTY_LABEL = 'Активный пользователь';
const COLUMN_PROPERTY_ACTIVE = false;
const COLUMN_PROPERTY_FILTER_OFF = false;
const COLUMN_PROPERTY_FILTER_INPUT = { name: TABLE_COLUMN_FILTER_NAMES.INPUT };
const COLUMN_PROPERTY_FILTER_DATE = { name: TABLE_COLUMN_FILTER_NAMES.DATE };
const COLUMN_PROPERTY_FILTER_SELECT= { name: TABLE_COLUMN_FILTER_NAMES.SELECT };
const COLUMN_PROPERTY_SORT = true;

const COLUMN_PROPERTIES = {
    name: COLUMN_PROPERTY_NAME,
    label: COLUMN_PROPERTY_LABEL,
    active: COLUMN_PROPERTY_ACTIVE,
    filter: COLUMN_PROPERTY_FILTER_INPUT,
    sort: COLUMN_PROPERTY_SORT,
};

describe('Переопределения свойств колонки при инициализации экземпляра', () => {
    const column = (new DatagridColumn()).update(COLUMN_PROPERTIES);

    it("Утверждение, что сформирован уникальный ключ колонки", () => {
        const keyIsFilled = typeof column.key === 'string' && column.key.length > 0;

        expect(keyIsFilled).toBe(true);
    });

    it('Вызов column.equalToName()', () => {
        const columnNameIsPerson = column.equalToName(COLUMN_PROPERTY_NAME);

        expect(columnNameIsPerson).toBe(true);
    });

    it("Вызов column.property('value') - проверка, что свойство 'value' является функцией", () => {
        const typeValueProperty = typeof column.property('value');

        expect(typeValueProperty).toBe('function');
    });

    for (let [columnPropertyName, columnPropertyValue] of Object.entries(COLUMN_PROPERTIES)) {
        it(`Вызов column.property(${columnPropertyName})`, () => {
            const columnProperty = column.property(columnPropertyName);

            expect(columnProperty).toEqual(columnPropertyValue);
        });
    }

    describe('Вызов column.properties() без параметра.', () => {
        const COLUMN_PROPERTY_NAMES = ['name', 'label', 'filter', 'value','sort', 'active'];
        const allColumnProperties = column.properties();

        for (let columnPropertyName of COLUMN_PROPERTY_NAMES) {
            it(`Свойство ${columnPropertyName} определено`, () => {
                expect(allColumnProperties).toHaveProperty(columnPropertyName);
            });
        }

        it('Количество полученных свойств равно всем доступным', () => {
            const allColumnPropertyNames = Object.keys(allColumnProperties);

            expect(allColumnPropertyNames).toEqual(COLUMN_PROPERTY_NAMES);
        });
    });

    describe('Вызов column.properties() c параметром.', () => {
        const COLUMN_PROPERTY_NAMES = ['name', 'label', 'filter'];
        const columnProperties = column.properties(COLUMN_PROPERTY_NAMES);

        for (let columnPropertyName of COLUMN_PROPERTY_NAMES) {
            it(`Свойство ${columnPropertyName} определено`, () => {
                expect(columnProperties).toHaveProperty(columnPropertyName);
            });
        }

        it('Количество полученных свойств равно всем запрошенным', () => {
            expect(Object.keys(columnProperties)).toEqual(COLUMN_PROPERTY_NAMES);
        });
    });

    describe('Вызов column.properties() c попыткой получить отсутствующие параметры.', () => {
        it('Количество полученных свойств не равно полученным', () => {
            const COLUMN_PROPERTY_NAMES = ['undefined', 'label', 'filter'];
            const columnProperties = column.properties(COLUMN_PROPERTY_NAMES);

            expect(Object.keys(columnProperties)).not.toEqual(COLUMN_PROPERTY_NAMES);
        });
    });

    it('Что свойство undefined не определена', () => {
        column.update({ undefined: 'not_value' });

        expect(typeof column.undefined === 'undefined').toEqual(true);
        expect(column.undefined).not.toEqual('not_value');
    });

    it('Что свойство key не изменяется', () => {
        const columnKeyBeforeUpdate = column.property('key');

        column.update({ key: '2WFwaaFF2fs' });

        const columnKeyAfterUpdate = column.property('key');

        expect(columnKeyAfterUpdate).toEqual(columnKeyBeforeUpdate);
    });
});


describe('Что все типы фильтрации столбца отражают ожидаемое поведение', () => {
    const column = new DatagridColumn();

    afterEach(() => {
        column.update({ filter: COLUMN_PROPERTY_FILTER_OFF });
    });

    it('Фильтр выключен', () => {
        const filterPropertyIsEnabled = column.filterIsEnabled();

        expect(filterPropertyIsEnabled).toEqual(false);
    });

    it('Фильтр включен', () => {
        column.update({ filter: COLUMN_PROPERTY_FILTER_INPUT });
        const filterPropertyIsEnabled = column.filterIsEnabled();

        expect(filterPropertyIsEnabled).toEqual(true);
    });

    it('Фильтр определен как функция', () => {
        column.update({ filter: () => null });

        const filterPropertyIsEnabled = column.filterIsEnabled();

        expect(filterPropertyIsEnabled).toEqual(true);
    });

    it('Фильтр определен как текстовое поле - name', () => {
        column.update({ filter: COLUMN_PROPERTY_FILTER_INPUT });

        const filterPropertyIsInput = column.filterIsInput();
        const filterPropertyInput = column.property('filter');

        expect(filterPropertyIsInput).toEqual(true);
        expect(filterPropertyInput).toEqual(COLUMN_PROPERTY_FILTER_INPUT);
    });

    it('Фильтр определен как поле даты - date', () => {
        column.update({ filter: COLUMN_PROPERTY_FILTER_DATE });

        const filterPropertyIsDate = column.filterIsDate();
        const filterPropertyDate = column.property('filter');

        expect(filterPropertyIsDate).toEqual(true);
        expect(filterPropertyDate).toEqual(COLUMN_PROPERTY_FILTER_DATE);
    });

    it('Фильтр определен как поле выбора - select', () => {
        column.update({ filter: COLUMN_PROPERTY_FILTER_SELECT });

        const filterPropertyIsSelect = column.filterIsSelect();
        const filterPropertySelect = column.property('filter');

        expect(filterPropertyIsSelect).toEqual(true);
        expect(filterPropertySelect).toEqual(COLUMN_PROPERTY_FILTER_SELECT);
    });
});


describe('Что метод value возвращает ожидаемый результат', () => {
    const column = new DatagridColumn();

    it('Свойство value является функцией', () => {
        const typeColumnPropertyValue = typeof column.value;

        expect(typeColumnPropertyValue).toBe('function');
    });

    it("Свойство value возвращает значения атрибута 'name' переданной сущности", () => {
        class MyEntity extends Entity {
            static primaryKey = 'code'

            /**
             * @extends Entity
             */
            rules() {
                return { attributes: ['code', 'name'] };
            }
        }

        const entity = new MyEntity().fill({ code: 1, name: 'foo' });
        const entityAttributeValue = entity.attribute('name');
        const columnPropertyValue = column.value(entity, 'name');

        expect(columnPropertyValue).toEqual(entityAttributeValue);
    });
});
