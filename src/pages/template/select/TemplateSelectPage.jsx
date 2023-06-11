/** 1 NodeModules */
import React from 'react';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Button } from "react-bootstrap";

/** 4 Components, Hooks - Custom */
import { Profile } from "@entities/public/Profile";
import { Select } from '@shared/select/Select';
import { Form } from '@features/form/Form';

import { useConst } from "@hooks/useConst";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Страница шаблона селекта.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateSelectPage = () => {
    const options = useConst([
        { value: 1, label: 'S1' },
        { value: 2, label: 'E1' },
        { value: 3, label: 'VC4' },
        { value: 4, label: 'S16' },
        { value: 5, label: 'S64' },
        { value: 6, label: 'VC12' },
    ]);
    const entity = useConst(() => new Profile());

    return (
        <div className='card p-4'>
            <Select options={options} label='Уровень сигнала'/>

            <div className='card p-3 mt-3'>
                <h4 className='mb-4'>Форма</h4>
                <Form
                    onSubmit={(entity, values) => console.log('Form submit', entity, values)}
                    entity={entity}
                    attributes={[
                        'fullname', 'mobile_number', 'email', 'is_active', 'login'
                    ]}
                >
                    <Form.Select
                        forEntity={Profile}
                        attrName={'email'}
                        name={'room'}
                    />

                    <Button type='submit'>
                        Отправить
                    </Button>
                </Form>
            </div>
        </div>
    );
};

TemplateSelectPage.propTypes = {};
TemplateSelectPage.defaultProps = {};