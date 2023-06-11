/** 1 NodeModules */
import React  from "react";
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
 * @param {JSX.Element[]|JSX.Element} [children='Закрыть'] Дочерние элементы модального окна
 * @param {object} [buttonProps={}] Пропсы модального окна
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalButtonClose = ({ onClick, children, ...buttonProps }) => {
    const context = useModalContext();

    /**
     * Обрабатывает событие клика на secondary кнопку
     *
     * @function
     *
     * @param {Event} event Событие клика
     *
     * @return {void}
     */
    const onCloseBtnClick = (event) => {
        if (Func.assert(onClick)) {
            onClick(context, event);

            return;
        }

        if (Func.assert(context.state.onHideHandler)) {
            context.state.onHideHandler();

            return;
        }

        context.methods.setShow(false);
    };

    return (
        <Button
            onClick={onCloseBtnClick}
            variant="btn btn-outline-secondary"
            size="sm"
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

ModalButtonClose.propTypes = {
    onClick: propTypes.oneOfType([propTypes.func, propTypes.instanceOf(null)]),
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
        propTypes.instanceOf(null),
    ]),
};

ModalButtonClose.defaultProps = {
    onClick: null,
    children: 'Закрыть',
};