/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Arr } from "@packages/helpers/array/Arr";
import { Str } from "@packages/helpers/string/Str";
import { Num } from "@packages/helpers/number/Num";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с объектом.
 *
 * @type {object}
 */
export const Obj = {
    /**
     * Проверяет, есть ли у объекта ключи
     *
     * @param {object} obj Исходный объект
     *
     * @return {boolean} Флаг проверки на существование ключей объекта
     */
    contains(obj) {
        return this.assert(obj) && Object.keys(obj).length > 0;
    },
    /**
     * Проверяет, что элемент является объектом и он пустой
     *
     * @param {object} obj Исходный объект
     *
     * @return {boolean} Флаг проверки на объект и пустой он или нет
     */
    empty(obj) {
        return this.assert(obj) && Object.keys(obj).length === 0;
    },
    /**
     * Проверяет, является ли элемент объектом и есть ли у него указанное свойства
     *
     * @param {object} obj Исходный объект
     * @param {string} propName Имя свойства объекта
     *
     * @return {boolean} Флаг проверки на объект и на существующие свойства объекта
     */
    isset(obj, propName) {
        return this.assert(obj) && obj.hasOwnProperty(propName) && typeof obj[propName] !== 'undefined';
    },
    /**
     * Возвращает свойство из объекта, если она там определена.
     *
     * @param {object} obj Объект
     * @param {string} name Имя свойства
     * @param {any} [defaultValue=null] Значение по умолчанию.
     *
     * @return {any} Значение.
     */
    get(obj, name, defaultValue = null) {
        return this.isset(obj, name) ? obj[name] : defaultValue;
    },
    /**
     * Проверяет, является ли элемент объектом
     *
     * @param {object} element Исходный элемент
     *
     * @return {boolean} Флаг проверки на объект
     */
    assert(element) {
        return typeof element === 'object' && !Array.isArray(element) && element !== null;
    },
    /**
     * Метод фильтрации объектов от неопределенных и пустых данных
     *
     * @param {object} obj Объект до фильтрации (исходный)
     *
     * @return {object} Объект с данными после фильтрации
     */
    freeFromEmptiness(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([prop, item]) => {
            if (this.assert(item)) {
                return this.contains(item);
            } else if (Array.isArray(item)) {
                return Arr.contains(item);
            } else if (Str.assert(item)) {
                return Str.contains(item);
            }  else if (Num.assert(item)) {
                return item >= 0;
            }

            return typeof item !== 'undefined' && item !== null;
        }));
    },
    /**
     * Возвращает данные из вложенного объекта по имени.
     *
     * @param {object} obj Исходный объект
     * @param {string[]} names Имя свойств вложенного объекта.
     * @param {null|any} [defaultValue=null] Значение по умолчанию.
     *
     * @return {any} Объект с данными
     */
    fromNested(obj, names, defaultValue = null) {
        if (!this.assert(obj) || this.empty(obj)) {
            return defaultValue;
        }

        let value = obj;

        for (let i = 0; i < names.length; i++) {
            if (!value.hasOwnProperty(names[i])) {
                return defaultValue;
            }

            value = value[names[i]];
        }

        return value;
    },
    /**
     * Возвращает только нужные свойства.
     *
     * @param {object} obj Исходный объект
     * @param {string[]} propNames Имена свойств.
     *
     * @return {object} Объект только с нужными свойствами.
     */
    only(obj, propNames) {
        let extractedProps = {};

        for (let propName of propNames) {
            if (this.isset(obj, propName)) {
                extractedProps[propName] = obj[propName];
            }
        }

        return extractedProps;
    },
    /**
     * Возвращает только нужные свойства.
     *
     * @param {object} srcObj Исходный объект.
     * @param {Array<string|object>} onlyPropRules Только свойства.
     *
     * @return {object} Объект только с нужными свойствами.
     */
    onlyFromNested(srcObj, onlyPropRules) {
        let extractedProps = {};

        for (let onlyPropRule of onlyPropRules) {
            if (this.assert(onlyPropRule)) {
                for (let [propRuleName, propRules] of Object.entries(onlyPropRule)) {
                    if (!this.isset(srcObj, propRuleName)) {
                        continue;
                    }

                    const objPropValues = srcObj[propRuleName];

                    if (this.assert(objPropValues)) {
                        extractedProps[propRuleName] = this.onlyFromNested(objPropValues, propRules);
                    } else if (Array.isArray(objPropValues)) {
                        extractedProps[propRuleName] = [];

                        for (let objPropValue of objPropValues) {
                            if (this.assert(objPropValue)) {
                                extractedProps[propRuleName].push(this.onlyFromNested(objPropValue, propRules));
                            }
                        }
                    }
                }
            } else if (typeof onlyPropRule === 'string' && this.isset(srcObj, onlyPropRule)) {
                extractedProps[onlyPropRule] = srcObj[(onlyPropRule)];
            }
        }

        return extractedProps;
    },
    /**
     * Проверяет, определен метод в объекте.
     *
     * @param {object} obj Объект.
     * @param {string} name Имя
     *
     * @return {boolean}
     */
    in(obj, name) {
        return this.assert(obj) && name in obj;
    },
    /**
     * Объединяет данные в объекте, учитывая вложенность объектов коллекции.
     *
     * @param {object} srcObj Исходный объект.
     * @param {object} secondaryObj Объединяемый объект.
     * @param {boolean} [useArrayMerge=false] Использовать слияние в массиве.
     *
     * @return {object} Результат объединения.
     */
    mergeNested(srcObj, secondaryObj , useArrayMerge = false) {
        const merged = { ...srcObj };

        for (const key in secondaryObj) {
            if (this.isset(merged, key) && this.assert(merged[key]) && this.assert(secondaryObj[key])) {
                merged[key] = this.mergeNested(merged[key], secondaryObj[key]);
            } else if (useArrayMerge && (this.isset(merged, key) && Array.isArray(merged[key]) && Array.isArray(secondaryObj[key]))) {
                secondaryObj[key].forEach((subject, inx) => {
                    merged[key][inx] = this.mergeNested(merged[key][inx], subject);
                })
            } else {
                merged[key] = secondaryObj[key];
            }
        }

        return merged;
    },

    /**
     * Фильтрует переданный объект и возвращает перечисляемые пары свойств со строковыми ключами
     *
     * @param {object} srcObj Фильтруемый объект
     * @param {string[]} filterKeys Ключи, которые останутся в выборке
     *
     * @return {object} Объект, сформированный после фильтрации переданного объекта по парам ключ-значение
     */
    filter(srcObj, filterKeys) {
        return Object.keys(srcObj)
            .filter((key) => filterKeys.includes(key))
            .reduce((acc, key) => {
                acc[key] = srcObj[key];

                return acc;
            }, {});
    },

    /**
     * Фильтрует объект по ключам кроме указанных
     *
     * @param {object} srcObj Исходный объект
     * @param {string[]} omit Ключи, которые будут исключены из выборки
     *
     * @return {{}} Объект, сформированный после фильтрации переданного объекта по парам ключ-значение
     */
    omitKeys(srcObj, omit= []) {
        return Object.keys(srcObj)
            .filter((key) => !omit.includes(key))
            .reduce((acc, key) => {
                acc[key] = srcObj[key];

                return acc;
            }, {});
    },
};