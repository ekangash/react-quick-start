/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */
import loading  from '@common/images/loading.gif';
import '@features/modal/preloader/ModalPreloader.scss';

/**
 * Загрузчик модального окна настроек
 *
 * @param {!(string|React.ReactNode)} children Дочерние DOM узлы
 * @param {string} [loadingText=''] Текст загрузчика
 *
 * @return {JSX.Element} DOM узлы
 */
export const ModalPreloader = ({children, loadingText}) => {
    return (
        <>
            {loadingText ? (
                <div className='modal-preloader'>
                    <img src={loading} alt='Загрузчик'/>
                    <p className='modal-preloader__text'>{loadingText}</p>
                </div>
            ) : children}
        </>
    );
};

ModalPreloader.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.element),
        propTypes.element,
        propTypes.string,
    ]).isRequired,
    loadingText: propTypes.string,
};

ModalPreloader.defaultProps = {
    loadingText: '',
};