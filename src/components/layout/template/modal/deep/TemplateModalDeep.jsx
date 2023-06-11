/** 1 NodeModules */
import React from "react";

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
import { Modal } from "@features/modal/Modal";

/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Демонстрация работы вложенных модальных окон
 *
 * @return {JSX.Element} DOM-элемент
 */
export const TemplateModalDeep = () => {

    return (
        <Modal>
            <Modal.ButtonShow
                className='ml-2'
            >
                Открыть вложенное модальное окно
            </Modal.ButtonShow>
            <Modal.Window>
                <Modal.WindowHeader>
                    Описание модалки
                </Modal.WindowHeader>
                <Modal.WindowBody>
                    1
                    <Modal>
                        <Modal.ButtonShow>
                            Открыть
                        </Modal.ButtonShow>
                        <Modal.Window
                            size="lg"
                        >
                            <Modal.WindowHeader>
                                Описание модалки
                            </Modal.WindowHeader>
                            <Modal.WindowBody>
                                2
                            </Modal.WindowBody>
                            <Modal.WindowFooter>
                                <Modal.ButtonAction
                                    onClick={({ methods: { setShow } }) => setShow(false)}
                                >
                                    Выполнить
                                </Modal.ButtonAction>
                            </Modal.WindowFooter>
                        </Modal.Window>
                    </Modal>
                </Modal.WindowBody>
                <Modal.WindowFooter>
                    <Modal.ButtonClose />
                    <Modal.ButtonAction />
                </Modal.WindowFooter>
            </Modal.Window>
        </Modal>
    );
};

TemplateModalDeep.propTypes = {};
TemplateModalDeep.defaultProps = {};