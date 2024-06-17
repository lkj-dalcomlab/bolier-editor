import {ControlRender} from "../ControlRender.js";
import {SelectionRect} from "../SelectionRect.js";
import {Rect} from "../Rect";

export class SelectControlRender extends ControlRender {
    constructor(control) {
        super();
        this.control = control;
        this.selectionRect = new SelectionRect();
    }

    render(painter) {
        const control = this.control;
        control.updateSelectPosition();
        this.selectionRect.updatePosition(control.minPoint, control.maxPoint);

        const selRect = this.selectionRect.rect;
        painter.start();
        painter.lineOption(selRect.lineColor, selRect.lineWidth, 0.8);
        painter.drawRect(this.selectionRect.rect);

        painter.lineOption('black');
        let rect = this.generateResizeRect(selRect.lt);
        painter.drawRect(rect);
        rect = this.generateResizeRect(selRect.rt);
        painter.drawRect(rect);
        rect = this.generateResizeRect(selRect.rb);
        painter.drawRect(rect);
        rect = this.generateResizeRect(selRect.lb);
        painter.drawRect(rect);

        painter.end();
    }

    generateResizeRect(p) {
        const rect = new SelectionRect();
        rect.updatePosition({x: p.x-2, y: p.y-2}, {x: p.x+2, y: p.y+2});

    }
}