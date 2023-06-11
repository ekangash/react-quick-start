/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** 4 Components, Hooks - Custom */
import { AppLayout } from "@app/layout/AppLayout";
import { HomePage } from "@pages/HomePage";
import { NotFoundPage } from '@pages/not-found/NotFoundPage';

import { TemplatePage } from "@pages/template/TemplatePage";
import { TemplateLayout } from "@layout/template/layout/TemplateLayout";
import { TemplateFormPage } from "@pages/template/form/TemplateFormPage";
import { TemplateModalPage } from "@pages/template/modal/TemplateModalPage";
import { TemplateSelectPage } from "@pages/template/select/TemplateSelectPage";
import { TemplateTablePage } from "@pages/template/table/TemplateTablePage";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Маршрутизация приложения
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const AppRouters = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/*"} element={<AppLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"template/*"} element={<TemplateLayout/>}>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route index element={<TemplatePage/>}/>
                        <Route path={"form"} element={<TemplateFormPage/>}/>
                        <Route path={"modal"} element={<TemplateModalPage/>}/>
                        <Route path={"select"} element={<TemplateSelectPage />} />
                        <Route path={"table"} element={<TemplateTablePage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

AppRouters.propTypes = {};
AppRouters.defaultProps = {};