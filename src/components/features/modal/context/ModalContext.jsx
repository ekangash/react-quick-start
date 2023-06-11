/** 1 NodeModules */
import React, { createContext, useContext } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Контекст модального окна
 *
 * @type {React.Context<null>}
 */
const HookModalContext = createContext({});

/**
 * Хук для получения данных контекста диалогового окна
 *
 * @return {object} Данные контекста диалогового окна
 */
export const useModalContext = () => useContext(HookModalContext);

/**
 * Провайдер контекста для диалогового окна
 *
 * @param {!JSX.Element[]} children DOM узлы
 * @param {object} value Значение контекста
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalProvider = ({ children, ...value }) => {
    return (
        <HookModalContext.Provider value={value}>
            {children}
        </HookModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: propTypes.node.isRequired,
    state: propTypes.object.isRequired,
    methods: propTypes.object.isRequired,
};

ModalProvider.defaultProps = {};