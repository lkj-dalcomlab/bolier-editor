import {EventHandler} from "../EventHandler.js";
import {ResizeAction} from "../../command/undo/ResizeAction.js";

export class ResizeControlEventHandler extends EventHandler {

    onMouseMove(e) {
        const selControl = e.editor.page.selectControl;
        const resizeType = selControl.resizeType;

        const mx = e.point.x - e.downPoint.x;
        const my = e.point.y - e.downPoint.y;

        e.downPoint.x = e.point.x;
        e.downPoint.y = e.point.y;

        selControl.control.resize(resizeType, {x: mx, y: my});
        selControl.control.updateSelectPosition();
        e.editor.render();
    }

    onMouseUp(e) {
        const control = e.editor.page.selectControl.control;
        control.updatePointPosition();
        control.updatePointRatio();

        e.editor.historyManager.endUndo(new ResizeAction('redo Resize', control));
        e.editor.finishDragHandler();
    }
}