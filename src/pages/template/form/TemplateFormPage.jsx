/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Button, Col, Row } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { Form } from "@features/form/Form";
import { InputDatepicker } from "@shared/input/datepicker/InputDatepicker";
import { useConst } from "@hooks/useConst";

/** 5 Entities, Stores, Services */
import { Profile } from "@entities/public/Profile";

/** 6 Resources */

/**
 * Страница макета формы.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateFormPage = () => {
    const profile = useConst(() => {
        let profile = new Profile();

        if (localStorage.hasOwnProperty('profile')) {
            profile.fill(JSON.parse(localStorage.getItem('profile')));
        }

        return profile;
    })
    const columns = useConst([
        { name: 'id', filter: { name: 'input' } },
        { name: 'email', filter: { name: 'input' } },
    ]);

    return (
        <Form
            entity={profile}
            attributes={['email']}
            className="card p-3"
            onSubmit={(entity, value) => {
                console.log(entity, value);
                localStorage.setItem('profile', JSON.stringify(entity.getFillableAttributes()))
            }}
        >
            <h5>Обычные поля</h5>
            <Row className={'mb-2'}>
                <Col xs={6}>
                    <Form.File
                        name="email"
                        placeholder
                    />
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name="email"
                        readOnly
                    />
                </Col>
            </Row>
            <h5>Чузеры сингл и мултипле</h5>
            <Row className={'mb-2'}>
                <Col xs={6}>
                    <Form.Chooser
                        forEntity={Profile}
                        name={'email'}
                        columns={columns}
                        onInputValue={(entity) => entity.attribute('email')}
                        onFormValue={(entity) => entity.attribute('id')}
                        onEntityCached={(entity, chooserValue) => entity.setProperty('selected', entity.attribute('id') === chooserValue)}
                        single
                    />
                </Col>
                <Col xs={6}>
                    <Form.Chooser
                        forEntity={Profile}
                        name={'email'}
                        columns={columns}
                        onInputValue={(entity) => entity.attribute('email')}
                        onFormValue={(entity) => ({ owner_id: entity.attribute('id') })}
                        onEntityCached={(entity, chooserValue) => entity.setProperty('selected', chooserValue.some((object) => object.owner_id === entity.attribute('id')))}
                        multiple
                    />
                </Col>
            </Row>

            <Row className='d-flex align-items-end'>
                <Col xs={6}>
                    <Form.Datepicker
                        label='Дата'
                        name={'is_active'}

                    />
                </Col>

                <Col xs={6}>
                    <Form.Select
                        forEntity={Profile}
                        attrName={'room'}
                        name={'room'}
                        selectSettings={{
                            listHeight: '200px',
                            multiple: true,
                        }}
                    />
                </Col>
            </Row>

            <div className={'m-3'}>
                <InputDatepicker onChange={(date) => console.log('date', date)} showIcon={false} showClose={true}/>
            </div>

            <Button
                className="ml-auto"
                type="submit"
                variant="primary"
                size="sm"
            >
                Отправить
            </Button>
        </Form>
    );
};

TemplateFormPage.propTypes = {};
TemplateFormPage.defaultProps = {};