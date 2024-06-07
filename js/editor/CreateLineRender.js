export class CreateLineRender {
    constructor(line) {
        this.line = line;
    }

    render(painter) {
        const line = this.line;
        painter.drawLine(line.p1, line.p2, 'grey', 1, 0.5);
    }
}