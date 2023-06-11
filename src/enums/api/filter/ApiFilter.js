/**
 * Перечисление условий для фильтрации записей по API.
 *
 * @type {{
 *      ILIKE: string,
 *      EQ: string,
 *      GTE: string,
 *      LTE: string,
 *      GT: string,
 *      LT: string,
 *      NEQ: string
 * }}
 */
export const API_FILTER = {
    ILIKE: 'ilike',
    EQ: 'eq', // =
    GTE: 'gte', // >=
    LTE: 'lte', // <=
    GT: 'gt', // >
    LT: 'lt', // <
    NEQ: 'neq', // !=
};