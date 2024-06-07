import {Control, HEIGHT, WIDTH} from "./Control.js";
import {Polygon} from "./Polygon.js";

export class Triangle extends Polygon {
    constructor() {
        super();
        this.fillColor = 'rgb(127,227,142)';
        this._top = { x:0, y:0 };
        this._left = { x:0, y:0 };
        this._right = { x:0, y:0 };
        this.points.push(this._top);
        this.points.push(this._left);
        this.points.push(this._right);
    }

    get top() {
        return this._top;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    move(p) {
        super.move(p);
    }

    setPosition(p) {
        this.top.x = p.x + WIDTH/2;
        this.top.y = p.y;
        this.left.x = p.x;
        this.left.y = p.y + HEIGHT;
        this.right.x = p.x + WIDTH;
        this.right.y = p.y + HEIGHT;
    }

    render(painter) {
        super.render(painter);
    }

    ptInControl(p) {
        super.ptInControl(p);
    }

    ptInHoverControl(p) {
        super.ptInHoverControl(p);
    }

    ptInSelectControl(p) {
        super.ptInSelectControl(p);
    }

    ptInPoint(p) {
        super.ptInPoint(p);
    }
}