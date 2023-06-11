/** 1 NodeModules */
import React from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { useDatagridContext } from "@features/datagrid/context/DatagridContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Блок информации об общем количестве записей и полученных по запросу
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridScore = () => {
    const { collection } = useDatagridContext();
    const currentPage = collection.getMeta('currentPage');
    const perPage = collection.getMeta('perPage');
    const totalCount = collection.getMeta('totalCount');
    const offset = (currentPage - 1) * perPage;

    return collection.contains() && (
        <div className="datagrid-summary justify-content-end">
            <span className="summary">
               Показаны&#160;
                <b>
                   {currentPage > 1 ? (offset + 1) : 1}
                    -
                    {offset + collection.activeEntitiesCount()}
                </b>
                &#160;из&#160;
                <b>
                    {totalCount}
                </b>
                &#160;записей.
            </span>
        </div>
    );
};

DatagridScore.propTypes = {};
DatagridScore.defaultProps = {};