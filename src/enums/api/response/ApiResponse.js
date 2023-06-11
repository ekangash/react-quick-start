/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * HTTP константы приложения.
 *
 * @type {object}
 */
export const API_RESPONSE = {
    STATUSES: {
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        I_AM_TEAPOT: 418,
        UNPROCESSABLE_ENTITY: 422,
        INTERNAL_SERVER: 500
    },
    MESSAGES: {
        BAD_REQUEST: 'Некорректно сформированные данные. Попробуйте ещё раз!',
        FORBIDDEN:'Доступ к ресурсу запрещён.',
        NOT_FOUND: 'Запрошенная вами страница не была найдена.',
        I_AM_TEAPOT: 'Неизвестная ошибка сервера. Попробуйте ещё раз или обратитесь к системному администратору!',
        UNPROCESSABLE_ENTITY: 'Не пройдена серверная валидация.',
        INTERNAL_SERVER: 'Ошибка сервера! Попробуйте ещё раз или обратитесь к системному администратору!',
    }
}