/** 1 NodeModules */
import React, { useCallback } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Dropdown } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { SelectListHeaderAdd } from "@shared/select/list/header/SelectListHeaderAdd/SelectListHeaderAdd";
import { useSelectContext } from "@shared/select/context/SelectContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Заголовок выпадающего списка селекта
 *
 * @return {JSX.Element} DOM-элемент
 */
export const SelectListHeader = () => {
    const { filteredOptions, inputValue, settings: { tags, loadingError } } = useSelectContext();

    /**
     * Возвращает элемент заголовка списка опций
     *
     * @function
     *
     * @return {JSX.Element} Элемент заголовка
     */
    const getText = useCallback(() => {
        let message = loadingError ? 'При загрузке произошла ошибка!' :
            filteredOptions.length === 0 ? 'Ничего не найдено' :
                'Выберите значение';

        if (filteredOptions.length === 0 && !loadingError && tags) {
            return (<SelectListHeaderAdd/>);
        }

        return <Dropdown.Header>{message}</Dropdown.Header>;
    }, [filteredOptions, inputValue, loadingError, tags ]);

    return getText();
};

SelectListHeader.propTypes = {};
SelectListHeader.defaultProps = {};