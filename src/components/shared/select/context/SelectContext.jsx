/** 1 NodeModules */
import React from "react";
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Контекст селекта
 *
 * @type {React.Context<null>}
 */
const HookSelectContext = React.createContext({});

/**
 * Хук для получения данных контекста селекта
 *
 * @return {object} Данные контекста селекта
 */
export const useSelectContext = () => React.useContext(HookSelectContext);

/**
 * Провайдер данных для селекта
 *
 * @param {!JSX.Element[]} children DOM узлы
 * @param {object} value Значение контекста
 *
 * @return {JSX.Element} DOM узлы
 */
export const SelectProvider = ({ children, ...value }) => {
    return (
        <HookSelectContext.Provider value={value}>
            {children}
        </HookSelectContext.Provider>
    );
};

SelectProvider.propTypes = {
    children: propTypes.oneOfType([propTypes.element, propTypes.arrayOf(propTypes.element)]).isRequired,
    options: propTypes.arrayOf(propTypes.object).isRequired,
    filteredOptions: propTypes.arrayOf(propTypes.object).isRequired,
    selectedOptions: propTypes.arrayOf(propTypes.object).isRequired,
    inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    settings: propTypes.object,
    listVisibility: propTypes.bool.isRequired,
    actions: propTypes.object.isRequired,
};

SelectProvider.defaultProps = {};