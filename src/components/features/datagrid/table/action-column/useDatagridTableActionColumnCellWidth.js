/** 1 NodeModules */
import React, { useEffect } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вычисляет ширину ActionColumn
 *
 * @param {RefObject} cellRef Элемент ячейки ActionColumn
 *
 * @return {void}
 */
export const useDatagridTableActionColumnCellWidth = (cellRef) => {
    const cellClassName = ".datagrid-table-action-column__cell";
    let maxWidth = 0;
    let initWidth = 0;

    /**
     * Изменяет ширину ячеек ActionColumn и отступ внутри таблицы
     *
     * @param {NodeList} actionColumnElements DOM-элементы ячеек ActionColumn
     * @param {number|string} width Ширина
     *
     * @return {void}
     */
    const changeActionColumnWidth = (actionColumnElements, width) => {
        actionColumnElements.forEach((actionColumnCell) => {
            actionColumnCell.style.width = width;
        });

        const gridWrapper = document.querySelector(".datagrid-table-wrapper");

        if (gridWrapper) {
            gridWrapper.style.marginRight = width;
        }
    };

    useEffect(() => {
        if (cellRef.current === null) {
            return null;
        }

        let cellTable = cellRef.current.closest("table");
        let actionColumnElements = cellTable.querySelectorAll(cellClassName);

        actionColumnElements.forEach((actionColumnCell) => {
            const width = actionColumnCell.clientWidth;

            if (maxWidth === 0) {
                maxWidth = initWidth = width;
            } else if (maxWidth < width) {
                maxWidth = width;
            } else if (width < maxWidth) {
                const maxWidthStr = `${maxWidth}px`;
                actionColumnCell.style.width = maxWidthStr;
            }
        });

        if (maxWidth !== initWidth) {
            const maxWidthStr = `${maxWidth}px`;
            changeActionColumnWidth(actionColumnElements, maxWidthStr);
        }

        return () => {
            changeActionColumnWidth(actionColumnElements, `${maxWidth}px`);
        };
    }, []);
};