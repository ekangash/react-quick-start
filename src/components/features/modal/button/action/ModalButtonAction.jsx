/** 1 NodeModules */
import React from "react";
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from 'react-bootstrap';

/** 4 Components, Hooks - Custom */
import { useModalContext } from "@features/modal/context/ModalContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Кнопка с модальным окном
 *
 * @param {Function} [onClick=null] Callback-функция, срабатывающая при клике на кнопку открытия модального окна
 * @param {JSX.Element[]|JSX.Element} [children='Сохранить'] Дочерние элементы модального окна
 * @param {object} [buttonProps={}] Пропсы модального окна
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalButtonAction = ({ onClick, children, ...buttonProps }) => {
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
    const onActionBtnClick = (event) => {
        if (Func.assert(onClick)) {
            onClick(context, event);
        }
    };

    return (
        <Button
            variant="primary"
            size="sm"
            onClick={onActionBtnClick}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

ModalButtonAction.propTypes = {
    onClick: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
        propTypes.instanceOf(null),
    ]),
};

ModalButtonAction.defaultProps = {
    onClick: null,
    children: 'Сохранить',
};