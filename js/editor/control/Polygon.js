import {Control} from "./Control.js";
import {PointPosition} from "./PointPosition.js";

export class Polygon extends Control {
    constructor() {
        super();
        this._points = [];
    }

    get points() {
        return this._points;
    }

    resize(resizeType, p) {
        this._points.forEach(p_=> {
            switch (resizeType) {
                case PointPosition.LT:
                    this.#resizeLeftTop(p, p_);
                    break;
                case PointPosition.RT:
                    this.#resizeRightTop(p, p_);
                    break;
                case PointPosition.RB:
                    this.#resizeRightBottom(p, p_);
                    break;
                case PointPosition.LB:
                    this.#resizeLeftBottom(p, p_);
                    break;
            }
        });
    }

    #resizeLeftTop(p1, p2) {
        switch (p2.position) {
            case PointPosition.RB:
                return;
            case PointPosition.LT:
                p2.x += p1.x;
                p2.y += p1.y;
                break;

            case PointPosition.LB:
                p2.x += p1.x;
                break;
            case PointPosition.RT:
                p2.y += p1.y;
                break;

            case PointPosition.T:
                p2.y += p1.y;
            case PointPosition.B:
                p2.x += p1.x * p2.xRatio;
                break;

            case PointPosition.L:
                p2.x += p1.x;
            case PointPosition.R:
                p2.y += p1.y * p2.yRatio;
                break;

            default:
                p2.x += p1.x * p2.xRatio;
                p2.y += p1.y * p2.yRatio;
                break;
        }
    }

    #resizeRightTop(p1, p2) {
        switch (p2.position) {
            case PointPosition.LB:
                return;
            case PointPosition.RT:
                p2.x += p1.x;
                p2.y += p1.y;
                break;

            case PointPosition.RB:
                p2.x += p1.x;
                break;
            case PointPosition.LT:
                p2.y += p1.y;
                break;

            case PointPosition.T:
                p2.y += p1.y;
            case PointPosition.B:
                p2.x += p1.x * p2.xRatio;
                break;

            case PointPosition.R:
                p2.x += p1.x;
            case PointPosition.L:
                p2.y += p1.y * p2.yRatio;
                break;

            default:
                p2.x += p1.x * p2.xRatio;
                p2.y += p1.y * p2.yRatio;
                break;
        }
    }

    #resizeRightBottom(p1, p2) {
        switch (p2.position) {
            case PointPosition.LT:
                return;
            case PointPosition.RB:
                p2.x += p1.x;
                p2.y += p1.y;
                break;

            case PointPosition.RT:
                p2.x += p1.x;
                break;
            case PointPosition.LB:
                p2.y += p1.y;
                break;

            case PointPosition.B:
                p2.y += p1.y;
            case PointPosition.T:
                p2.x += p1.x * p2.xRatio;
                break;

            case PointPosition.R:
                p2.x += p1.x;
            case PointPosition.L:
                p2.y += p1.y * p2.yRatio;
                break;

            default:
                p2.x += p1.x * p2.xRatio;
                p2.y += p1.y * p2.yRatio;
                break;
        }
    }

    #resizeLeftBottom(p1, p2) {
        switch (p2.position) {
            case PointPosition.RT:
                return;
            case PointPosition.LB:
                p2.x += p1.x;
                p2.y += p1.y;
                break;

            case PointPosition.LT:
                p2.x += p1.x;
                break;
            case PointPosition.RB:
                p2.y += p1.y;
                break;

            case PointPosition.B:
                p2.y += p1.y;
            case PointPosition.T:
                p2.x += p1.x * p2.xRatio;
                break;

            case PointPosition.L:
                p2.x += p1.x;
            case PointPosition.R:
                p2.y += p1.y * p2.yRatio;
                break;

            default:
                p2.x += p1.x * p2.xRatio;
                p2.y += p1.y * p2.yRatio;
                break;
        }
    }

    updateSelectPosition() {
        if (this.points.length === 0) {
            return;
        }

        this.minPoint.x = this.points[0].x;
        this.minPoint.y = this.points[0].y;
        this.maxPoint.x = this.points[0].x;
        this.maxPoint.y = this.points[0].y;
        this.points.forEach(p_=> {
            this.minPoint.x = Math.min(this.minPoint.x, p_.x);
            this.minPoint.y = Math.min(this.minPoint.y, p_.y);
            this.maxPoint.x = Math.max(this.maxPoint.x, p_.x);
            this.maxPoint.y = Math.max(this.maxPoint.y, p_.y);
        });
    }

    updatePointPosition() {
        this.points.forEach(p => {
            if (p.x === this.minPoint.x && p.y === this.minPoint.y) {
                p.position = PointPosition.LT;
            } else if (p.x === this.maxPoint.x && p.y === this.maxPoint.y) {
                p.position = PointPosition.RB;
            } else if (p.x === this.maxPoint.x && p.y === this.minPoint.y) {
                p.position = PointPosition.RT;
            } else if (p.x === this.minPoint.x && p.y === this.maxPoint.y) {
                p.position = PointPosition.LB;
            } else if (p.x === this.minPoint.x) {
                p.position = PointPosition.L;
            } else if (p.x === this.maxPoint.x) {
                p.position = PointPosition.R;
            } else if (p.y === this.minPoint.y) {
                p.position = PointPosition.T;
            } else if (p.y === this.maxPoint.y) {
                p.position = PointPosition.B;
            } else {
                p.position = PointPosition.NONE;
            }
        });
    }

    updatePointRatio() {
        this.width = this.maxPoint.x - this.minPoint.x;
        this.height = this.maxPoint.y - this.minPoint.y;

        this._points.forEach(p_=> {
            const curWidth = p_.x - this.minPoint.x;
            const curHeight = p_.y - this.minPoint.y;
            p_.xRatio = (curWidth / this.width);
            p_.yRatio = (curHeight / this.height);
        });
    }

    move(p) {
        this._points.forEach(p_=> {
            p_.x += p.x;
            p_.y += p.y;
        });
    }

    render(painter) {
        const points = this._points;
        const ctx = painter.ctx;

        painter.start();
        painter.lineOption(this.lineColor, this.lineWidth);

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; ++i) {
            const p = points[i];
            ctx.lineTo(p.x, p.y);
        }
        const st = points[0];
        ctx.lineTo(st.x, st.y);

        painter.lineEnd();

        ctx.lineWidth = this.lineWidth;

        if (this.fillColor !== 'none') {
            painter.fill(this.fillColor, this.opacity);
        }

        painter.end();
    }

    ptInControl(p) {
        let x = p.x, y = p.y;
        let inside = false;
        const points = this.points;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            let xi = points[i].x, yi = points[i].y;
            let xj = points[j].x, yj = points[j].y;
            let intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    ptInHoverControl(p) {
        super.ptInHoverControl(p);
    }

    ptInSelectControl(p) {
        return super.ptInSelectControl(p);
    }
}