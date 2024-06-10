import {ControlRender} from "./control/ControlRender.js";

export class CreateTriangleRender extends ControlRender {
    constructor(triangle) {
        super();
        this.triangle = triangle;
    }

    render(painter) {
        painter.start();
        painter.lineOption('grey', 1, 0.5);
        painter.drawTriangle(this.triangle);
        painter.fill(this.triangle.fillColor, 0.1);
        painter.end();
    }
}