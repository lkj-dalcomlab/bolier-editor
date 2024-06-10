import {ControlRender} from "./control/ControlRender.js";

export class CreateLineRender extends ControlRender {
    constructor(line) {
        super();
        this.line = line;
    }

    render(painter) {
        const line = this.line;
        painter.drawLine(line.p1, line.p2, 'grey', 1, 0.5);
    }
}