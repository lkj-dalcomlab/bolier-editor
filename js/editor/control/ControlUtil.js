export class ControlUtil {
    static checkDragPosition(control, downPoint, p) {
        if (Math.abs(downPoint.x - p.x) <= 10 &&
            Math.abs(downPoint.y - p.y) <= 10) {
            control.setPosition(p);
        }
    }
}