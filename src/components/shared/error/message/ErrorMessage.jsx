/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Сообщение об ошибке.
 *
 * @param {!(string|number)} badge Бейджик.
 * @param {!string} children Сообщение об ошибке.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ErrorMessage = ({ badge, children }) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
                {badge}
            </h1>
            <div className="inline-block align-middle">
                <h2 className="font-weight-normal lead">
                    {children}
                </h2>
            </div>
        </div>
    );
};

ErrorMessage.propTypes = {
    badge: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    children: propTypes.string.isRequired,
};
ErrorMessage.defaultProps = {};