/** 1 NodeModules */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";
import { MESSAGES } from "@enums/common/Messages";
import { API_RESPONSE } from "@enums/api/response/ApiResponse";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { AppExceptionHandler } from "@app/exception/AppExceptionHandler";
import { ErrorMessage } from "@shared/error/message/ErrorMessage";

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@features/loader/Loader.scss';


/**
 * Загрузчик
 *
 * @param {object} [initWhenDidMount=true] Инициализировать при монтировании.
 * @param {any[]} deps Зависимости.
 * @param {?Function} expect Колбэк-функция для обработки загрузки.
 * @param {Function} [onNotFound=(exception:object)=>void] Колбэк-функция для ошибки not-found.
 * @param {Function} [onThrowError=(exception:object)=>void] Колбэк-функция для ошибки throw-error.
 * @param {Function} children Дочерние элементы.
 *
 * @return {JSX.Element} Компонент вкладки Характеристики
 */
export const Loader = ({ initWhenDidMount, deps, expect, onNotFound, onThrowError, children }) => {
    const [loading, setLoading] = useState(initWhenDidMount);
    const [childrenNodes, setChildrenNodes] = useState(null);

    useEffect(() => {
        const executeExpectFn = async () => {
            if (initWhenDidMount && Func.assert(expect)) {
                try {
                    const expectProps = await expect({ setLoading });
                    setChildrenNodes(children(expectProps));
                } catch (exception) {
                    setChildrenNodes((new AppExceptionHandler()).fillEvents({ onNotFound, onThrowError }).handle(exception));
                } finally {
                    setLoading(false);
                }
            } else {
                setChildrenNodes(children(null));
            }
        };

        executeExpectFn();
    }, deps);

    return loading ? (
        <div className='loader'/>
    ) : childrenNodes;
};

Loader.propTypes = {
    children: propTypes.func.isRequired,
    expect: propTypes.func,
    initWhenDidMount: propTypes.bool,
    deps: propTypes.array,
    onNotFound: propTypes.func,
};

Loader.defaultProps = {
    initWhenDidMount: true,
    deps: [],
    expect: null,
    onNotFound: () => (
        <ErrorMessage
            badge={API_RESPONSE.STATUSES.NOT_FOUND}
        >
            {API_RESPONSE.MESSAGES.NOT_FOUND}
        </ErrorMessage>
    ),
    onThrowError: () => (
        <ErrorMessage
            badge="Упс..."
        >
            {MESSAGES.UNDEFINED_ERR}
        </ErrorMessage>
    ),
}