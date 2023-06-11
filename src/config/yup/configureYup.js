/** 1 NodeModules */
import * as npmYup from 'yup';

/** 2 Config, Packages, Endpoints, Enums */
import { yup } from '@config/yup/yup';
import { YupLocale } from "@config/yup/YupLocale";
import {
    yupClientValidationMethod, yupCyrillicValidationMethod, yupLatinValidationMethod, yupServerValidationMethod,
} from "@config/yup/YupValidationMethods";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Инициализация конфига для yup
 *
 * @return {void}
 */
export const configureYup = () => {
    // Задает локаль для сообщений валидации yup
    yup.setLocale(YupLocale);

    // Добавляет кастомные методы валидации к yup
    yup.addMethod(npmYup.mixed, 'clientValidation', yupClientValidationMethod);
    yup.addMethod(npmYup.mixed, 'serverValidation', yupServerValidationMethod);
    yup.addMethod(npmYup.string, 'cyrillic', yupCyrillicValidationMethod);
    yup.addMethod(npmYup.string, 'latin', yupLatinValidationMethod);
};