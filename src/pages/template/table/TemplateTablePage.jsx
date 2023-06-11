/** 1 NodeModules */
import React from 'react';
import { NavLink } from "react-router-dom";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { useConst } from '@hooks/useConst';
import { Datagrid } from '@features/datagrid/Datagrid';

/** 5 Entities, Stores, Services */
import { Profile } from '@entities/public/Profile';
import { AppBootboxStore } from "@store/app/AppBootbox";

/** 6 Resources */

/**
 * Главная страница реестра 'Должностные лица'
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateTablePage = () => {

    const columns = useConst(() => [
        { name: 'id', filter: { name: 'input' }, sort: true },
        { name: 'fullname', filter: { name: 'input' }, sort: true },
        { name: 'mobile_number', filter: { name: 'input' }, sort: true },
        { name: 'email', filter: { name: 'input' }, sort: true },
        {
            name: 'is_active',
            value: (entity) => entity.attribute('is_active') ? 'Да' : 'Нет',
            filter: {
                name: 'select',
                options: [
                    { value: 1, label: 'Да' },
                    { value: 0, label: 'Нет' },
                ],
            },
            sort: true,
        },
        { name: 'login', filter: { name: 'input' }, sort: true },
    ]);

    const actionColumns = useConst(() => ({
        createBasedOn: {
            element: ({ icon, props, entity }) => {
                return 'Форма создание на основе'
            },
        },
        view: {
            element: ({ icon, props, entity }) => (
                <NavLink
                    to={entity.getPageUrl('view')}
                    {...props}
                >
                    {icon}
                </NavLink>
            ),
        },
        edit: {
            element: ({ icon, props, entity }) => (
                <NavLink
                    to={entity.getPageUrl('edit')}
                    {...props}
                >
                    {icon}
                </NavLink>
            ),
        },
        delete: {
            element: ({ icon, props, entity, collection }) => {
                AppBootboxStore.alert('Удаление записи');
            },
        },
    }));

    return (
        <Datagrid
            forEntity={Profile}
            actionColumn={actionColumns}
            columns={columns}
            checkbox={{ single: true }}
            useSearchWhenDidMounted
            frame
        >
            {({ collection }) => (
                <Datagrid.Loader>
                    <Datagrid.Panel>
                        <Datagrid.Search />
                    </Datagrid.Panel>
                    <Datagrid.Table>
                        <Datagrid.TableHead />
                        <Datagrid.TableBody
                            transitonToRoute={(entity) => entity.getPageUrl('view')}
                        />
                    </Datagrid.Table>
                    <Datagrid.Score />
                    <Datagrid.Pagination />
                </Datagrid.Loader>
            )}
        </Datagrid>
    );
};

TemplateTablePage.propTypes = {};
TemplateTablePage.defaultProps = {};