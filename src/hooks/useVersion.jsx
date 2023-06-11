/** 1 NodeModules */
import { useReducer } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Действие изменения
 *
 * @type {number}
 */
export const ACTION_CHANGE = 1;

/**
 * Редюсер
 *
 * @param {object} state Состояние
 * @param {object} [payload={}] Полезная нагрузка
 *
 * @return {object} Состояние
 */
const reducer = (state, { payload = {} }) => {
    return { ...state, ...payload };
};

/**
 * Создает состояние через редюсер с версией
 * Использовать для работы с коллекциями и данными
 *
 * @param {object} [initReducer={}] Объект для инициализации редюсера
 *
 * @return {{ methods: object<Function> }}
 */
export const useVersion = (initReducer= {}) => {
    const [state, dispatch] = useReducer(reducer, { version: 0, ...initReducer });

    /**
     * Действия редюсера
     *
     * @type {{
     *      nextVersion: actions.nextVersion,
     *      changePayload: actions.changePayload
     * }}
     */
    const methods = {
        /**
         * Изменяет полезную нагрузку состояния
         *
         * @param {object} [payload={}] Полезная нагрузка
         *
         * @return {void}
         */
        changePayload: (payload = {}) => {
            dispatch({ type: ACTION_CHANGE, payload });
        },

        /**
         * Задает следующую версию и вызывает принудительный перерендер
         *
         * @return {void}
         */
        nextVersion: () => {
            dispatch({ type: ACTION_CHANGE, payload: { version: state.version + 1 } });
        },
    };

    return { methods, state, dispatch };
};