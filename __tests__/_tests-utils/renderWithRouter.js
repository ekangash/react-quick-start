/** 1 NodeModules */
import React from 'react';
import { render } from '@testing-library/react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Routes, Route, MemoryRouter } from 'react-router-dom';

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Роутер, в который оборачивается дочерний элемент для тестирования маршрутизации
 *
 * @see https://testing-library.com/docs/example-react-router
 * @see https://reactrouter.com/en/main/router-components/memory-router
 *
 * @param {React.ReactNode} children Дочерние элементы
 * @param {string} url URL, который будет стучаться маршрутизация
 *
 * @return {JSX.Element} Роутер, с обернутым дочерним элементом
 */
const TestRouter = ({ children, url }) => {
    return (
        <MemoryRouter initialEntries={[url ?? '/']}>
            <Routes>
                <Route path={url ?? '/'} element={<div className="app-test">{children}</div>} />
            </Routes>
        </MemoryRouter>
    );
};

/**
 * Рендерит UI с помощью рендера из Testing Library, обернутый в роутер
 *
 * @param {React.ReactNode} ui UI для рендера
 * @param {object} options Объект с опциями для рендера
 *
 * @return {RenderResult<typeof queries, HTMLElement, HTMLElement>} Результат рендера, основанный на рендере из Testing-Library
 */
export const renderWithRouter = (ui, options) => {
    return render(ui, {
        wrapper: (props) => <TestRouter {...props} {...options?.wrapperProps}>{ui}</TestRouter>,
        ...options,
    });
}