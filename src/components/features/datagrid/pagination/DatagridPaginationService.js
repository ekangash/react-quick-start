/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Сервис для работы с пагинацией таблицы
 */
export const DatagridPaginationService = {
    /**
     * Формирует набор последовательности страниц.
     *
     * @param {number} currentPage Текущая страница
     * @param {number} perPage Количество записей на странице
     * @param {number} totalCount Количество всех записей
     *
     * @return {number[]} Последовательность страниц.
     */
    createPages(currentPage, perPage, totalCount) {
        let pages = [];

        let pagesCount = Math.ceil(totalCount / perPage)

        if(pagesCount > perPage) {
            if (currentPage > 5) {
                for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                    pages.push(i);

                    if (i === pagesCount) {
                        break;
                    }
                }
            } else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i);

                    if (i === pagesCount) {
                        break;
                    }
                }
            }
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }

        return pages.length === 1 ? [] : pages;
    }
}