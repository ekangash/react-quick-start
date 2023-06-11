/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@app/routers/fallback/AppRoutersFallback.scss';

/**
 * Лоадер для ожидания получения динамических импортов
 *
 * @return {JSX.Element} DOM-элемент
 */
export const AppRoutersFallback = () => {
    return (
        <div className='fallback-loader'/>
    );
};

AppRoutersFallback.propTypes = {};
AppRoutersFallback.defaultProps = {};