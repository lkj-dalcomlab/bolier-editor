export class Painter {
    constructor(ctx) {
        this._ctx = ctx;
    }

    get ctx() {
        return this._ctx;
    }

    drawLine(p1, p2, color = 'black', width = 1, opacity = 1) {
        this.start();
        this.lineOption(color, width, opacity);
        this.line(p1, p2);
        this.lineEnd();
        this.end();
        return this;
    }

    lineOption(color = 'black', width = 1, opacity = 1) {
        const ctx = this._ctx;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.globalAlpha = opacity;
    }

    line(p1, p2) {
        const ctx = this._ctx;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    }

    lineEnd() {
        this.ctx.stroke();
    }

    start() {
        const ctx = this._ctx;
        ctx.save();
        ctx.beginPath();
    }

    end() {
        const ctx = this._ctx;
        ctx.closePath();
        ctx.restore();
    }

    drawImage(img, x, y, w, h) {
        this._ctx.drawImage(img, x, y, w, h);
    }
}