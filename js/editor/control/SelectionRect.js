import {Rect} from "./Rect.js";

export class SelectionRect {
    constructor() {
        this._rect = new Rect();
        this._rect.lineColor = 'rgb(53,155,255)';
        this._rect.lineWidth = 1;
    }

    get rect() {
        return this._rect;
    }

    updatePosition(p1, p2) {
        const rect = this._rect;
        rect.lt.x = p1.x;
        rect.lt.y = p1.y;
        rect.rb.x = p2.x;
        rect.rb.y = p2.y;
        rect.rt.x = p2.x;
        rect.rt.y = p1.y;
        rect.lb.x = p1.x;
        rect.lb.y = p2.y;
    }
}