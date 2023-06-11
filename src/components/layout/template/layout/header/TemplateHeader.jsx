/** 1 NodeModules */
import React from 'react';
import propTypes from "prop-types";
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Навигация по странице с шаблонами
 *
 * @param {string[]} [className=[]] Массив классов
 *
 * @returns {JSX.Element} Навигация по странице с шаблонами
 */
export const TemplateLayoutHeader = ({ className }) => {
    return (
        <nav className={classNames('navbar navbar-light bg-light', ...className)}>
            <div className="flex align-items-center">
                <Button
                    as={NavLink}
                    variant="light"
                    to="/template"
                >
                    Templates
                </Button>
                <Button
                    as={NavLink}
                    variant="light"
                    to="/template/form"
                    className="ml-2"
                >
                    Form
                </Button>
                <Button
                    as={NavLink}
                    variant='light'
                    to='/template/modal'
                    className='ml-2'
                >
                    Modal
                </Button>
                <Button
                    as={NavLink}
                    variant="light"
                    to="/template/select"
                    className="ml-2"
                >
                    Select
                </Button>
                <Button
                    as={NavLink}
                    variant="light"
                    to="/template/table"
                    className="ml-2"
                >
                    Table
                </Button>
            </div>
        </nav>
    );
};

TemplateLayoutHeader.propTypes = {
    className: propTypes.array,
};

TemplateLayoutHeader.defaultProps = {
    className: [],
};