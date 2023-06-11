/** 1 NodeModules */
import React from "react";
import { observer } from "mobx-react-lite"

/** 2 Config, Packages, Endpoints, Enums */
import { Func } from "@packages/helpers/function/Func";
import { Obj } from "@packages/helpers/object/Obj";
import { APP_BOOTBOX_TYPES } from "@enums/app/bootbox/AppBootbox";
import { APP_BOOTBOX_MODAL_TYPES } from '@enums/app/bootbox/AppBootbox';

/** 3 Components, Hooks, Icons - NodeModules */
import Icon from "@mdi/react";
import { mdiAlertCircleOutline, mdiCancel, mdiCheckCircleOutline } from "@mdi/js";

/** 4 Components, Hooks - Custom */
import { Modal } from "@features/modal/Modal";

/** 5 Entities, Stores, Services */
import { AppBootboxStore } from "@store/app/AppBootbox";

/** 6 Resources */

/**
 * Иконки для системных уведомлений
 *
 * @type {{success: JSX.Element, warning: JSX.Element, error: JSX.Element}}
 */
const APP_BOOTBOX_ICONS = {
    [APP_BOOTBOX_TYPES.SUCCESS]: <Icon path={mdiCheckCircleOutline} color={'var(--primary)'} size={1.5}/>,
    [APP_BOOTBOX_TYPES.ERROR]: <Icon path={mdiCancel} color={'var(--danger)'} size={1.5}/>,
    [APP_BOOTBOX_TYPES.WARNING]: <Icon path={mdiAlertCircleOutline} color={'var(--warning)'} size={1.5} />,
};

/**
 * Загрузочная коробка для формирования подсказок, предупреждений для подтверждения действий.
 *
 * @return {JSX.Element} DOM-элемент алерта
 */
export const AppBootbox = observer(() => {
    /**
     * Обрабатывает клик на кнопки в футере бутбокса
     *
     * @param {Function} [clickHandlerCallback = null] Callback-обработчик клика
     *
     * @return {void}
     */
    const onBootboxButtonClick = (clickHandlerCallback = null) => {
        if (Func.assert(clickHandlerCallback)) {
            clickHandlerCallback();
        }

        AppBootboxStore.hide();
    };

    /**
     * Обрабатывает скрытие модального окна при клике на кнопку крестика в шапке или backdrop
     *
     * @return {void}
     */
    const onBootboxHide = () => {
        if (Func.assert(AppBootboxStore.whenAgree)) {
            AppBootboxStore.whenAgree();
        } else if (Func.assert(AppBootboxStore.whenRejected)) {
            AppBootboxStore.whenRejected();
        }

        AppBootboxStore.hide();
    };

    return (
        <Modal
            show={AppBootboxStore.show}
        >
            <Modal.Window
                onHide={onBootboxHide}
                size={AppBootboxStore.options.size}
                backdrop={AppBootboxStore.bootboxType === APP_BOOTBOX_MODAL_TYPES.ALERT || 'static'}
            >
                <Modal.WindowHeader>
                    {Obj.isset(APP_BOOTBOX_ICONS, AppBootboxStore.type) && (
                        <span className={'modal-window-header-icon'}>
                            {APP_BOOTBOX_ICONS[AppBootboxStore.type]}
                        </span>
                    )}
                    {AppBootboxStore.content}
                </Modal.WindowHeader>
                <Modal.WindowFooter style={{borderTop: 'none'}}>
                    {AppBootboxStore.bootboxType === APP_BOOTBOX_MODAL_TYPES.ALERT && (
                        <Modal.ButtonAction onClick={() => onBootboxButtonClick(AppBootboxStore.whenAgree)}>
                            ОК
                        </Modal.ButtonAction>
                    )}
                    {(AppBootboxStore.bootboxType === APP_BOOTBOX_MODAL_TYPES.CONFIRM
                        || AppBootboxStore.bootboxType === APP_BOOTBOX_MODAL_TYPES.PROMPT) && (
                        <>
                            <Modal.ButtonClose onClick={() => onBootboxButtonClick(AppBootboxStore.whenRejected)}>
                                Отмена
                            </Modal.ButtonClose>
                            <Modal.ButtonAction onClick={() => onBootboxButtonClick(AppBootboxStore.whenConfirmed)}>
                                Подтвердить
                            </Modal.ButtonAction>
                        </>
                    )}
                </Modal.WindowFooter>
            </Modal.Window>
        </Modal>
    );
});

AppBootbox.propTypes = {};
AppBootbox.defaultProps = {};