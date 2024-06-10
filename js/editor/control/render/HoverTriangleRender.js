import {ControlRender} from "../ControlRender.js";

export class HoverTriangleRender extends ControlRender {
    constructor(triangle) {
        super();
        this.triangle = triangle;
    }
    render(painter) {
        painter.start();
        painter.lineOption('grey', 0, 0.5);
        painter.drawTriangle(this.triangle);
        painter.fill('rgb(53,155,255)', 0.5);
        painter.end();
    }
}