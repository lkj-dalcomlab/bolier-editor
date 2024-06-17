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

    updateSelectPosition() {
    }

    move(p) {
    }

    setPosition(p) {
    }

    render(painter) {
    }

    ptInControl(p) {
    }

    ptInHoverControl(p) {
    }

    ptInSelectControl(p) {
    }
}