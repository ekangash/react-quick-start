/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';

/** 4 Components, Hooks, Icons - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@app/layout/header/navbar/AppLayoutHeaderNavbar.scss'


/**
 * Шапка макета приложения
 *
 * @return {JSX.Element} Сформированный DOM узел.
 */
export const AppLayoutHeaderNavbar = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg='dark navbar-dark' className='navbar-react'>
            <div className='d-flex align-items-center w-100'>

                <Nav>
                    <Nav.Link className='d-flex align-items-center align-self-center' as={NavLink} to="/">ReactQuickStart</Nav.Link>
                    <Nav.Link className='d-flex align-items-center align-self-center' as={NavLink} to="/template">Макеты</Nav.Link>
                </Nav>
            </div>
            <div className='d-flex justify-content-end w-100'>
                <Nav>
                    <Nav.Link className='d-flex align-items-center align-self-center' href="#"><Icon path={mdiCog} size={1} /></Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
};

AppLayoutHeaderNavbar.propTypes = {};
AppLayoutHeaderNavbar.defaultProps = {};