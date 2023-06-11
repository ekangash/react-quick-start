/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { NavLink } from "react-router-dom";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Лого прирожения
 *
 * @return {JSX.Element} DOM-элемент
 */
export const AppLogo = () => {

    return (
        <NavLink to="/" className="logo">
            <h1>АСТУП</h1>
        </NavLink>
    );
};

AppLogo.propTypes = {};
AppLogo.defaultProps = {};