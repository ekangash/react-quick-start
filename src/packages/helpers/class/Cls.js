/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с классами
 *
 * @type {object}
 */
export const Cls = {
    /**
     * Проверяет, является ли переданное значение экземпляром какого-либо класса
     *
     * @function
     *
     * @param {object} classInstance Проверяемое значение
     *
     * @return {boolean} Является ли переданное значение экземпляром какого-либо класса
     */
    isClassInstance: (classInstance) => {
        return typeof classInstance === 'object'
            && classInstance !== null
            && classInstance !== undefined
            && classInstance.__proto__.constructor.name !== 'Function'
            && classInstance.__proto__.constructor.name !== 'Object';
    },
    /**
     * Проверяет, является ли класс потомком класса-прототипа.
     *
     * @param {Class} subclass Проверяемый класс.
     * @param {Class} parentClass Родительский класс-прототип.
     *
     * @return {boolean} true, если класс является потомком класса-прототипа, иначе false.
     */
    isSubclassOf(subclass, parentClass) {
        return parentClass.isPrototypeOf(subclass);
    },
    /**
     * Определяет имя объекта конструктора
     *
     * @param {object} obj Исходный объект.
     *
     * @return {string} Имя конструктора объекта.
     */
    name(obj) {
        return obj.__proto__.constructor.name;
    },
};