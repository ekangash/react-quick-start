import { makeAutoObservable } from "mobx";

/**
 * Хранилище состояния для модальных окон
 *
 * @class
 */
class AppModal {

    /**
     * Уровень вложенности модальных окон.
     *
     * @type {number}
     */
    level = 0

    /**
     * Конструктор хранилища
     *
     * @constructor
     */
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Увеличивает вложенность модальных окон
     *
     * @return {void}
     */
    incrementLevel() {
        this.level += 1;
    }

    /**
     * Убавляет вложенность модальных окон
     *
     * @return {void}
     */
    decrementLevel() {
        this.level -= 1;
    }
}

/**
 * Экземпляр хранилища состояния модальных окон
 *
 * @type {AppModal}
 */
export const AppModalStore = new AppModal();