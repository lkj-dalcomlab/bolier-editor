export class HoverLineRender {
    constructor(line) {
        this.line = line;
    }

    render(painter) {
        painter.drawLine(this.line.p1, this.line.p2, 'rgb(53,155,255)', 3, 0.5);
    }
}