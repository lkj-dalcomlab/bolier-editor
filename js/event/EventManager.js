import {Event} from './Event.js'
import {MouseSnapEventHandler} from "./MouseSnapEventHandler.js";

export class EventManager {
    constructor(editor) {
        this.event = new Event(editor);
        this.handlers = new Map();
        this.addHandler(new MouseSnapEventHandler());
    }

    addHandler(handler) {
        this.handlers.set(handler.type, handler);
    }

    removeHandler(handler) {
        this.handlers.delete(handler.type);
    }

    onMouseDown(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onMouseDown(this.event);
        });
    }

    onMouseMove(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onMouseMove(this.event);
        });
    }

    onMouseUp(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onMouseUp(this.event);
        });
    }

    onKeyDown(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onKeyDown(this.event);
        });
    }

    onMouseWheel(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onMouseWheel(this.event);
        });
    }

    onKeyUp(e) {
        this.#setEvent(e);
        this.handlers.forEach(h => {
            h.onKeyUp(this.event);
        });
    }

    #setEvent(e) {
        this.event.originEvent = e;
    }
}