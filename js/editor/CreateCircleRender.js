export class CreateCircleRender {
    constructor(circle) {
        this.circle = circle;
    }

    render(painter) {
        const circle = this.circle;
        const ctx = painter.ctx;
        painter.start();
        painter.lineOption(circle.lineColor, circle.lineWidth, 0.5);
        ctx.ellipse(circle.p.x, circle.p.y, circle.xRadius, circle.yRadius, 0, 0, 2*Math.PI);
        painter.lineEnd();
        ctx.fillStyle = circle.fillColor;
        ctx.globalAlpha = 0.1;
        ctx.fill();
        painter.end();
    }
}