/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Класс для правил заполнения сущности.
 *
 * @class EntityRules
 */
export class EntityRules {
    /**
     * Правила заполнения сущности.
     *
     * @return {object} Правила сущности.
     */
    rules() {
        return {};
    }

    /**
     * Возвращает значение правила.
     *
     * @param {string} name Имя правила.
     * @param {object|any[]} defaultValue Имя правила.
     *
     * @return {object} Правила сущности.
     */
    rule(name, defaultValue) {
        return Obj.get(this.rules(), name, defaultValue);
    }
}