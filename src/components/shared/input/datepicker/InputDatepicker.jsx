/** 1 NodeModules */
import React from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";
import ru from 'date-fns/locale/ru';

/** 2 Config, Packages, Endpoints, Enums */
import { Str } from "@packages/helpers/string/Str";
import { Date as DateHelper } from '@packages/helpers/date/Date';

/** 3 Components, Hooks, Icons - NodeModules */
import DatePicker, { registerLocale } from "react-datepicker";
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline, mdiCloseThick } from '@mdi/js';

/** 4 Components, Hooks - Custom */
/** 5 Entities Stores, Services */
/** 6 Resources */
import 'react-datepicker/dist/react-datepicker.css';
import '@shared/input/datepicker/InputDatepicker.scss';

registerLocale('ru', ru);

/**
 * Поле выбора даты
 *
 * @param {Function|null} [onChange=null] Callback-функция для события изменения значения
 * @param {Function|null} [onBlur=null] Callback-функция для события сняния фокуса
 * @param {string} [value=''] Значение
 * @param {string} [placeholder=''] Плейсхолдер
 * @param {string} [name=''] Наименование поля
 * @param {boolean} [showIcon=true] Показывать ли иконку календаря внутри поля ввода
 * @param {boolean} [showClear=true] Показывать ли кнопку очищения поля
 * @param {Function} [onClearBtnClick=() => {}] Callback-функция очищения поля
 * @param {boolean} [disabled=false] Заблокировать ли поле
 *
 * @return {JSX.Element} DOM-элемент
 */
export const InputDatepicker = ({
    onChange,
    onBlur,
    value,
    placeholder,
    name,
    showIcon,
    showClear,
    onClearBtnClick,
    disabled,
}) => {

    /**
     * Обрабатывает изменение значения
     *
     * @param {Date} dateUTC Объект даты
     *
     * @return {void}
     */
    const onChangeHandler = (dateUTC) => {
        let dateISO = DateHelper.convertUTCToISO(dateUTC);

        if (onChange) {
            onChange(dateISO);
        }

        if (onBlur) {
            onBlur(dateISO);
        }
    };

    /**
     * Обрабатывает клик на кнопку очищения поля
     *
     * @return {void}
     */
    const onClearBtnClickHandler = () => {
        if (onClearBtnClick && !disabled) {
            onClearBtnClick();
        }
    };

    /**
     * Обрабатывает снятие фокуса с поля
     *
     * @param {Date} dateUTC Объект даты
     *
     * @return {void}
     */
    const onBlurHandler = (dateUTC) => {
        let dateISO = DateHelper.convertUTCToISO(dateUTC);

        if (onBlur) {
            onBlur(dateISO);
        }
    };

    const valueIsDefined = Str.contains(value);

    return (
        <div className="react-datepicker__inner-container">
            <span className={classNames('datepicker__icons', {
                'datepicker__icons_both': showIcon && showClear && valueIsDefined,
                'datepicker__icons_one': showIcon || showClear,
                'datepicker__icons_disabled': disabled,
            })}>
                {showIcon && <span className="datepicker__icon datepicker__icon_calendar"><Icon path={mdiCalendarMonthOutline} size={0.8} /></span>}
                {showClear && valueIsDefined && <span
                    className="datepicker__icon datepicker__icon_clear"
                    onClick={onClearBtnClickHandler}
                >
                    <Icon path={mdiCloseThick} size={0.6} />
                </span>}
            </span>
            <DatePicker
                selected={DateHelper.convertISOToUTC(value)}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                placeholderText={placeholder}
                name={name}
                locale='ru'
                dateFormat="dd.MM.yyyy"
                portalId="root"
                popperModifiers={[
                    {
                        name: 'arrow',
                        options: { padding: 24 },
                    },
                ]}
                disabled={disabled}
            />
        </div>
    );
};

InputDatepicker.propTypes = {
    onChange: propTypes.oneOfType([
        propTypes.func,
        propTypes.instanceOf(null),
    ]),
    onBlur: propTypes.oneOfType([
        propTypes.func,
        propTypes.instanceOf(null),
    ]),
    value: propTypes.string,
    placeholder: propTypes.string,
    name: propTypes.string,
    showIcon: propTypes.bool,
    showClear: propTypes.bool,
    onClearBtnClick: propTypes.func,
    disabled: propTypes.bool,
};

InputDatepicker.defaultProps = {
    onChange: null,
    onBlur: null,
    value: '',
    placeholder: '',
    name: '',
    showIcon: true,
    showClear: true,
    onClearBtnClick: () => {},
    disabled: false,
};