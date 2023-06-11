/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { API_RESPONSE } from "@enums/api/response/ApiResponse";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { ErrorMessage } from "@shared/error/message/ErrorMessage";

/** 5 Entities, Stores, Services */
/** 6 Resources */


/**
 * Неизвестная страница
 *
 * @return {JSX.Element} DOM-элемент
 */
export const NotFoundPage = () => {
    return (
        <ErrorMessage
            badge={API_RESPONSE.STATUSES.NOT_FOUND}
        >
            {API_RESPONSE.MESSAGES.NOT_FOUND}
        </ErrorMessage>
    );
};

NotFoundPage.propTypes = {};
NotFoundPage.defaultProps = {};