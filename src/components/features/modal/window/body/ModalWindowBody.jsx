/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
import { ModalBody as ModalBodyBootstrap } from 'react-bootstrap';

/** 4 Components, Hooks - Custom */
import { useModalContext } from "@features/modal/context/ModalContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Тело модального окна
 *
 * @param {!(JSX.Element|string|array|function|null)} children Дочерний элемент
 * @param {object} [bodyProps={}] Остальные пропсы для тела модального окна
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalWindowBody = ({ children, ...bodyProps }) => {
    const context = useModalContext();

    return (
        <ModalBodyBootstrap { ...bodyProps }>
            { Func.assert(children) ? children(context) : children }
        </ModalBodyBootstrap>
    );
};

ModalWindowBody.propTypes = {
    children: propTypes.oneOfType([
        propTypes.node,
        propTypes.string,
        propTypes.func,
    ]).isRequired,
};

ModalWindowBody.defaultProps = {};