import {Control, HEIGHT, WIDTH} from "./Control.js";
import {HoverCircleRender} from "./render/HoverCircleRender.js";
import {SelectControlRender} from "./render/SelectControlRender.js";

export class Circle extends Control {
    constructor() {
        super();
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

    updateSelectPosition() {
        this.minPoint.x = this.p.x - this.xRadius;
        this.minPoint.y = this.p.y - this.yRadius;
        this.maxPoint.x = this.p.x + this.xRadius;
        this.maxPoint.y = this.p.y + this.yRadius;
    }

    move(p) {
        this.p.x += p.x;
        this.p.y += p.y;
    }

    setPosition(p) {
        this.p.x = p.x + WIDTH / 2;
        this.p.y = p.y + HEIGHT / 2;
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
        const circlePoint = this.p;
        const dx = p.x - circlePoint.x;
        const dy = p.y - circlePoint.y;
        return (dx * dx) / (this.xRadius * this.xRadius) + (dy * dy) / (this.yRadius * this.yRadius) <= 1;
    }

    ptInHoverControl(p) {
        if (this.ptInControl(p)) {
            return new HoverCircleRender(this);
        }
        return null;
    }

    ptInSelectControl(p) {
        return super.ptInSelectControl(p);
    }
}