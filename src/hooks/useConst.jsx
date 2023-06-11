/** 1 NodeModules */
import React from "react";

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Помещает переданное значение в ref
 *
 * @param {function|any} initialValue Значение, сохраняемое в ref
 *
 * @return {AppEntity|Collection|array|number|string|object} Значение, хранящееся в свойстве current
 */
export const useConst = (initialValue) => {
    const ref = React.useRef();

    if (ref.current === undefined) {
        ref.current = Func.assert(initialValue) ? initialValue() : initialValue;
    }

    return ref.current;
};