import {SelectControlRender} from "./render/SelectControlRender.js";
import {SelectionRect} from "./SelectionRect.js";
import {ControlUtil} from "./ControlUtil.js";
import {PointPosition} from "./PointPosition.js";

export const WIDTH = 50;
export const HEIGHT = 50;
export class Control {
    constructor() {
        this._lineWidth = 1;
        this._lineColor = 'black';
        this._fillColor = 'rgb(189,246,197)';
        this._select = false;
        this._hover = false;
        this._minPoint = { x: 0, y: 0};
        this._maxPoint = { x: 0, y: 0};
        this._width = 0;
        this._height = 0;
        this.selectionRect = new SelectionRect();
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this._lineWidth = value;
    }

    get lineColor() {
        return this._lineColor;
    }

    set lineColor(value) {
        this._lineColor = value;
    }

    get fillColor() {
        return this._fillColor;
    }

    set fillColor(value) {
        this._fillColor = value;
    }

    get select() {
        return this._select;
    }

    set select(b) {
        this._select = b;
    }

    get hover() {
        return this._hover;
    }

    set hover(value) {
        this._hover = value;
    }

    get minPoint() {
        return this._minPoint;
    }

    get maxPoint() {
        return this._maxPoint;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    updateSelectPosition() {
    }

    move(p) {
    }

    resize(resizeType, p) {
    }

    setPosition(p) {
    }

    render(painter) {
    }

    ptInControl(p) {
        return false;
    }

    ptInHoverControl(p) {
        return null;
    }

    ptInSelectControl(p) {
        if (this.ptInControl(p)) {
            return new SelectControlRender(this);
        }
        return null;
    }

    ptInResizePoint(p) {
        this.selectionRect.updatePosition(this.minPoint, this.maxPoint);
        const lt = this.selectionRect.lt;
        const rt = this.selectionRect.rt;
        const rb = this.selectionRect.rb;
        const lb = this.selectionRect.lb;

        if (this.#checkPoint(ControlUtil.generateResizeRect(lt), p)) {
            return PointPosition.LT;
        }

        if (this.#checkPoint(ControlUtil.generateResizeRect(rt), p)) {
            return PointPosition.RT;
        }

        if (this.#checkPoint(ControlUtil.generateResizeRect(rb), p)) {
            return PointPosition.RB;
        }

        if (this.#checkPoint(ControlUtil.generateResizeRect(lb), p)) {
            return PointPosition.LB;
        }

        return PointPosition.NONE;
    }

    #checkPoint(rect, p) {
        return (rect.lt.x <= p.x && p.x <= rect.rb.x &&
                rect.lt.y <= p.y && p.y <= rect.rb.y)
    }
}