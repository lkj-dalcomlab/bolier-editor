import {Control, HEIGHT, WIDTH} from "./Control.js";

export class Circle extends Control {
    constructor() {
        super();
        this.fillColor = 'rgb(127,227,142)';
        this._p = { x:0, y:0 };
        this._xRadius = WIDTH/2;
        this._yRadius = HEIGHT/2;
    }

    get p() {
        return this._p;
    }

    get xRadius() {
        return this._xRadius;
    }

    set xRadius(value) {
        this._xRadius = value;
    }

    get yRadius() {
        return this._yRadius;
    }

    set yRadius(value) {
        this._yRadius = value;
    }

    move(p) {
        super.move(p);
    }

    setPosition(p) {
        this.p.x = p.x + WIDTH/2;
        this.p.y = p.y + HEIGHT/2;
    }

    render(painter) {
        const ctx = painter.ctx;
        painter.start();
        painter.lineOption(this.lineColor, this.lineWidth);
        ctx.ellipse(this.p.x, this.p.y, this.xRadius, this.yRadius, 0, 0, 2*Math.PI);
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