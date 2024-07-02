import {HoverCircleRender} from "./render/HoverCircleRender.js";
import {PointPosition} from "./PointPosition.js";
import {Rect} from "./Rect.js";

export class Circle extends Rect {
    constructor() {
        super();
    }

    get p() {
        return {x: (this.rb.x + this.lt.x)/2, y: (this.rb.y + this.lt.y)/2};
    }

    get xRadius() {
        return Math.abs(this.rb.x - this.lt.x)/2;
    }

    get yRadius() {
        return Math.abs(this.rb.y - this.lt.y)/2;
    }

    resize(resizeType, p) {
        super.resize(resizeType, p);
    }

    updateSelectPosition() {
        super.updateSelectPosition();
    }

    move(p) {
        super.move(p);
    }

    setPosition(p) {
        super.setPosition(p);
    }

    render(painter) {
        const ctx = painter.ctx;
        painter.start();
        painter.lineOption(this.lineColor, this.lineWidth, 1, this.lineStyle);
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