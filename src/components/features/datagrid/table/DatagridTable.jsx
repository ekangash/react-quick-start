/** 1 NodeModules */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/** 2 Config, Packages, Endpoints, Enums */
import { POSITION } from "@enums/common/Style";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { DatagridTableHorizontalScrollbar } from "@features/datagrid/table/horizontal-scrollbar/DatagridTableHorizontalScrollbar";
import { useObserveElementWidth } from "@hooks/useObserveElementWidth";

/** 5 Entities, Stores, Services */
/** 6 Resources */
import "@features/datagrid/table/DatagridTable.css";

/**
 * Таблица
 *
 * @param {!(ReactNode|ReactNode[])} children Дочерние DOM узлы
 * @param {string[]} [className=[]] Имена классов
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridTable = ({ children, className }) => {
    const { width: widthTable, ref: tableRef } = useObserveElementWidth();
    const { width: widthTableWrapper, ref: tableWrapperRef } = useObserveElementWidth();
    const [scrollbarPosition, setScrollbarPosition] = useState(null);

    /**
     * Проверяет, где находится таблица, в зависимости от этого изменяет позиционирование скроллбара
     *
     * @returns {string} Значение свойства position
     */
    const toggleScrollbar = () => {
        let tableBottom = tableWrapperRef.current.getBoundingClientRect().bottom;
        let tableTop = tableWrapperRef.current.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        let tableBottomInVisibleArea = tableBottom < windowHeight && tableBottom > 0;
        let smallTable = tableTop < 0 && tableBottom < windowHeight;
        let tableUnderVisibleArea = tableTop > windowHeight;

        if (tableBottomInVisibleArea || smallTable || tableUnderVisibleArea) {
            setScrollbarPosition(POSITION.STATIC);
        } else  if (tableBottom > windowHeight) {
            setScrollbarPosition(POSITION.FIXED);
        }

        return scrollbarPosition;
    };

    /**
     * Имитирует работу скролла
     *
     * @param {Event} event Событие прокручивания скролла
     *
     * @return {void}
     */
    const scrollTable = (event) => {
        tableWrapperRef.current.scrollLeft = event.target.scrollLeft;
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollbar);
        window.addEventListener('resize', toggleScrollbar);

        return () => {
            window.removeEventListener('scroll', toggleScrollbar)
            window.removeEventListener('resize',toggleScrollbar);
        };
    }, []);

    useLayoutEffect(() => {
        toggleScrollbar();
    })

    return (
        <div className="datagrid-table-wrapper" ref={ tableWrapperRef }>
            <table className={ classNames('table', 'datagrid-table', ...className) } ref={ tableRef }>
                { children }
            </table>
            <DatagridTableHorizontalScrollbar
                widthTable={widthTable}
                widthTableWrapper={widthTableWrapper}
                scrollbarPosition={scrollbarPosition}
                onScroll={scrollTable}
            />
        </div>
    );
};

DatagridTable.propTypes = {
    className: propTypes.array,
    children: propTypes.node.isRequired,
};

DatagridTable.defaultProps = {
    className: [],
};
