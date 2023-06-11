/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Отображает DOM узлы по условию.
 *
 * @param {!boolean} condition Условие.
 * @param {!JSX.Element[]} children DOM узлы.
 *
 * @return {JSX.Element} DOM узлы.
 */
export const Apparent = ({condition, children}) => condition && children;

Apparent.propTypes = {
    children: propTypes.any.isRequired,
    condition: propTypes.bool.isRequired,
};

Apparent.defaultProps = {};