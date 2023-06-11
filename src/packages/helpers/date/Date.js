/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/**
 * Вспомогательные методы для работы с датами
 *
 * @type {object}
 */
export const Date = {

    /**
     * Дополняет строку до заданной длины
     *
     * @param {string} value Значение, заполняемое до нужной длины
     * @param {number} [targetLength=2] Длина итоговой строки
     * @param {string} [padString='0'] Заполнение
     *
     * @return {string} Отформатированная строка
     */
    pad(value, targetLength = 2, padString = '0') {
        return value.padStart(targetLength, padString);
    },

    /**
     * Конвертирует дату из формата ISO в UTC
     *
     * @param {string} dateISO Дата в формате ISO (строка)
     *
     * @return {Date} Дата в формате UTC
     */
    convertISOToUTC(dateISO) {
        const dateIsoInstance = new window.Date(dateISO);

        if (isNaN(dateIsoInstance.getUTCDate())) {
            return '';
        }

        return dateIsoInstance;
    },

    /**
     * Возвращает строковое представление даты без времени
     *
     * @param {Date} dateUTC Объект даты
     *
     * @return {string} Дату без времени в строковом формате
     */
    convertUTCToISODate(dateUTC) {
        if (!(dateUTC instanceof window.Date)) {
            return '';
        }

        const month = this.pad(`${dateUTC.getMonth() + 1}`);
        const day = this.pad(`${dateUTC.getDate()}`);

        return `${dateUTC.getFullYear()}-${month}-${day}`;
    },

    /**
     * Возвращает строковое представление времени без даты
     *
     * @param {Date} dateUTC Объект даты
     *
     * @return {string} Время без даты в строковом формате
     */
    convertUTCToISOTime(dateUTC) {
        if (!(dateUTC instanceof window.Date)) {
            return '';
        }

        const hour = this.pad(`${dateUTC.getHours()}`);
        const minutes = this.pad(`${dateUTC.getMinutes()}`);
        const seconds = this.pad(`${dateUTC.getSeconds()}`);

        return `${hour}:${minutes}:${seconds}`;
    },

    /**
     * Конвертирует дату из формата UTC в ISO
     *
     * @param {string} dateUTC Дата в формате UTС (объект)
     *
     * @return {string} Дата в формате ISO
     */
    convertUTCToISO(dateUTC) {
        if (!(dateUTC instanceof window.Date)) {
            return '';
        }

        return `${this.convertUTCToISODate(dateUTC)} ${this.convertUTCToISOTime(dateUTC)}`;
    },
};