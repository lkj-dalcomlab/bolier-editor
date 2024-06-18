import {ControlRender} from "./ControlRender.js";
import {SelectionRect} from "../SelectionRect.js";

export class SelectControlRender extends ControlRender {
    constructor(control) {
        super(control);
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
        painter.end();

        painter.start();
        painter.lineOption('black');
        let resizeRect = this.#generateResizeRect(selRect.lt);
        painter.drawRect(resizeRect.rect);
        resizeRect = this.#generateResizeRect(selRect.rt);
        painter.drawRect(resizeRect.rect);
        resizeRect = this.#generateResizeRect(selRect.rb);
        painter.drawRect(resizeRect.rect);
        resizeRect = this.#generateResizeRect(selRect.lb);
        painter.drawRect(resizeRect.rect);
        painter.fill('white');
        painter.end();

    }

    #generateResizeRect(p) {
        const rect = new SelectionRect();
        rect.updatePosition({x: p.x-2, y: p.y-2}, {x: p.x+2, y: p.y+2});
        return rect;
    }
}