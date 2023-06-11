/** 1 NodeModules */
import React, { useEffect, useRef, useState } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вычисляет ширину для внешнего и внутреннего контейнера фиксированного скроллбара
 *
 * @returns {{ref: React.MutableRefObject<null>, width: number}} Реф элемента и его ширина
 */
export const useObserveElementWidth = () => {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            ref.current && observer.unobserve(ref.current);
        };
    }, []);

    return {
        width,
        ref
    };
};