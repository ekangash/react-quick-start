/** 1 NodeModules */
import React from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { SelectInputMultipleValuesValue } from "@shared/select/input/multiple-values/value/SelectInputMultipleValuesValue";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Обертка для выбранных значений при множественном выборе
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectInputMultipleValues = () => {
    const { selectedOptions } = useSelectContext();

    return (
        <div>
            {selectedOptions.map((option) => (<SelectInputMultipleValuesValue key={option.value} option={option}/>))}
        </div>
    );
};

SelectInputMultipleValues.propTypes = {};
SelectInputMultipleValues.defaultProps = {};