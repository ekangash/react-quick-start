/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { configureYup } from '@config/yup/configureYup';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Конфигурирует приложение.
 *
 * @return {void}
 */
export const configureApplication = () => {
    configureYup();
}