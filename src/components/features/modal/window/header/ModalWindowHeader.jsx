/** 1 NodeModules */
import React from 'react';
import propTypes from "prop-types";
import { observer } from "mobx-react-lite";

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
import { Modal as ModalBootstrap } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppModalStore } from "@store/app/AppModal";

/** 6 Resources */

/**
 * Заголовок модального окна
 *
 * @param {string} [title=''] Текст заголовка
 * @param {boolean} [closeButton=true] Показывать ли кнопку закрытия
 * @param {JSX.Element|string|array|null} [children=null] Дочерний элемент
 * @param {object} [headerProps={}] Остальные пропсы для шапки модального окна
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalWindowHeader = observer(({ title, closeButton, children, ...headerProps }) => {

    return (
        <ModalBootstrap.Header
            closeButton={closeButton}
            {...headerProps}
        >
            {Str.contains(title) && (
                <ModalBootstrap.Title
                    id={`modal-${AppModalStore.level}`}
                >
                    {title}
                </ModalBootstrap.Title>
            )}
            {children || null}
        </ModalBootstrap.Header>
    );
});

ModalWindowHeader.propTypes = {
    title: propTypes.string,
    closeButton: propTypes.bool,
    children: propTypes.oneOfType([
        propTypes.node,
        propTypes.instanceOf(null),
    ]),
};

ModalWindowHeader.defaultProps = {
    title: '',
    closeButton: true,
    children: null,
};