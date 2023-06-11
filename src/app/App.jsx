/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { configureApplication } from "@config/configureApplication";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { AppRouters } from "@app/routers/AppRouters";
import { AppBootbox } from "@app/bootbox/AppBootbox";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Конфигурирует приложение/модули/пакеты приложения.
 */
configureApplication();

/**
 * Точка входа приложения.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const App = () => {

    return (
        <>
            <AppRouters />
            <AppBootbox />
        </>
    );
};

App.propTypes = {};
App.defaultProps = {};


/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */