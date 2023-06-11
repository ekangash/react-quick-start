/** 1 NodeModules */
import React, { useState } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

/** 4 Components, Hooks - Custom */
import { DrawerContent } from "@shared/drawer/DrawerContent";

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@shared/drawer/Drawer.scss';


/**
 * Высоты свернутой и развернутой панели
 *
 * @type {{CLOSE: string, OPEN: string}}
 */
const DRAWER_WIDTH = {
    OPEN: '450px',
    CLOSE: '30px'
};

/**
 * Иконки свернутой и развернутой панели
 *
 * @type {{CLOSE: string, OPEN: string}}
 */
const DRAWER_ICON = {
    OPEN: mdiChevronRight,
    CLOSE: mdiChevronLeft
};

/**
 * Правая выдвижная панель
 *
 * @param {!React.ReactNode} children Дочерние элементы
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const DrawerRight = ({ children }) => {
    const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH.OPEN);

    const toggleRightDrawer = () => {
        if (rightDrawerOpen) {
            setRightDrawerOpen(false);
            setDrawerWidth(DRAWER_WIDTH.CLOSE);
        } else {
            setRightDrawerOpen(true);
            setDrawerWidth(DRAWER_WIDTH.OPEN);
        }
    };

    return (
        <div className='right-drawer ml-3' style={{ width: drawerWidth }}>
            <div
                className='drawer-icon'
                onClick={toggleRightDrawer}
            >
                <Icon path={rightDrawerOpen ? DRAWER_ICON.OPEN : DRAWER_ICON.CLOSE} size={1} />
            </div>
            <DrawerContent className={['pl-3 pt-3']}>
                { children }
            </DrawerContent>
        </div>
    );

};

DrawerRight.propTypes = {
    children: propTypes.node.isRequired,
};
DrawerRight.defaultProps = {};