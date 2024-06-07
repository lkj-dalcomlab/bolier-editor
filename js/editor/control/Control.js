export const WIDTH = 50;
export const HEIGHT = 50;
export class Control {
    constructor() {
        this._lineWidth = 1;
        this._lineColor = 'black';
        this._fillColor = 'none';
        this._select = false;
        this._hover = false;
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

    move(p) {
    }

    render(painter) {
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