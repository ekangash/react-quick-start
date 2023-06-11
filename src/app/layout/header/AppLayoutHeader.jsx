/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */

/** 4 Components, Hooks, Icons - Custom */
import { AppLayoutHeaderNavbar } from '@app/layout/header/navbar/AppLayoutHeaderNavbar';

/** 5 Entities, Stores, Services */
/** 6 Resources */


/**
 * Шапка макета приложения
 *
 * @return {JSX.Element} Сформированный DOM узел.
 */
export const AppLayoutHeader = () => {

    return (
        <section>
            <AppLayoutHeaderNavbar/>
        </section>
    );
};

AppLayoutHeader.propTypes = {};
AppLayoutHeader.defaultProps = {};