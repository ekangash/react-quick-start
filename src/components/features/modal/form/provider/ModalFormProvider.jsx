/** 1 NodeModules */
import React, { useEffect, useCallback } from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { useFormContext } from "react-hook-form";

/** 4 Components, Hooks - Custom */
import { useModalContext } from "@features/modal/context/ModalContext";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Провайдер методов формы
 *
 * @return {null}
 */
export const ModalFormProvider = () => {
    const { methods: { getModalOnHideCallbacks } } = useModalContext();
    const { formState: { isDirty, isSubmitting } } = useFormContext();

    /**
     * Функция, вызываемая при закрытии модального окна с формой
     *
     * @return {boolean} Сообщает, была ли форма изменена и необходимо подтверждение для закрытия
     */
    const onHide = useCallback(() => {
        return !(isDirty && !isSubmitting);
    }, [isDirty, isSubmitting]);

    useEffect(() => {
        let modalHideFunctions = getModalOnHideCallbacks();
        modalHideFunctions.add(onHide);

        return () => {
            modalHideFunctions.delete(onHide);
        };
    }, [onHide]);

    return null;
};

ModalFormProvider.propTypes = {};
ModalFormProvider.defaultProps = {};