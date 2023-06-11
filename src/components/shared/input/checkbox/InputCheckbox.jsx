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
 * Чекбокс
 *
 * @param {boolean} [checked=false] Выбран ли чекбокс
 * @param {Function} [onChange=() => null] Обрабатывает изменение
 * @param {string[]} [className=[]] Массив классов
 *
 * @return {JSX.Element} DOM-элемент
 */
export const InputCheckbox = ({ checked, onChange, className }) => {
    const [checkedCheckbox, setCheckedCheckbox] = useState(checked);

    useEffect(() => {
        if (checked !== checkedCheckbox) {
            setCheckedCheckbox(checked);
        }
    }, [checked]);

    return (
        <input
            className={classNames(...className)}
            onChange={(event) => {
                setCheckedCheckbox(!checkedCheckbox);
                onChange(!checkedCheckbox, event);
            }}
            type="checkbox"
            value=""
            checked={checkedCheckbox}
        />
    );
};

InputCheckbox.propTypes = {
    className: propTypes.array,
    onChange: propTypes.func,
    checked: propTypes.bool,
};

InputCheckbox.defaultProps = {
    className: [],
    onChange: () => null,
    checked: false,
};