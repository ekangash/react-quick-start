/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Outlet } from "react-router-dom";

/** 4 Components, Hooks - Custom */
import { TemplateLayoutHeader } from "@layout/template/layout/header/TemplateHeader";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Шаблон страницы с макетами
 *
 * @returns {JSX.Element}
 */
export const TemplateLayout = () => {
    return (
        <section>
            <TemplateLayoutHeader className={['mb-3']} />
            <section className="container-fluid">
                <Outlet />
            </section>
        </section>
    );
};

TemplateLayout.propTypes = {};
TemplateLayout.defaultProps = {};