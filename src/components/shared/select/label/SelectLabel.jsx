/** 1 NodeModules */
import React from 'react';
import propTypes from "prop-types";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Метка селекта
 *
 * @param {!string} text Текст метки
 * @param {string} [className=''] Класс компонента
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectLabel = ({ text , className  }) => {

    return text.length > 0 ? (
        <label className={`form-label ${className}`}>{text}</label>
    ) : '';
};

SelectLabel.propTypes = {
    text: propTypes.string.isRequired,
    className: propTypes.string,
};

SelectLabel.defaultProps = {
    className: '',
};