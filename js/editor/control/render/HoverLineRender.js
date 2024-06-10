import {ControlRender} from "../ControlRender.js";

export class HoverLineRender extends ControlRender {
    constructor(line) {
        super();
        this.line = line;
    }

    render(painter) {
        painter.drawLine(this.line.p1, this.line.p2, 'rgb(53,155,255)', 3, 0.5);
    }
}