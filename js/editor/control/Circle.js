import {Control, HEIGHT, WIDTH} from "./Control.js";

export class Circle extends Control {
    constructor() {
        super();
        this.fillColor = 'rgb(127,227,142)';
        this._p = { x:0, y:0 };
        this._radius = WIDTH/2;
    }

    get p() {
        return this._p;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    move(p) {
        super.move(p);
    }

    setPosition(p) {
        this.p.x = p.x;
        this.p.y = p.y;
    }

    render(painter) {
        const ctx = painter.ctx;
        painter.start();
        painter.lineOption(this.lineColor, this.lineWidth);
        ctx.arc(this.p.x, this.p.y, this.radius, 0, 2*Math.PI);
        painter.lineEnd();
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        painter.end();
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