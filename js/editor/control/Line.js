import {Control} from "./Control.js";
import {HoverLineRender} from "./render/HoverLineRender.js";

export class Line extends Control {
    constructor() {
        super();
        this._p1 = {x: 0, y: 0};
        this._p2 = {x: 0, y: 0};
    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    setPosition(p) {
        this.p1.x = p.x;
        this.p1.y = p.y;
        this.p2.x = p.x + 50;
        this.p2.y = p.y - 50;
    }

    move(p) {
        this.p1.x += p.x;
        this.p1.y += p.y;
        this.p2.x += p.x;
        this.p2.y += p.y;
    }

    render(painter) {
        painter.drawLine(this.p1, this.p2, this.lineColor, this.lineWidth);
    }

    ptInControl(p) {
    }

    ptInHoverControl(p) {
        if (this.ptInPoint(p)) {
            return new HoverLineRender(this);
        }
        return null;
    }

    ptInSelectControl(p) {
    }

    ptInPoint(p) {
        let x = p.x;
        let y = p.y;
        let x1 = this.p1.x;
        let y1 = this.p1.y;
        let x2 = this.p2.x;
        let y2 = this.p2.y;

        const a = Math.sqrt(((x2-x1)**2) + ((y2-y1)**2));
        const b = Math.sqrt(((x1-x)**2) + ((y1-y)**2));
        const c = Math.sqrt(((x2-x)**2) + ((y2-y)**2));
        const d = b + c - a;

        return d <= 1;
    }
}