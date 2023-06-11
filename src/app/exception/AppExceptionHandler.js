/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { API_RESPONSE } from "@enums/api/response/ApiResponse";
import { Obj } from "@packages/helpers/object/Obj";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import { AppBootboxStore } from '@store/app/AppBootbox';

/**
 * Вспомогательные методы для обработки ошибок
 */
export class AppExceptionHandler {
    /**
     * Событие обработки статуса: 400
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onBadRequest = (exception) => {
        AppBootboxStore.alert(API_RESPONSE.MESSAGES.BAD_REQUEST);

        return null;
    }

    /**
     * Событие обработки статуса: 403
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onForbidden = (exception) => {
        AppBootboxStore.alert(API_RESPONSE.MESSAGES.FORBIDDEN);

        return null;
    }

    /**
     * Событие обработки статуса: 404
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onNotFound = (exception) => {
        AppBootboxStore.alert(API_RESPONSE.MESSAGES.NOT_FOUND);

        return null;
    }

    /**
     * Событие обработки статуса: 418
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onIAmTeapot = (exception) => {
        AppBootboxStore.alert(exception?.response?.data?.message || API_RESPONSE.MESSAGES.I_AM_TEAPOT);

        return null;
    }

    /**
     * Событие обработки статуса: 422
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onUnprocessableEntity = (exception) => {
        AppBootboxStore.alert(API_RESPONSE.MESSAGES.UNPROCESSABLE_ENTITY);

        return null;
    }

    /**
     * Событие обработки статуса: 500
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onInternalServer = (exception) => {
        AppBootboxStore.alert(API_RESPONSE.MESSAGES.INTERNAL_SERVER);

        return null;
    }

    /**
     * Событие исключения.
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    onThrowError = (exception) => {
        console.warn('Необработанная ошибка', exception);

        return null;
    }

    /**
     * Конструктор класса.
     *
     * @param {object} eventFns Функции события
     *
     * @return {this} Экземпляр текущего объекта.
     */
    fillEvents(eventFns = {}) {
        for (let [eventName, eventFn] of Object.entries(eventFns)) {
            if (Obj.isset(this, eventName)) {
                this[eventName] = eventFn;
            }
        }

        return this;
    }

    /**
     * Реализует централизованный вывод ошибок в консоль
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    handle(exception) {
        if (Obj.get(exception, 'isAxiosError', false)) {
            return this.handleAxiosException(exception);
        } else {
            return this.onThrowError(exception);
        }
    }

    /**
     * Обрабатывает исключение Axios.
     *
     * @param {object} exception Экземпляр исключения.
     *
     * @return {any} Результат обработки.
     */
    handleAxiosException(exception) {
        const responseStatus = Obj.fromNested(exception, ['response', 'status']);

        if (responseStatus === API_RESPONSE.STATUSES.BAD_REQUEST) {
            return this.onBadRequest(exception);
        }  else if (responseStatus === API_RESPONSE.STATUSES.FORBIDDEN) {
            return this.onForbidden(exception);
        } else if (responseStatus === API_RESPONSE.STATUSES.NOT_FOUND) {
            return this.onNotFound(exception);
        } else if (responseStatus === API_RESPONSE.STATUSES.I_AM_TEAPOT) {
            return this.onIAmTeapot(exception);
        } else if (responseStatus === API_RESPONSE.STATUSES.UNPROCESSABLE_ENTITY) {
            return this.onUnprocessableEntity();
        } else if (responseStatus === API_RESPONSE.STATUSES.INTERNAL_SERVER) {
            return this.onInternalServer(exception);
        } else {
            return this.onThrowError(exception);
        }
    }
}