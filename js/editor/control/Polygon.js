import {Control} from "./Control.js";

export class Polygon extends Control {
    constructor() {
        super();
        this._points = [];
    }

    get points() {
        return this._points;
    }

    move(p) {
        this._points.forEach(p=> {
            p.x += p.x;
            p.y += p.y;
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
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.fillColor;
            ctx.fill();
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
        super.ptInSelectControl(p);
    }
}