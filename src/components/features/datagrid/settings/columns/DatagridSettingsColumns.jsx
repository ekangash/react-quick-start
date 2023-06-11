/** 1 NodeModules */
import React  from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Controller, useFormContext } from 'react-hook-form';

/** 4 Components, Hooks - Custom */
import { useDatagridContext } from '@features/datagrid/context/DatagridContext';
import { DatagridSettingsColumnsReorder } from '@features/datagrid/settings/columns/reorder/DatagridSettingsColumnsReorder';
import { useConst } from '@hooks/useConst';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/datagrid/settings/columns/DatagridSettingsColumns.scss';

/**
 * Настраиваемая колонка
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridSettingsColumns = () => {
    const { collection } = useDatagridContext();
    const entityLabel = useConst(() => new collection.entityClass());
    const { control, entity } = useFormContext();

    return (
        <>
            <div className='datagrid-settings-columns-label'>
                {entity.label('columns')}
            </div>
            <Controller
                control={control}
                name={'columns'}
                defaultValue={[]}
                render={({ field: { onChange, value: columns} }) => (
                    <DatagridSettingsColumnsReorder
                        columns={columns}
                        onChange={onChange}
                        entityLabel={entityLabel}
                    />
                )}
            />
        </>
    );
};

DatagridSettingsColumns.propTypes = {};
DatagridSettingsColumns.defaultProps = {};