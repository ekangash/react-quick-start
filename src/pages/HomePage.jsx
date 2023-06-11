/** 1 NodeModules */
import React, { createRef } from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DrawerRight } from "@shared/drawer/right/DrawerRight";
import { DrawerBottom } from "@shared/drawer/bottom/DrawerBottom";
import { DrawerBottomContainer } from '@shared/drawer/bottom/container/DrawerBottomContainer';
import { DrawerContent } from "@shared/drawer/DrawerContent";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Главная страница.
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const HomePage = () => {
    const drawerBottomContainerRef = createRef();

    return (
        <section>
            <DrawerBottomContainer ref={drawerBottomContainerRef}>
                <DrawerContent>
                    <h4>Главная страница</h4>
                </DrawerContent>
                <DrawerRight>
                    Информация
                </DrawerRight>
            </DrawerBottomContainer>
            <DrawerBottom targetRef={drawerBottomContainerRef}>
                Информация
            </DrawerBottom>
        </section>
    );
};

HomePage.propTypes = {};
HomePage.defaultProps = {};