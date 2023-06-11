import { makeAutoObservable } from "mobx";

/**
 * Состояние глобального алерта для вывода ошибок из запросов
 */
export class AppAlert {
    /**
     * Конструктор
     *
     * @constructor
     */
    constructor() {
        this.showAlert = false;
        this.alertMessage = '';
        this.confirmHandler = null;
        makeAutoObservable(this);

        this.reset = this.reset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setConfirmHandler = this.setConfirmHandler.bind(this);
    }

    /**
     * Открывает алерт
     *
     * @function
     *
     * @return {void}
     */
    show() {
        this.showAlert = true;
    }

    /**
     * Закрывает алерт
     *
     * @function
     *
     * @return {void}
     */
    hide() {
        this.showAlert = false;
    }

    /**
     * Переключает показ алерта
     *
     * @function
     *
     * @param {boolean} showAlert Флаг, сообщающий показывать ли алерт
     *
     * @return {void}
     */
    toggle(showAlert) {
        if (showAlert) {
            this.show();
        } else {
            this.hide();
        }
    }

    /**
     * Изменяет сообщение
     *
     * @function
     *
     * @param {string} message Сообщение
     *
     * @return {void}
     */
    setMessage(message) {
        this.alertMessage = message;
    }

    /**
     * Задает функцию, которая будет вызываться при клике на кнопку подтверждения в окне алерта
     *
     * @function
     *
     * @param {Function} confirmHandler Callback-функция
     *
     * @return {void}
     */
    setConfirmHandler(confirmHandler) {
        this.confirmHandler = confirmHandler;
    }

    /**
     * Сбрасывает состояние после скрытия алерта
     *
     * @function
     *
     * @return {void}
     */
    reset() {
        this.alertMessage = '';
        this.confirmHandler = null;
    }
}

/**
 * Экземпляр хранилища глобального алерта
 *
 * @type {AppAlert}
 */
export const AppAlertStore = new AppAlert();