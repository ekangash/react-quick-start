/** 1 NodeModules */
import React, { forwardRef } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Начальное значение нижнего паддинга контейнера
 *
 * @type {string}
 */
const INITIAL_PADDING = '200px';

/**
 * Контейнер контента нижней панели
 *
 * @param {!ReactNode} children Дочерние элементы
 * @param {!ForwardedRef} ref Объект контейнера
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const DrawerBottomContainer = forwardRef(({ children }, ref) =>  {
    return (
        <div
            className='d-flex bottom-drawer-container justify-content-between'
            ref={ref}
            style={{ paddingBottom: INITIAL_PADDING }}
        >
            {children}
        </div>

    );
});

DrawerBottomContainer.propTypes = {
    children: propTypes.node.isRequired,
};
DrawerBottomContainer.defaultProps = {};