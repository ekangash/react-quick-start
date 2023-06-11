/** 1 NodeModules */
import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';
import classNames from "classnames";
import { observer } from 'mobx-react-lite';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";
import { MESSAGES } from '@enums/common/Messages';

/** 3 Components, Hooks, Icons - NodeModules */
import { Modal as ModalBootstrap } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { useModalContext } from "@features/modal/context/ModalContext";

/** 5 Entities, Stores, Services */
import { AppModalStore } from "@store/app/AppModal";
import { AppBootboxStore } from '@store/app/AppBootbox';

/** 6 Resources */

/**
 * Значение z-index-а по умолчанию модального окна bootstrap
 *
 * @type {number}
 */
const BOOTSTRAP_MODAL_Z_INDEX = 1050;

/**
 * Модальное окно с возможностью вложенности
 *
 * @param {!(JSX.Element|string|array|null)} children Дочерний элемент
 * @param {boolean} [isModalLoading=false] Ожидает ли выполнения запроса
 * @param {string} [loadingMessage=''] Сообщение, отображаемое при выполнении запросов
 * @param {boolean} [centered=true] Флаг, сообщающий размещать ли модальное окно по центру
 * @param {boolean} [scrollable=true] Добавлять ли полосы прокрутки
 * @param {Function} [onExit=null] Функция-обработчик, запускаемая перед началом закрытия
 * @param {Function} [onEntered=null] Функция-обработчик, запускаемая после полного открытия
 * @param {string} [backdropClassName=''] Класс backdrop-а
 * @param {string} [contentClassName=''] Класс контента
 * @param {string} [dialogClassName=''] Класс диалога
 * @param {string|boolean} [backdrop=true] Параметр отображения backdrop-а
 * @param {Function} [onHide=null] Callback-функция выполняющаяся при клике на кнопку закрытия модального окна
 * @param {object} [otherProps={}] Остальные пропсы
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalWindow = observer(({
    children,
    isModalLoading,
    loadingMessage,
    centered,
    scrollable,
    onExit,
    onEntered,
    backdropClassName,
    contentClassName,
    dialogClassName,
    backdrop,
    onHide,
    ...otherProps
}) => {
    const context = useModalContext();
    const [modalLevel, setModalLevel] = useState(() => AppModalStore.level + 1);
    const loadingClass = classNames({'modal-loading': isModalLoading});

    /**
     * Обрабатывает событие полного открытия модального окна
     *
     * @function
     *
     * @param {Event} event Событие полного открытия модального окна
     *
     * @return {void}
     */
    const onWindowEntered = (event) => {
        if (Func.assert(onEntered)) {
            onEntered(context, event);
        }

        AppModalStore.incrementLevel();
        setModalLevel(AppModalStore.level);
    };

    /**
     * Обрабатывает событие, когда модальное окно начало закрываться
     *
     * @function
     *
     * @param {Event} event Событие закрытия модального окна
     *
     * @return {void}
     */
    const onExitHandler = (event) => {
        if (Func.assert(onExit)) {
            onExit(context, event);
        }

        AppModalStore.decrementLevel();
    };

    /**
     * Обрабатывает закрытие модального окна
     *
     * @function
     *
     * @return {void}
     */
    const onWindowHide = () => {
        let ModalOnHideCallbacks = context.methods.getModalOnHideCallbacks();

        for (let modalOnHideCallback of ModalOnHideCallbacks) {
            if (!modalOnHideCallback()) {
                AppBootboxStore.confirm(MESSAGES.FORM_CHANGED_BEFORE_CLOSE, () => context.methods.setShow(false));

                return;
            }
        }

        if (Func.assert(onHide)) {
            onHide(context);

            return;
        }

        context.methods.setShow(false);
    };

    useEffect(() => {
        context.methods.setOnHideHandler(onWindowHide);
    }, []);

    return (
        <ModalBootstrap
            show={context.state.show}
            centered={centered}
            style={{zIndex: BOOTSTRAP_MODAL_Z_INDEX * modalLevel}}
            backdropClassName={classNames('stackable-modal__backdrop', `modal-backdrop-${modalLevel}`, backdropClassName)}
            contentClassName={`${loadingClass} ${contentClassName}`}
            dialogClassName={`${loadingClass} ${dialogClassName}`}
            aria-labelledby={`modal-${modalLevel}`}
            scrollable={scrollable}
            data-message={loadingMessage}
            onExit={onExitHandler}
            onEntered={onWindowEntered}
            onHide={onWindowHide}
            backdrop={backdrop}
            {...otherProps}
        >
            { Func.assert(children) ? children(context) : children }
        </ModalBootstrap>
    );
});

ModalWindow.propTypes = {
    children: propTypes.oneOfType([
        propTypes.node,
        propTypes.string,
        propTypes.func,
        propTypes.number
    ]).isRequired,
    scrollable: propTypes.bool,
    centered: propTypes.bool,
    isModalLoading: propTypes.bool,
    loadingMessage: propTypes.string,
    onExit: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    onEntered: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    backdropClassName: propTypes.string,
    contentClassName: propTypes.string,
    dialogClassName: propTypes.string,
    onHide: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    backdrop: propTypes.oneOfType([propTypes.string, propTypes.bool]),
};

ModalWindow.defaultProps = {
    scrollable: true,
    centered: true,
    isModalLoading: false,
    loadingMessage: '',
    onExit: null,
    onEntered: null,
    backdropClassName: '',
    contentClassName: '',
    dialogClassName: '',
    onHide: null,
    backdrop: true,
};