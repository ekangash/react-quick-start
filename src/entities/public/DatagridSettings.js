/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { yup } from "@config/yup/yup";
import { Str } from "@packages/helpers/string/Str";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppEntity } from "@entities/AppEntity";

/** 6 Resources */

/**
 * Сущность настройки таблицы.
 *
 * @class
 */
export class DatagridSettings extends AppEntity {

    /**
     * @extends AppEntity
     */
    rules() {
        return {
            attributes: ['perPage','columns'],
            fillable: ['perPage', 'columns'],
        }
    }

    /**
     * @extends AppEntity
     */
    labels() {
        return {
            perPage: 'Записей на странице',
            columns: 'Настроить порядок и отображение колонок',
        };
    }

    /**
     * @extends AppEntity
     */
    placeholders() {
        return {
            perPage: 'Записей на странице',
            columns: 'Настроить порядок и отображение колонок',
        };
    }

    /**
     * @extends AppEntity
     */
    schema = () => yup.object({
        perPage: yup.number().max(1000).min(1).required(),
    })

    /**
     * Получает данные из локального хранилища.
     *
     * @param {string} [pathname=window.location.pathname] Имя пути.
     *
     * @return {this} Экземпляр текущего объекта
     */
    getFromLocalStorage(pathname = window.location.pathname) {
        if (!localStorage.hasOwnProperty(pathname)) {
            return this;
        }

        const localStorageTableSettingsEncoded = localStorage.getItem(pathname);

        if (Str.contains(localStorageTableSettingsEncoded)) {
            this.fill(JSON.parse(localStorageTableSettingsEncoded));
        }

        return this;
    }

    /**
     * Обновляет данные в локальном хранилище.
     *
     * @param {string} [pathname=window.location.pathname] Имя пути.
     *
     * @return {this} Экземпляр текущего объекта
     */
    patchIntoLocalStorage(pathname = window.location.pathname) {
        localStorage.setItem(pathname, JSON.stringify(this.getFillableAttributes()));

        return this;
    }

    /**
     * Удаляет данные из локального хранилища.
     *
     * @param {string} [pathname=window.location.pathname] Имя пути.
     *
     * @return {this} Экземпляр текущего объекта
     */
    deleteFromLocalStorage(pathname = window.location.pathname) {
        localStorage.removeItem(pathname);
        this.purge();

        return this;
    }
}