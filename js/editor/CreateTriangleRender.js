export class CreateTriangleRender {
    constructor(triangle) {
        this.triangle = triangle;
    }

    render(painter) {
        const top = this.triangle.top;
        const left = this.triangle.left;
        const right = this.triangle.right;

        const ctx = painter.ctx;
        painter.start();
        painter.lineOption('grey', 1, 0.5);

        ctx.moveTo(top.x, top.y);
        ctx.lineTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.lineTo(top.x, top.y);
        painter.lineEnd();

        ctx.fillStyle = this.triangle.fillColor;
        ctx.globalAlpha = 0.1;
        ctx.fill();
        painter.end();
    }

}