import {Rect} from "./Rect.js";

export class Label extends Rect {
    constructor() {
        super();
        this._text = '';
        this._fontSize = 5;
        this._fontColor = 'rgb(0, 0, 0)';
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    set fontSize(value) {
        this._fontSize = value;
    }

    set fontColor(value) {
        this._fontColor = value;
    }

    render(painter) {
        painter.drawText(this.lt, this._text);
    }
}