import {ControlRender} from "../ControlRender.js";

export class HoverRectRender extends ControlRender {
    constructor(rect) {
        super();
        this.rect = rect;
    }
    render(painter) {
        painter.start();
        painter.lineOption('grey', 0);
        painter.drawRect(this.rect);
        painter.fill('rgb(53,155,255)', 0.5);
        painter.end();
    }
}