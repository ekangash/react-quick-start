/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Локализация сообщений валидации для yup
 *
 * @type {object}
 */
export const YupLocale = {
    mixed: {
        required: ({ label }) => `Необходимо заполнить «${label}».`,
        notType: ({ type, label }) => {
            if (type === 'number') {
                return `Значение «${label}» должно быть числом.`;
            } else if (type === 'string') {
                return `Значение «${label}» должно быть строкой.`;
            } else if (type === 'date') {
                return 'Неверный формат даты.';
            } else if (type === 'boolean') {
                return `Значение «${label}» должно быть равно «Да» или «Нет».`;
            }
        },
        defined: 'Значение «${label}» должно быть определено.', // любое значение кроме undefined
        notRequired: 'Значение «${label}» не требуется заполнять.',
        oneOf: 'Значение «${label}» должно быть одним из ${values}',
        notOneOf: 'Недопустимое значение ${values} в «${label}»',

    },
    number: {
        integer: 'Значение «${label}» должно быть целым числом.',
        max: 'Значение «${label}» не должно превышать ${max}.',
        min: 'Значение «${label}» должно быть не меньше ${min}.',
        lessThan: 'Значение «${label}» должно быть меньше чем ${lessThan}.',
        moreThan: 'Значение «${label}» должно быть больше чем ${moreThan}.',
        positive: 'Значение «${label}» должно быть положительным.',
        negative: 'Значение «${label}» должно быть отрицательным.',
    },
    string: {
        length: 'Значение «${label}» должно содержать ${length} символов.',
        max: 'Значение «${label}» должно содержать максимум ${max} символов.',
        min: 'Значение «${label}» должно содержать минимум ${min} символов.',
        matches: 'Неверный формат значения «${label}».',
        email: 'Значение «${label}» не является правильным email адресом.',
        url: 'Значение «${label}» не является правильным URL.',
        cyrillic: 'Значение «${label}» может содержать только символы кириллицы!',
        latin: 'Значение «${label}» может содержать только символы латиницы!',
    },
    date: {
        max: 'Значение «${label}» не должно превышать ${max}.',
        min: 'Значение «${label}» должно быть не меньше ${min}.',
    },
    array: {
        length: 'Необходимо выбрать ${length} значений.',
        min: 'Необходимо выбрать не менее ${min} значений.',
        max: 'Необходимо выбрать не более ${max} значений.',
    },
};