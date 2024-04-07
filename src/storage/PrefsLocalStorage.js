import { Order } from '../model/Order.js';

export class PrefsLocalStorage {
    order = Order.NEWEST_UP;

    constructor () {
        const prefs = JSON.parse(localStorage.getItem('prefs'));
        if (prefs !== null) {
            this.order = prefs.order;
        }
    }

    toggleOrder () {
        this.order =
            this.order === Order.NEWEST_UP
                ? Order.NEWEST_DOWN
                : Order.NEWEST_UP;
        this.setPrefs();
    }

    getOrder () {
        return this.order;
    }

    setPrefs () {
        const prefs = {
            order: this.order
        };
        localStorage.setItem('prefs', JSON.stringify(prefs));
    }
}
