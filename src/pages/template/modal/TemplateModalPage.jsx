/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { APP_BOOTBOX_TYPES } from "@enums/app/bootbox/AppBootbox";
/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { TemplateModalDeep } from "@layout/template/modal/deep/TemplateModalDeep";
import { TemplateModalForm } from "@layout/template/modal/form/TemplateModalForm";

/** 5 Entities, Stores, Services */
import { AppBootboxStore } from "@store/app/AppBootbox";

/** 6 Resources */

/**
 * Страница шаблона с модальными окнами.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateModalPage = () => {

    return (
        <div>
            <h4 className="mb-4">
               Макеты модального окна
            </h4>
            <TemplateModalForm />
            <TemplateModalDeep />
            <Button
                onClick={() => {
                    AppBootboxStore.alert(
                        'Глобальный алерт! Вызывается в сетевых запросах, чтобы вывести сообщение об успехе или ошибке.',
                        APP_BOOTBOX_TYPES.SUCCESS,
                        () => {
                            console.log('Выполнение операции просмотра сообщения!')
                        }
                    );
                }}
                className='ml-2'
                size='sm'
            >
                Достучаться до глобального алерта
            </Button>
            <Button
                onClick={() => {
                    AppBootboxStore.confirm(
                        'Возможно, на странице есть несохраненные данные. Вы уверены, что хотите закрыть окно?',
                        () => {
                            console.log('Выполнение операции при подтверждение!')
                        },
                        () => {
                            console.log('Выполнение операции при отклонение!')
                        }
                    );
                }}
                className='ml-2'
                size='sm'
            >
                Достучаться до глобального подтверждения
            </Button>
            <div className={'mt-2'}>
                <Button
                    onClick={() => {
                        AppBootboxStore.alert(
                            'Глобальный алерт! Отображает предупреждения',
                            APP_BOOTBOX_TYPES.WARNING
                        );
                    }}
                    className='ml-2'
                    size='sm'
                >
                    Алерт Warning
                </Button>
                <Button
                    onClick={() => {
                        AppBootboxStore.alert(
                            'Глобальный алерт! Отображает ошибки',
                            APP_BOOTBOX_TYPES.ERROR
                        );
                    }}
                    className='ml-2'
                    size='sm'
                >
                    Алерт Error
                </Button>
                <Button
                    onClick={() => {
                        AppBootboxStore.alert(
                            'Глобальный алерт! Отображает ошибки, а еще у него большой текст. Правда-правда этот текст будет длинне предsдущих, чтобы посмотреть как себя ведет крестик и не сползает ли он вниз.',
                            APP_BOOTBOX_TYPES.ERROR
                        );
                    }}
                    className='ml-2'
                    size='sm'
                >
                    Алерт Побольше
                </Button>
            </div>
        </div>
    );
};

TemplateModalPage.propTypes = {};
TemplateModalPage.defaultProps = {};