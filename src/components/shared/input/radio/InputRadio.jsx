/** 1 NodeModules */
import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Радиокнопка
 *
 * @param {boolean} [selected=false] Флаг отображающий, выбрана ли радиокнопка
 * @param {Function} [onChange=() => null] Обрабатывает изменение
 * @param {string[]} [className=[]] Массив классов
 * @param {string} [name=''] Имя радиокнопки (должно быть общим для одной радиогруппы)
 *
 * @return {JSX.Element} DOM-элемент
 */
export const InputRadio = ({ selected, onChange, className, name }) => {
    const [selectedRadio, setSelectedRadio] = useState(selected);

    useEffect(() => {
        if (selected !== selectedRadio) {
            setSelectedRadio(selected);
        }
    }, [selected]);

    return (
        <input
            className={classNames(...className)}
            onChange={(event) => {
                setSelectedRadio(!selectedRadio);
                onChange(!selectedRadio, event);
            }}
            name={name}
            type="radio"
            value=""
            checked={selectedRadio}
        />
    );
};

InputRadio.propTypes = {
    className: propTypes.array,
    onChange: propTypes.func,
    selected: propTypes.bool,
    name: propTypes.string,
};

InputRadio.defaultProps = {
    className: [],
    onChange: () => null,
    selected: false,
    name: '',
};