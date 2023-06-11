/** 1 NodeModules */
import React  from "react";
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from 'react-bootstrap';
import Icon from "@mdi/react";

/** 4 Components, Hooks - Custom */
import { useModalContext } from "@features/modal/context/ModalContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Кнопка с модальным окном
 *
 * @param {function} [onClick=null] Callback-функция, срабатывающая при клике на кнопку открытия модального окна
 * @param {React.ReactNode[]|React.ReactNode} [children=null] Дочерние элементы модального окна
 * @param {string} [path=null] Путь до иконки
 * @param {string|React.ReactNode} [as=Button] Тэг текущей кнопки.
 * @param {object} [buttonProps={}] Пропсы модального окна
 *
 * @return {React.ReactNode} DOM-элемент
 */
export const ModalButtonShow = ({ as: ButtonElement, onClick, children, path, ...buttonProps }) => {
    const context = useModalContext();

    /**
     * Обрабатывает клик на кнопку открытия модального окна
     *
     * @function
     *
     * @param {Event} event Событие клика
     *
     * @return {void}
     */
    const onOpenBtnClick = (event) => {
        if (Func.assert(onClick)) {
            onClick(context, event);

            return;
        }

        context.methods.setShow(true);
    };

    return (
        <ButtonElement
            onClick={onOpenBtnClick}
            {...(ButtonElement?.displayName === 'Button' ? { size: "sm" } : {})}
            {...buttonProps}
        >
            {path !== null && (
                <Icon path={path} size={0.8} />
            )}
            {children}
        </ButtonElement>
    );
};

ModalButtonShow.propTypes = {
    as: propTypes.oneOfType([propTypes.object, propTypes.string]).isRequired,
    onClick: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
        propTypes.instanceOf(null),
    ]),
    path: propTypes.oneOfType([
        propTypes.string,
        propTypes.instanceOf(null),
    ]),
};

ModalButtonShow.defaultProps = {
    onClick: null,
    children: null,
    path: null,
    as: Button,
};