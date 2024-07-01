import {EventHandler} from "../EventHandler.js";
import {MoveAction} from "../../command/undo/MoveAction.js";
import {ResizeAction} from "../../command/undo/ResizeAction.js";

export class MoveControlEventHandler extends EventHandler {

    onMouseMove(e) {
        const control = e.editor.page.selectControl.control;

        const mx = e.point.x - e.downPoint.x;
        const my = e.point.y - e.downPoint.y;

        control.move({x: mx, y: my});

        e.downPoint.x = e.point.x;
        e.downPoint.y = e.point.y;

        e.editor.page.render();
    }

    onMouseUp(e) {
        e.editor.historyManager.endUndo(new ResizeAction('redo move', e.editor.page.selectControl.control));
        e.editor.finishDragHandler();
    }
}