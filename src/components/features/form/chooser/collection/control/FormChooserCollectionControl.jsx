/** 1 NodeModules */
import React, { useRef }  from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
import { Button, Col, FormControl } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";

/** 4 Components, Hooks - Custom */
import { Modal } from "@features/modal/Modal";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Элементы управления чузером
 *
 * @param {string[]|string|number} [value=''] Значение чузера
 * @param {string} [heading=''] Заголовок модального окна
 * @param {Function} [onOpen=() => null] Функция-обработчик открытия модального окна
 * @param {Function} [onSelected=() => null] Функция-обрабортчик выбора значения
 * @param {Function} [onDeselected=() => null] Функция-обработчик клика на кнопку удаления значения
 * @param {!(JSX.Element[]|JSX.Element|string)} children Дочерний элемент модального окна
 * @param {string} [placeholder=''] Плейсхолдер
 * @param {string[]} [className=['']] Массив классов
 * @param {function} [onBlur=() => null] Функция-обработчик снятия фокуса
 * @param {string[]} [inputClassName=[]] Класс input поля
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormChooserCollectionControl = ({
    value,
    heading,
    onOpen,
    onSelected,
    onDeselected,
    children,
    placeholder,
    className,
    onBlur,
    inputClassName,
}) => {
    const buttonOpenModalRef = useRef();

    /**
     * Обрабатывает событие на кнопку "Выбрать" в диалоговом окне
     * Инициализирует событие выбора и закрывает модальное окно
     *
     * @function
     *
     * @return {void}
     */
    const onSelectedDialog = ({ methods: { setShow } }) => {
        onSelected();
        setShow(false);
    };

    /**
     * Открывает модальное окно
     *
     * @function
     *
     * @return {void}
     */
    const onButtonOpenClick = ({ methods: { setShow } }) => {
        onOpen();
        setShow(true);
    };

    /**
     * Выполняет событие клика на поле текста.
     *
     * @function
     *
     * @return {void}
     */
    const onFormControlClick = () => showButtonRef.current.closest('button').click();

    /**
     * Обрабатывает клик на кнопку закрития модального окна выбора значения чузера
     *
     * @param {object} modalContext Контекст модального окна
     *
     * @return {void}
     */
    const onCloseButtonClick = (modalContext) => {
        onBlur();
        modalContext.methods.setShow(false);
    };

    return (
        <>
            <Modal>
                <div className={classNames('form-row', ...className)}>
                    <Col>
                        <FormControl
                            value={value}
                            type={'text'}
                            placeholder={placeholder}
                            onClick={() => buttonOpenModalRef.current.closest('button').click()}
                            readOnly
                            className={classNames(...inputClassName)}
                        />
                    </Col>
                    <Col xs={'auto'}>
                        <Modal.ButtonShow
                            variant={'secondary'}
                            size="sm"
                            onClick={onButtonOpenClick}
                        >
                            <span
                                ref={buttonOpenModalRef}
                            >
                                Выбрать
                            </span>
                        </Modal.ButtonShow>
                        <Button
                            onClick={onDeselected}
                            variant={'danger'}
                            className="ml-2"
                            size="sm"
                        >
                            <Icon path={mdiCloseCircle} size={0.8} className={'remove-button-icon'} />
                        </Button>
                    </Col>
                </div>
                <Modal.Window
                    size="xl"
                    onHide={onCloseButtonClick}
                >
                    <Modal.WindowHeader>
                        {heading}
                    </Modal.WindowHeader>
                    <Modal.WindowBody>
                        {children}
                    </Modal.WindowBody>
                    <Modal.WindowFooter>
                        <Modal.ButtonClose onClick={onCloseButtonClick}/>
                        <Modal.ButtonAction
                            onClick={onSelectedDialog}
                        >
                            Выбрать
                        </Modal.ButtonAction>
                    </Modal.WindowFooter>
                </Modal.Window>
            </Modal>
        </>
    );
};

FormChooserCollectionControl.propTypes = {
    value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.arrayOf(propTypes.string),
    ]),
    heading: propTypes.string,
    onOpen: propTypes.func,
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
    ]).isRequired,
    placeholder: propTypes.string,
    onSelected: propTypes.func,
    onDeselected: propTypes.func,
    className: propTypes.array,
    onBlur: propTypes.func,
    inputClassName: propTypes.arrayOf(propTypes.string),
};

FormChooserCollectionControl.defaultProps = {
    value: '',
    placeholder: '',
    className: [''],
    heading: '',
    onSelected: () => null,
    onOpen: () => null,
    onDeselected: () => null,
    onBlur: () => null,
    inputClassName: [],
};