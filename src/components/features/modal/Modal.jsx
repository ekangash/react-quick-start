/** 1 NodeModules */
import React, { useEffect, useMemo } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { ModalFormProvider } from '@features/modal/form/provider/ModalFormProvider';
import { ModalButtonClose } from '@features/modal/button/close/ModalButtonClose';
import { ModalButtonShow } from '@features/modal/button/show/ModalButtonShow';
import { ModalButtonAction } from '@features/modal/button/action/ModalButtonAction';
import { ModalProvider } from '@features/modal/context/ModalContext';
import { ModalWindow } from '@features/modal/window/ModalWindow';
import { ModalWindowBody } from '@features/modal/window/body/ModalWindowBody';
import { ModalWindowHeader } from '@features/modal/window/header/ModalWindowHeader';
import { ModalWindowFooter } from '@features/modal/window/footer/ModalWindowFooter';
import { ModalPreloader } from '@features/modal/preloader/ModalPreloader';

import { useVersion, ACTION_CHANGE } from '@hooks/useVersion';
import { useConst } from '@hooks/useConst';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/modal/Modal.scss';

/**
 * Модальное окно
 *
 * @param {boolean} [show=false] Состояние отображения диалогового окна.
 * @param {!(JSX.Element|string|array|null)} children Дочерний элемент
 *
 * @return {JSX.Element} DOM-элемент
 */
export const Modal = ({ show: showStateProp, children }) => {
    const { state, methods, dispatch } = useVersion({ show: showStateProp, onHideHandler: () => {} });
    const modalOnHideCallbacks = useConst(() => new Set());

    let modalMethods = useMemo(() => ({
        ...methods,
        /**
         * Устанавливает состояние отображения формы.
         *
         * @param {boolean} showState Флаг отображения модального окна
         *
         * @return {void}
         */
        setShow: (showState) => {
            dispatch({ type: ACTION_CHANGE, payload: { show: showState } });
        },
        /**
         * Задает в контекст callback, вызываемый при закрытии модального окна
         *
         * @param {Function} onHideCallback Callback, вызываемый при закрытии модального окна
         *
         * @return {void}
         */
        setOnHideHandler: (onHideCallback) => {
            dispatch({ type: ACTION_CHANGE, payload: { onHideHandler: onHideCallback } });
        },
        /**
         * Возвращает множество callback-функций, вызываемых при закритии модального окна
         *
         * @return {Set<Function>}
         */
        getModalOnHideCallbacks: () => modalOnHideCallbacks,
    }), [modalOnHideCallbacks]);

    useEffect(() => {
        if (state.show !== showStateProp) {
            modalMethods.setShow(showStateProp);
        }
    }, [showStateProp]);

    return (
        <ModalProvider
            state={state}
            methods={modalMethods}
        >
            {children}
        </ModalProvider>
    );
};

Modal.propTypes = {
    children: propTypes.oneOfType([
        propTypes.element, propTypes.arrayOf(propTypes.element),
        propTypes.string, propTypes.number
    ]).isRequired,
    show: propTypes.bool
};

Modal.defaultProps = {
    show: false,
};

Modal.FormProvider = (props) => <ModalFormProvider {...props}/>;
Modal.ButtonShow = (props) => <ModalButtonShow {...props}/>;
Modal.ButtonClose = (props) => <ModalButtonClose {...props}/>;
Modal.ButtonAction = (props) => <ModalButtonAction {...props}/>;
Modal.Window = (props) => <ModalWindow {...props}/>;
Modal.WindowHeader = (props) => <ModalWindowHeader {...props}/>;
Modal.WindowFooter = (props) => <ModalWindowFooter {...props}/>;
Modal.WindowBody = (props) => <ModalWindowBody {...props}/>;
Modal.Preloader = (props) => <ModalPreloader {...props}/>;