/** 1 NodeModules */
import React, { useState, useRef, useEffect } from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { API_ENDPOINT } from "@enums/endpoint/ApiEndpoint";

/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiClose, mdiMagnify } from "@mdi/js/commonjs/mdi";

/** 4 Components, Hooks - Custom */
import { useDatagridContext } from  "@features/datagrid/context/DatagridContext";
import { useDatagridUrlSearchParams } from '@features/datagrid/hooks/useDatagridUrlSearchParams';

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Быстрый поиск
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridSearch = () => {
    const {
        changeQuickSearchUrlParams,
        getQuickSearchUrlParamValue,
        changeQuickSearchQueryAllParams,
    } = useDatagridUrlSearchParams();
    const [searchText, setSearchText] = useState(getQuickSearchUrlParamValue());
    const { collection, forMethod } = useDatagridContext();
    const collectionMethod = useRef(null);

    useEffect(() => {
        setSearchText(getQuickSearchUrlParamValue());
    }, [getQuickSearchUrlParamValue]);

    /**
     * Осуществляет поиск по значению по клику на кнопку или Enter
     *
     * @function
     *
     * @param {string} text Значение для поиска
     *
     * @return {void}
     */
    let searchCollectionByText = (text) => {
        collection.where((query) => {
            changeQuickSearchQueryAllParams(query, collection, text);
        });

        changeQuickSearchUrlParams(text);
        collection.forMethod(Str.contains(text) ? API_ENDPOINT.QUICK_SEARCH : forMethod);
        collection.fetch();
    };

    /**
     * Обрабатывает сброс быстрого поиска
     *
     * @function
     *
     * @return {void}
     */
    let onResetBtnClick = () => {
        if (Str.empty(searchText)) {
            return;
        }

        setSearchText('');
        searchCollectionByText('');
    };

    /**
     * Обрабатывает изменение в поле поиска
     *
     * @function
     *
     * @param {Event} event Событие изменения в поле ввода значения
     *
     * @return {void}
     */
    const onChange = (event) => {
        return setSearchText(event.target.value);
    };

    /**
     * Обрабатывает событие клика на кнопку в поле ввода
     *
     * @function
     *
     * @param {Event} event Событие клика на кнопку
     *
     * @return {void}
     */
    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchCollectionByText(searchText);
        }
    };

    /**
     * Обрабатывает клик на кнопку поиска и осуществляет поиска
     *
     * @function
     *
     * @return {void}
     */
    const onSearchBtnClick = () => {
        searchCollectionByText(searchText);
    };

    return (
        <div className={'d-flex'}>
            <div className={'mr-2 input-group'}>
                <input
                    className={'form-control'}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={searchText}
                    type="text"
                />
                <Button
                    onClick={onSearchBtnClick}
                    variant="outline-secondary"
                    size="sm"
                >
                    <Icon path={mdiMagnify} size={0.8}/>
                </Button>
            </div>
            <Button
                onClick={onResetBtnClick}
                variant="primary"
                size="sm"
            >
                <Icon path={mdiClose} size={0.8} />
            </Button>
        </div>
    );
};

DatagridSearch.propTypes = {};
DatagridSearch.defaultProps = {};