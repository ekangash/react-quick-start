/** 1 NodeModules */
import * as npmYup from "yup";

/** 2 Config, Packages, Endpoints, Enums */
import { YupCustomDateSchema, YupCustomNumberSchema, YupSchemaWithNullableValues } from "@config/yup/YupCustomSchemas";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Кастомный объект yup
 *
 * @type {object}
 */
export const yup = {
    ...npmYup,
    number: YupCustomNumberSchema,
    date: YupCustomDateSchema,
    string: YupSchemaWithNullableValues('StringSchema'),
    mixed: YupSchemaWithNullableValues('MixedSchema'),
    boolean: YupSchemaWithNullableValues('BooleanSchema'),
    array: YupSchemaWithNullableValues('ArraySchema'),
}