export default class EventBus {

    #subs = [];

    sub(eventName, event) {
        if (!this.#subs[eventName]) {
            this.#subs[eventName] = [];
        }

        this.#subs[eventName].push(event);
    }

    pub(eventName, payload) {
        for (let i = 0; i < this.#subs[eventName].length; i++) {
            this.#subs[eventName][i](payload);
        }
    }

}