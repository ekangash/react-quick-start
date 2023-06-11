/** 1 NodeModules */
import React from "react";
import { makeObservable, observable, action } from "mobx";

/** 2 Config, Packages, Endpoints, Enums */
import { APP_BOOTBOX_MODAL_TYPES } from '@enums/app/bootbox/AppBootbox';

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Менеджер состояния компонента 'AppBootbox'.
 */
export class AppBootbox {
    /**
     * Состояние отображаемого окна.
     *
     * @type {boolean}
     */
    show = false
    /**
     * Тип бутбокса
     *
     * @type {string}
     */
    bootboxType = ''
    /**
     * Содержимое отображаемое в контекст окна.
     *
     * @type {string|React.ReactNode}
     */
    content = ''
    /**
     * Иконка, отображаемая рядом с текстом
     *
     * @type {string}
     */
    type = ''
    /**
     * Функция вызова после подтверждения.
     *
     * @type {function|null}
     */
    whenConfirmed = null
    /**
     * Функция вызова после отмены.
     *
     * @type {function|null}
     */
    whenRejected = null
    /**
     * Функция вызова после согласия.
     *
     * @type {function|null}
     */
    whenAgree = null
    /**
     * Дополнительные опции для бутбокса по умолчанию
     *
     * @type {object}
     */
    defaultOptions = {
        size: 'md',
    }
    /**
     * Дополнительные опции для бутбокса
     *
     * @type {object}
     */
    options = this.defaultOptions;

    /**
     * Конструктор
     *
     * @constructor
     */
    constructor() {
        makeObservable(this, {
            show: observable,
            alert: action,
            confirm: action,
            hide: action,
        });
    }

    /**
     * Изменяет объект дополнительных опций опций
     *
     * @function
     *
     * @param {object} options Дополнительные опции
     *
     * @return {void}
     */
    changeOptions(options) {
        this.options = {
            ...this.defaultOptions,
            ...options,
        };
    }

    /**
     * Сбрасывает состояние после скрытия алерта
     *
     * @return {void}
     */
    hide() {
        this.content = '';
        this.whenConfirmed = null;
        this.whenRejected = null;
        this.whenAgree = null;
        this.type = '';
        this.show = false;
        this.changeOptions({});
        this.bootboxType = '';
    }

    /**
     * Показывает всплывающее окно алерта
     *
     * @function
     *
     * @param {string|JSX.Element|number} content Сообщение
     * @param {string} type Тип сообщения
     * @param {Function} [whenAgree = null] Функция, вызываемая при подтверждении
     * @param {object} [options = {}] Дополнительные опции
     *
     * @return {void}
     */
    alert(content, type,  whenAgree = null, options = {}) {
        this.content = content;
        this.type = type;
        this.whenAgree = whenAgree;
        this.show = true;
        this.changeOptions(options);
        this.bootboxType = APP_BOOTBOX_MODAL_TYPES.ALERT;
    }

    /**
     * Показывает всплывающее окно prompt
     *
     * @function
     *
     * @param {Function} whenConfirmed Callback-функция
     * @param {object} [options = {}] Дополнительные опции
     *
     * @return {void}
     */
    prompt(whenConfirmed, options = {}) {
        this.whenConfirmed = whenConfirmed;
        this.changeOptions(options);
        this.bootboxType = APP_BOOTBOX_MODAL_TYPES.PROMPT;
    }

    /**
     * Показывает всплывающее окно confirm
     *
     * @function
     *
     * @param {string|JSX.Element|number} content Содержимое
     * @param {Function|null} [whenConfirmed = null] Функция, вызываемая при подтверждении
     * @param {Function|null} [whenRejected = null] Функция, вызываемая при отклонении
     * @param {string} [type = ''] Тип сообщения
     * @param {object} [options = {}] Дополнительные опции
     *
     * @return {void}
     */
    confirm(content, whenConfirmed = null, whenRejected = null, type= '', options = {}) {
        this.content = content;
        this.whenConfirmed = whenConfirmed;
        this.whenRejected = whenRejected;
        this.show = true;
        this.type = type;
        this.changeOptions(options);
        this.bootboxType = APP_BOOTBOX_MODAL_TYPES.CONFIRM;
    }
}

/**
 * Экземпляр хранилища глобального алерта
 *
 * @type {AppBootbox}
 */
export const AppBootboxStore = new AppBootbox();