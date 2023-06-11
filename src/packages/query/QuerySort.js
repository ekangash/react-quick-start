/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс сортировки запроса.
 */
export class QuerySort {
    /**
     * Части параметра сортировки.
     *
     * @type {Set<string>}
     */
    sortParts =  new Set()

    /**
     * Парсит части сортировки в нужный формат.
     *
     * @param {function(sortParts:Set<string>):any} parseFn Функция разбора, преобразующая части сортировки в нужный формат.
     *
     * @return {any} Результат, возвращаемый функцией разбора.
     */
    parseSortParts(parseFn) {
        return parseFn(this.sortParts);
    }

    /**
     * Очищает параметр сортировки.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    clearSortParts() {
        this.sortParts.clear();

        return this;
    }

    /**
     * Добавляет свойства в параметр сортировки.
     *
     * @param {string} names Имена элементов сортировки.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    sort(...names) {
        for (let name of names) {
            if (name.indexOf('-') === 0 && this.sortParts.has(name.slice(1))) {
                this.sortParts.delete(name.slice(1));
            } else if(this.sortParts.has(`-${name}`)) {
                this.sortParts.delete(`-${name}`);
            }

            this.sortParts.add(name);
        }

        return this;
    }

    /**
     * Добавляет свойство сортировки "по возрастанию".
     *
     * @param {string} name Имя элемента сортировки.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    asc(name) {
        if (this.sortParts.has(`-${name}`)) {
            this.sortParts.delete(`-${name}`);
        }

        this.sortParts.add(name);

        return this;
    }

    /**
     * Добавляет свойство сортировки "по убыванию".
     *
     * @param {string} name Имя свойства.
     *
     * @return {this} Экземпляр текущего объекта.
     */
    desc(name) {
        if (this.sortParts.has(name)) {
            this.sortParts.delete(name);
        }

        this.sortParts.add(`-${name}`);

        return this;
    }

    /**
     * Удаляет свойство параметра сортировки как "по возрастанию" так и "по убыванию".
     *
     * @param {string} name Имя свойства, без постфикса "-".
     *
     * @return {boolean} Удален ли элемент сортировки.
     */
    deletePartFromSorts(name) {
        if (this.sortParts.has(name)) {
            return this.sortParts.delete(name);
        } else if (this.sortParts.has(`-${name}`)) {
            return this.sortParts.delete(`-${name}`);
        }

        return false;
    }

    /**
     * Проверяет, определено ли свойство сортировки как "по возрастанию".
     *
     * @param {string} name Имя свойства.
     *
     * @return {boolean} Определено ли свойство сортировки как "по возрастанию".
     */
    isSortAscending(name) {
        return this.sortParts.has(name);
    }

    /**
     * Проверяет, определено ли свойство сортировки как "по убыванию".
     *
     * @param {string} name Имя свойства.
     *
     * @return {boolean} Определено ли свойство сортировки как "по убыванию".
     */
    isSortDescending(name) {
        return this.sortParts.has(`-${name}`);
    }
}