import {ControlRender} from "./control/ControlRender.js";

export class CreateRectRender extends ControlRender {
    constructor(rect) {
        super();
        this.rect = rect;
    }

    render(painter) {
        painter.start();
        painter.lineOption('grey', 1, 0.5);
        painter.drawRect(this.rect);
        painter.fill(this.rect.fillColor, 0.1);
        painter.end();
    }
}