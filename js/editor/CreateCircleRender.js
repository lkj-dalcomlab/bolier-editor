import {ControlRender} from "./control/ControlRender.js";

export class CreateCircleRender extends ControlRender {
    constructor(circle) {
        super();
        this.circle = circle;
    }

    render(painter) {
        const circle = this.circle;
        painter.start();
        painter.lineOption(circle.lineColor, circle.lineWidth, 0.5);
        painter.drawCircle(circle);
        painter.fill(circle.fillColor, 0.1);
        painter.end();
    }
}