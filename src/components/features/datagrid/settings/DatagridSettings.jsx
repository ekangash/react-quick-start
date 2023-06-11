/** 1 NodeModules */
import { TABLE_PAGINATION } from '@enums/table/Table';
import React, { useState } from 'react';

/** 2 Config, Packages, Endpoints, Enums */
import { MESSAGES_SETTINGS } from '@enums/common/Messages';
import { Arr } from '@packages/helpers/array/Arr';

/** 3 Components, Hooks, Icons - NodeModules */
import { Col, Row } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';

/** 4 Components, Hooks - Custom */
import { Modal } from '@features/modal/Modal';
import { Form } from '@features/form/Form';
import { DatagridSettingsColumns } from '@features/datagrid/settings/columns/DatagridSettingsColumns';
import { useDatagridContext } from '@features/datagrid/context/DatagridContext';

/** 5 Entities, Stores, Services */
import { AppBootboxStore } from '@store/app/AppBootbox';

/** 6 Resources */
import '@features/datagrid/settings/columns/DatagridSettingsColumns.scss';

/**
 * Настройки таблицы
 *
 * @return {JSX.Element} DOM-элемент
 */
export const DatagridSettings = () => {
    const { collection, columns } = useDatagridContext();
    const [ loadingText, setLoadingText ] = useState('');

    const timeout = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <Modal>
            <Modal.ButtonShow
                variant='outline-secondary'
                size='sm'
            >
                <Icon path={mdiCog} size={0.8} />
            </Modal.ButtonShow>
            <Modal.Window
                backdrop={'static'}
                keyboard={false}
                size='lg'
                onShow={() => setLoadingText('')}
            >
                {({ methods: { setShow } }) => {
                    let settings = collection.getSettings();

                    return (
                        <>
                            <Modal.WindowHeader>
                                <Icon path={mdiCog} className='mr-2' size={1} />
                                Настройка таблицы
                            </Modal.WindowHeader>
                            <Modal.WindowBody>
                                <Form
                                    entity={settings}
                                    attributes={[ 'perPage', 'columns' ]}
                                    onSubmit={async (settings) => {
                                        const activeColumns = Array.from(settings.attribute('columns')).filter(column => column.active);

                                        if (!Arr.empty(activeColumns)) {
                                            setLoadingText(MESSAGES_SETTINGS.SAVE);
                                            collection.forSettings(settings);
                                            await timeout();
                                            settings.patchIntoLocalStorage();
                                            setShow(false);
                                            collection.fetch();
                                        } else {
                                            AppBootboxStore.alert(MESSAGES_SETTINGS.WARNING);
                                        }
                                    }}
                                >
                                    <Modal.FormProvider/>
                                    <Modal.Preloader loadingText={loadingText}>
                                        <Row className={'mb-2'}>
                                            <Col xs={6}>
                                                    <Form.ControlAddon
                                                        name='perPage'
                                                        type='number'
                                                        text='Число от 1 и до 1000'
                                                        textAddon='строк на странице'
                                                    />
                                            </Col>
                                        </Row>
                                        <Row className={'mb-2'}>
                                            <Col xs={12}>
                                                <DatagridSettingsColumns />
                                            </Col>
                                        </Row>
                                    </Modal.Preloader>
                                </Form>
                            </Modal.WindowBody>
                            <Modal.WindowFooter>
                                {
                                    !loadingText && <>
                                        <Modal.ButtonClose
                                            onClick={({ methods: { setShow } }) => {
                                                AppBootboxStore.confirm(
                                                    MESSAGES_SETTINGS.CANCEL,
                                                    async() => {
                                                        setLoadingText(MESSAGES_SETTINGS.DELETE);

                                                        try {
                                                            await timeout();
                                                            settings.deleteFromLocalStorage();
                                                            collection.forColumns(columns);
                                                            collection.where((query) => query.perPage(TABLE_PAGINATION.PEAR_PAGE));
                                                            setShow(false);
                                                            collection.fetch();
                                                        } catch (err) {
                                                            console.log(MESSAGES_SETTINGS.EDIT_ERR, err)
                                                        }
                                                    }
                                                );
                                            }}
                                        >
                                            Сбросить
                                        </Modal.ButtonClose>
                                        <Modal.ButtonAction
                                            variant={'primary'}
                                            type={'submit'}
                                            form={settings.key}
                                        >
                                            Применить
                                        </Modal.ButtonAction>
                                    </>
                                }
                            </Modal.WindowFooter>
                        </>
                    );
                }}
            </Modal.Window>
        </Modal>
    );
};

DatagridSettings.propTypes = {};
DatagridSettings.defaultProps = {};