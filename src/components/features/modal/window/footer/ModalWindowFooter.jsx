/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { ModalFooter as ModalFooterBootstrap } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Футер модального окна
 *
 * @param {JSX.Element[]|JSX.Element|string|null} [children=null] Дочерний элемент
 * @param {object} [footerProps={}] Остальные пропсы для футера
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ModalWindowFooter = ({ children, ...footerProps }) => {

    return (
        <ModalFooterBootstrap {...footerProps}>
            {children}
        </ModalFooterBootstrap>
    );
};

ModalWindowFooter.propTypes = {
    children: propTypes.node,
};

ModalWindowFooter.defaultProps = {
    children: null
};