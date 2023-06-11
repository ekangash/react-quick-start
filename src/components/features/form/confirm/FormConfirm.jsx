/** 1 NodeModules */
import React, { useCallback, useContext, useEffect, useState } from "react";
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { MESSAGES } from '@enums/common/Messages';

/** 3 Components, Hooks, Icons - NodeModules */
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppBootboxStore } from '@store/app/AppBootbox';

/** 6 Resources */

/**
 * Значение состояния окна предупреждения по умолчанию
 *
 * @type {{cancel: Function, proceed: Function, isActive: boolean}}
 */
const initialConfirmState = {
    isActive: false,
    proceed: () => {},
    cancel: () => {},
};

/**
 * Рендерит предупреждение о переходе на другую страницу
 *
 * @param {boolean} showPrompt Показывать ли предупреждение при уходе со страницы
 * @param {string} message Сообщение
 *
 * @return {null}
 */
export const FormConfirm = ({ showPrompt, message }) => {
    const { navigator } = useContext(NavigationContext);
    const [confirm, setConfirm] = useState(initialConfirmState);

    /**
     * Сбрасывает состояние всплывающего предупреждения
     *
     * @return {void}
     */
    const resetConfirmation = useCallback(() => {
        setConfirm(initialConfirmState);
    }, []);

    /**
     * Разрешает промис в окне предупреждения
     *
     * @param {boolean} promiseValue Разрешен ли промис
     *
     * @return {boolean} Разрешен ли промис
     */
    const changePromptResolve = useCallback((promiseValue) => {
        resetConfirmation();

        return promiseValue;
    }, [resetConfirmation]);

    /**
     * Обрабатывает клик на кнопку подтверждения в окне предупреждения и делает переход по маршруту
     *
     * @return {Promise<boolean>} Промис нажатия на кнопку подтверждения
     */
    const onConfirm = useCallback(() => {
        const prompt = new Promise((resolve, reject) => {
            if (showPrompt) {
                setConfirm((prevState) => ({
                    ...prevState,
                    isActive: true,
                    proceed: resolve,
                    cancel: reject,
                }));
            } else {
                resolve(true);
            }
        });

        return prompt.then(() => changePromptResolve(true), () => changePromptResolve(false));
    }, [showPrompt, changePromptResolve]);

    /**
     * Блокирует переход по ссылке
     *
     * @param {{action: string, location: object, retry: Function}} navigationParams Параметры перехода страницы
     *
     * @return {Promise<void>} Промис результата клика на кнопку подтверждения в окне предупреждения
     */
    const blocker = useCallback(async (navigationParams) => {
        const result = await onConfirm(navigationParams);

        if (result) {
            resetConfirmation();
            navigationParams.retry();
        }
    }, [onConfirm, resetConfirmation]);


    useEffect(() => {
        if (!showPrompt) {
            return;
        }

        /**
         * Разблокирует навигацию при размонтировании элемента
         *
         * @param {{action: string, location: object, retry: Function}} navigationParams Параметры перехода страницы
         *
         * @return {void}
         */
        const unblockNavigation = navigator.block((navigationParams) => {
            const autoUnblockingNavigation = {
                ...navigationParams,
                retry() {
                    unblockNavigation();
                    navigationParams.retry();
                },
            };

            blocker(autoUnblockingNavigation);
        });

        return () => {
            if (showPrompt) {
                unblockNavigation();
            }
        };
    }, [showPrompt, navigator, blocker]);

    useEffect(() => {
        if (confirm.isActive) {
            AppBootboxStore.confirm(message, confirm.proceed, confirm.cancel);
        }
    }, [confirm]);

    return null;
};

FormConfirm.propTypes = {
    showPrompt: propTypes.bool.isRequired,
    message: propTypes.string,
};
FormConfirm.defaultProps = {
    message: MESSAGES.FORM_CHANGED_BEFORE_CLOSE,
};