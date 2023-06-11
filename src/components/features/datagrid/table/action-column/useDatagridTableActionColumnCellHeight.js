/** 1 NodeModules */
import React, { useState, useEffect } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Хук для получения высоты
 *
 * @param {RefObject} rowRef Реф, ссылающийся на строку таблицы
 *
 * @return {number} Высота строки
 */
export const useDatagridTableActionColumnCellHeight = (rowRef) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(rowRef.current ? rowRef.current.clientHeight : 0);
    }, [rowRef.current]);

    return height;
};