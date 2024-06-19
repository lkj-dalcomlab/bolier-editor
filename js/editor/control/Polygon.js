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
            // p_.x += p.x * p_.xRatio;
            // p_.y += p.y * p_.yRatio;

            switch (resizeType) {
                case PointPosition.LT:
                    // this.#resizePoint(p, p_, PointPosition.RB,
                    //     [PointPosition.L,
                    //                 PointPosition.B,
                    //                 PointPosition.LB],
                    //     [PointPosition.R,
                    //                 PointPosition.T,
                    //                 PointPosition.RT]);

                    switch (p_.position) {
                        case PointPosition.RB:
                            return;
                        case PointPosition.LT:
                            p_.x += p.x;
                            p_.y += p.y;
                            break;
                        case PointPosition.R:
                            p_.x += p.x;
                            p_.y += p.y * p_.yRatio;
                            break;
                        case PointPosition.T:
                            p_.x += p.x * p_.xRatio;
                            p_.y += p.y;
                            break;
                        case PointPosition.RT:
                            p_.y += p.y;
                            break;
                        case PointPosition.L:
                            p_.x += p.x;
                            p_.y += p.y * p_.yRatio;
                            break;
                        case PointPosition.B:
                            p_.x += p.x * p_.xRatio;
                            p_.y += p.y;
                            break;
                        case PointPosition.LB:
                            p_.x += p.x;
                            break;
                        default:
                            p_.x += p.x * p_.xRatio;
                            p_.y += p.y * p_.yRatio;
                            break;
                    }
                    // if (p_.position === PointPosition.RB) {
                    //     return;
                    // }
                    //
                    // if (p_.position === PointPosition.R ||
                    //     p_.position === PointPosition.T ||
                    //     p_.position === PointPosition.RT) {
                    //     p_.y += p.y;
                    // } else if (p_.position === PointPosition.L ||
                    //             p_.position === PointPosition.B ||
                    //             p_.position === PointPosition.LB) {
                    //     p_.x += p.x;
                    // } else {
                    //     p_.x += p.x;
                    //     p_.y += p.y;
                    // }
                    break;
                case PointPosition.RT:
                    if (p_.position === PointPosition.LB) {
                        return;
                    }

                    if (p_.position === PointPosition.L ||
                        p_.position === PointPosition.T ||
                        p_.position === PointPosition.LT) {
                        p_.y += p.y;
                    } else if (p_.position === PointPosition.R ||
                                p_.position === PointPosition.B ||
                                p_.position === PointPosition.RB) {
                        p_.x += p.x;
                    } else {
                        p_.x += p.x;
                        p_.y += p.y;
                    }
                    break;
                case PointPosition.RB:
                    if (p_.position === PointPosition.LT) {
                        return;
                    }

                    if (p_.position === PointPosition.L ||
                        p_.position === PointPosition.B ||
                        p_.position === PointPosition.LB) {
                        p_.y += p.y;
                    } else if (p_.position === PointPosition.R ||
                                p_.position === PointPosition.T ||
                                p_.position === PointPosition.RT) {
                        p_.x += p.x;
                    } else {
                        p_.x += p.x;
                        p_.y += p.y;
                    }
                    break;
                case PointPosition.LB:
                    if (p_.position === PointPosition.RT) {
                        return;
                    }

                    if (p_.position === PointPosition.R ||
                        p_.position === PointPosition.B ||
                        p_.position === PointPosition.RB) {
                        p_.y += p.y;
                    } else if (p_.position === PointPosition.L ||
                                p_.position === PointPosition.T ||
                                p_.position === PointPosition.LT) {
                        p_.x += p.x;
                    } else {
                        p_.x += p.x;
                        p_.y += p.y;
                    }
                    break;
            }
        });
    }

    #resizePoint(p1, p2, returnPosition, xPositions, yPositions) {
        if (p2.position === returnPosition) {
            return;
        }

        if (p2.position === xPositions[0] || p2.position === xPositions[1]) {
            p2.x += p1.x * p2.xRatio;
            p2.y += p1.y * p2.yRatio;
            return;
        } else if (p2.position === xPositions[2]) {
            p2.x += p1.x;
            return;
        }

        if (p2.position === yPositions[0] || p2.position === yPositions[1]) {
            p2.x += p1.x * p2.xRatio;
            p2.y += p1.y * p2.yRatio;
            return;
        } else if (p2.position === yPositions[2]) {
            p2.y += p1.y;
            return;
        }

        p2.x += p1.x;
        p2.y += p1.y;
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