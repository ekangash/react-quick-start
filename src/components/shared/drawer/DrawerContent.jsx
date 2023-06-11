/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */


/**
 * Контейнер контента
 *
 * @param {!React.ReactNode} children Дочерние элементы
 * @param {string[]} [className=[]] Имена классов.
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const DrawerContent = ({ children, className }) => {

    return (
        <div className={classNames('drawer-content', ...className)}>
            {children}
        </div>

    );
};

DrawerContent.propTypes = {
    children: propTypes.node.isRequired,
    className: propTypes.array,
};
DrawerContent.defaultProps = {
    className: [],
};