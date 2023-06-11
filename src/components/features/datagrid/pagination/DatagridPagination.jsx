/** 1 NodeModules */
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import Pagination from "react-bootstrap/Pagination";

/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { DatagridPaginationService } from "@features/datagrid/pagination/DatagridPaginationService"

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Пагинация таблицы
 *
 * @return {JSX.Element} DOM узлы
 */
export const DatagridPagination = () => {
    const { collection } = useDatagridContext();
    const currentPage = collection.getMeta('currentPage');
    const perPage = collection.getMeta('perPage');
    const totalCount = collection.getMeta('totalCount');
    const pageCount = collection.getMeta('pageCount');

    const [pages, setPages] = useState(() => DatagridPaginationService.createPages(currentPage, perPage, totalCount))

    useEffect(() => {
        setPages(DatagridPaginationService.createPages(currentPage, perPage, totalCount));
    }, [currentPage, totalCount]);

    return pages.length > 1 && (
        <div className='datagrid-pagination'>
            <Pagination>
                {currentPage > 1 && (
                    <>
                        <Pagination.First
                            onClick={() => {
                                collection.where(query => query.page(1));
                                collection.fetch();
                            }}>
                            Первая
                        </Pagination.First>
                        <Pagination.Prev
                            onClick={() => {
                                collection.where(query => query.page(currentPage - 1));
                                collection.fetch();
                            }}>
                            «
                        </Pagination.Prev>
                    </>
                )}
                {pages.map((pageNumber) => (
                    <Pagination.Item
                        key={nanoid(16)}
                        active={pageNumber === currentPage}
                        onClick={() => {
                            if (pageNumber === currentPage) {
                                return;
                            }

                            collection.where(query => query.page(pageNumber));
                            collection.fetch();
                        }}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}
                {currentPage < pageCount && (
                    <>
                        <Pagination.Next
                            onClick={() => {
                                collection.where(query => query.page(currentPage + 1));
                                collection.fetch();
                            }}>
                            »
                        </Pagination.Next>
                        <Pagination.Last
                            onClick={() => {
                                collection.where(query => query.page(totalCount));
                                collection.fetch();
                            }}>
                            Последняя
                        </Pagination.Last>
                    </>
                )}
            </Pagination>
        </div>
    );
};

DatagridPagination.propTypes = {};
DatagridPagination.defaultProps = {};