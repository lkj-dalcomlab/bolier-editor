export class CreateRectRender {
    constructor(rect) {
        this.rect = rect;
    }

    render(painter) {
        const rect = this.rect;
        const lt = rect.lt;
        const rt = rect.rt;
        const rb = rect.rb;
        const lb = rect.lb;

        const ctx = painter.ctx;
        painter.start();
        painter.lineOption('grey', 1, 0.5);
        ctx.moveTo(lt.x, lt.y);
        ctx.lineTo(rt.x, rt.y);
        ctx.lineTo(rb.x, rb.y);
        ctx.lineTo(lb.x, lb.y);
        ctx.lineTo(lt.x, lt.y);
        painter.lineEnd();
        ctx.fillStyle = rect.fillColor;
        ctx.globalAlpha = 0.1;
        ctx.fill();
        painter.end();
    }
}