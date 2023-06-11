/** 1 NodeModules */
import React  from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Col, Row } from 'react-bootstrap';

/** 4 Components, Hooks - Custom */
import { Modal } from "@features/modal/Modal";
import { Form } from "@features/form/Form";
import { useConst } from "@hooks/useConst";

/** 5 Entities, Stores, Services */
import { Profile } from "@entities/public/Profile";

/** 6 Resources */

/**
 * Демонстрация работы модального окна с формой
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateModalForm = () => {
    const profile = useConst(new Profile());

    const columns = useConst([
        {name: 'id', filter: { name: 'input' }, sort: true},
        {name: 'name', filter: { name: 'input' }, sort: true},
        {name: 'parent_id', filter: { name: 'input' }, sort: true},
        {name: 'short_name', filter: { name: 'input' }, sort: true},
    ]);

    return (
        <Modal>
            <Modal.ButtonShow
                className='ml-2'
            >
                Модальное окно с формой и чузером
            </Modal.ButtonShow>
            <Modal.Window
                size="lg"
            >
                <Modal.WindowHeader>
                    Описание модалки
                </Modal.WindowHeader>
                <Modal.WindowBody>
                    <Form
                        entity={profile}
                        attributes={[
                            'email', 'mobile_number'
                        ]}
                        className="p-3"
                        onSubmit={(entity, values) => {
                            console.log('onSubmit fillable attributes', entity.getFillableAttributes());
                        }}
                    >
                        <h5>Обычные поля</h5>
                        <Row className={'mb-2'}>
                            <Col xs={6}>
                                <Form.Control
                                    name="email"
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Chooser
                                    forEntity={Profile}
                                    name={'parent_id'}
                                    columns={columns}
                                    relationName="parent"
                                    onInputValue={(profileEntity) => profileEntity.attribute('name')}
                                    onFormValue={(profileEntity) => profileEntity.attribute('id')}
                                    onEntityCached={(profile, chooserValue) => profile.setProperty('selected', profile.attribute('id') === chooserValue)}
                                    single
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.WindowBody>
                <Modal.WindowFooter>
                    <Modal.ButtonClose />
                    <Modal.ButtonAction
                        onClick={() => {
                            console.log('Выполнение операции submit формы');
                        }}
                        form={profile.key}
                    >
                        Отправить
                    </Modal.ButtonAction>
                </Modal.WindowFooter>
            </Modal.Window>
        </Modal>
    );
};

TemplateModalForm.propTypes = {};
TemplateModalForm.defaultProps = {};