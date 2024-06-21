import {SelectionRect} from "./SelectionRect.js";

export class ControlUtil {
    static checkDragPosition(control, downPoint, p) {
        if (Math.abs(downPoint.x - p.x) <= 10 &&
            Math.abs(downPoint.y - p.y) <= 10) {
            control.setPosition(p);
        }
    }

    static generateResizeRect(p) {
        const rect = new SelectionRect();
        rect.updatePosition({x: p.x-2, y: p.y-2}, {x: p.x+2, y: p.y+2});
        return rect;
    }
}