import {Polygon} from "./Polygon.js";
import {HEIGHT, WIDTH} from "./Control.js";

export class Rect extends Polygon {
    constructor() {
        super();
        this.fillColor = 'rgb(127,227,142)';
        this._lt = { x:0, y:0 };
        this._rt = { x:0, y:0 };
        this._rb = { x:0, y:0 };
        this._lb = { x:0, y:0 };
        this.points.push(this._lt);
        this.points.push(this._rt);
        this.points.push(this._rb);
        this.points.push(this._lb);
    }

    get lt() {
        return this._lt;
    }

    get rt() {
        return this._rt;
    }

    get rb() {
        return this._rb;
    }

    get lb() {
        return this._lb;
    }

    get width() {
        return this._rt.x - this._lt.x;
    }

    get height() {
        return this._lt.y - this._lb.y;
    }

    move(p) {
        this.points.forEach(pt => {
            pt.x += p.x;
            pt.y += p.y;
        });
    }

    setPosition(p) {
        this._lt.x = p.x;
        this._lt.y = p.y;

        this._rt.x = p.x + WIDTH;
        this._rt.y = p.y;

        this._rb.x = p.x + WIDTH;
        this._rb.y = p.y + HEIGHT;

        this._lb.x = p.x;
        this._lb.y = p.y + HEIGHT;
    }

    render(painter) {
        super.render(painter);
    }

    ptInControl(p) {
    }

    ptInHoverControl(p) {
    }

    ptInSelectControl(p) {
    }

    ptInPoint(p) {
    }
}