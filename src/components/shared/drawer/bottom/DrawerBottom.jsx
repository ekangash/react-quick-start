/** 1 NodeModules */
import React, { useState } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

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
const DRAWER_HEIGHT = {
    OPEN: '200px',
    CLOSE: '30px'
};

/**
 * Иконки свернутой и развернутой панели
 *
 * @type {{CLOSE: string, OPEN: string}}
 */
const DRAWER_ICON = {
    OPEN: mdiChevronDown,
    CLOSE: mdiChevronUp
};

/**
 * Нижняя выдвижная панель
 *
 * @param {!React.ReactNode} children Дочерние элементы
 * @param {RefObject} [targetRef={}] Обьект контейнера
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const DrawerBottom = ({ children, targetRef }) => {
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(true);
    const [drawerHeight, setDrawerHeight] = useState(DRAWER_HEIGHT.OPEN);

    const setPadding = (padding) => {
        targetRef.current.style.paddingBottom = padding;
    };

    const toggleBottomDrawer = () => {
        if (bottomDrawerOpen) {
            setBottomDrawerOpen(false);
            setDrawerHeight(DRAWER_HEIGHT.CLOSE);
            setPadding(DRAWER_HEIGHT.CLOSE);
        } else {
            setBottomDrawerOpen(true);
            setDrawerHeight(DRAWER_HEIGHT.OPEN);
            setPadding(DRAWER_HEIGHT.OPEN);
        }
    };

    return (
        <div className='bottom-drawer' style={{ height: drawerHeight }}>
            <div
                className='drawer-icon'
                onClick={toggleBottomDrawer}
            >
                <Icon path={bottomDrawerOpen ? DRAWER_ICON.OPEN : DRAWER_ICON.CLOSE} size={1} />
            </div>
            <DrawerContent className={['pt-3']}>
                {children}
            </DrawerContent>
        </div>
    );
};

DrawerBottom.propTypes = {
    children: propTypes.node.isRequired,
    targetRef: propTypes.object,
};
DrawerBottom.defaultProps = {
    targetRef: {},
};