/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Arr } from "@packages/helpers/array/Arr";
import { Query } from "@packages/query/Query";
import { Entity } from "@packages/entity/Entity";

import { TABLE_PAGINATION } from "@enums/table/Table";

/** 3 Components, Hooks, Icons - NodeModules */
import { DatagridColumnsCollection } from "@features/datagrid/collection/DatagridColumnsCollection";

/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { DatagridSettings } from "@entities/public/DatagridSettings"

/** 6 Resources */

/**
 * @class DatagridSettingsCollection Класс настроек коллекции таблицы.
 */
export class DatagridSettingsCollection extends DatagridColumnsCollection {

    /**
     * Настройки таблицы.
     *
     * @type {DatagridSettings|null}
     */
    settings = null

    /**
     * Формирует экземпляр настроек таблицы.
     *
     * @return {DatagridSettings} Настройки таблицы.
     */
    getSettings() {
        const settings = this.settings;
        Entity.checkIsInstanceOfSelf(settings);

        if (this.columns.size > 0) {
            settings.fill({
                columns: this.eachColumns(
                    (column) => column.properties(['key', 'name', 'active'])
                )
            });
        }

        settings.fill({
            perPage: this.query.parsePaginationParts(pagination => (
                pagination.get('per-page') ?? TABLE_PAGINATION.PEAR_PAGE
            ))});

        return settings;
    }

    /**
     * Инициализирует экземпляр настроек.
     *
     * @param {DatagridSettings} settings Настройки.
     *
     * @return {DatagridCollection} Экземпляр текущего объекта.
     */
    forSettings(settings) {
        Entity.checkIsInstanceOfSelf(settings);
        const columns = settings.attribute('columns');

        if (Arr.contains(columns)) {
            this.updateColumns(columns);
        }

        if (Query.isInstanceOfSelf(this.query)) {
            const perPage = settings.attribute('perPage', (perPage) => perPage, TABLE_PAGINATION.PEAR_PAGE);
            this.query.perPage(perPage);
        }

        this.settings = settings;

        return this;
    }
}