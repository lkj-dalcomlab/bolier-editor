import {HoverLineRender} from "./render/HoverLineRender.js";
import {PointPosition} from "./PointPosition.js";
import {Polygon} from "./Polygon.js";
import {Point} from "./Point.js";

export class Line extends Polygon {
    constructor() {
        super();
        this._p1 = new Point(PointPosition.LT);
        this._p2 = new Point(PointPosition.RB);
        this.points.push(this.p1);
        this.points.push(this.p2);
    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    setPosition(p) {
        this.p1.x = p.x;
        this.p1.y = p.y;
        this.p2.x = p.x + 50;
        this.p2.y = p.y + 50;
    }

    updateSelectPosition() {
        super.updateSelectPosition();
    }

    move(p) {
        super.move(p);
    }

    resize(resizeType, p) {
        super.resize(resizeType, p);
    }

    render(painter) {
        painter.drawLine(this.p1, this.p2, this.lineColor, this.lineWidth, 1, this.lineStyle);
    }

    ptInControl(p) {
        let x = p.x;
        let y = p.y;
        let x1 = this.p1.x;
        let y1 = this.p1.y;
        let x2 = this.p2.x;
        let y2 = this.p2.y;

        const a = Math.sqrt(((x2-x1)**2) + ((y2-y1)**2));
        const b = Math.sqrt(((x1-x)**2) + ((y1-y)**2));
        const c = Math.sqrt(((x2-x)**2) + ((y2-y)**2));
        const d = b + c - a;

        return d <= 1;
    }

    ptInHoverControl(p) {
        if (this.ptInControl(p)) {
            return new HoverLineRender(this);
        }
        return null;
    }

    ptInSelectControl(p) {
        return super.ptInSelectControl(p);
    }
}