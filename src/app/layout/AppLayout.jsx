/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Outlet } from "react-router-dom";

/** 4 Components, Hooks - Custom */
import { AppLayoutHeader } from "@app/layout/header/AppLayoutHeader";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Макет приложения
 *
 * @return {JSX.Element} Сформированный DOM узел
 */
export const AppLayout = () => {

    return (
        <>
            <AppLayoutHeader />
            <section className="container-fluid">
                <Outlet />
            </section>
        </>
    );
};

AppLayout.propTypes = {};
AppLayout.defaultProps = {};