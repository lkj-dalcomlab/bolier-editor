import {ControlType, HEIGHT, WIDTH} from "./Control.js";
import {Polygon} from "./Polygon.js";
import {HoverTriangleRender} from "./render/HoverTriangleRender.js";
import {Point} from "./Point.js";
import {PointPosition} from "./PointPosition.js";

export class Triangle extends Polygon {
    constructor() {
        super();
        this._top = new Point(PointPosition.T);
        this._left = new Point(PointPosition.LB);
        this._right = new Point(PointPosition.RB);
        this.points.push(this._top);
        this.points.push(this._left);
        this.points.push(this._right);
    }

    get type() {
        return ControlType.TRIANGLE;
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

    updateSelectPosition() {
        super.updateSelectPosition();
        // this.minPoint.x = Math.min(this.top.x, Math.min(this.right.x, this.left.x));
        // this.minPoint.y = Math.min(this.top.y, Math.min(this.right.y, this.left.y));
        // this.maxPoint.x = Math.max(this.top.x, Math.max(this.right.x, this.left.x));
        // this.maxPoint.y = Math.max(this.top.y, Math.max(this.right.y, this.left.y));
    }

    move(p) {
        super.move(p);
    }

    resize(resizeType, p) {
        return super.resize(resizeType, p);
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
        return super.ptInControl(p);
    }

    ptInHoverControl(p) {
        if (this.ptInControl(p)) {
            return new HoverTriangleRender(this);
        }
        return null;
    }
}