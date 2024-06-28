import {EventHandler} from "./EventHandler.js";
import {Rect} from "../editor/control/Rect.js";
import {EventType} from "./EventType.js";
import {ControlUtil} from "../editor/control/ControlUtil.js";
import {CreateRectRender} from "../editor/control/render/CreateRectRender.js";

export class CreateRectEventHandler extends EventHandler {
    constructor(editor) {
        super();
        this.editor = editor;
        this.rect = new Rect();
        editor.addForegroundRender(new CreateRectRender(this.rect));
    }

    get type() {
        return EventType.CREATE_RECT;
    }

    onMouseDown(e) {
    }

    onMouseMove(e) {
        const rect = this.rect;
        if (!e.down) {
            rect.setPosition(e.point);
        } else {
            rect.lt.x = e.downPoint.x;
            rect.lt.y = e.downPoint.y;

            rect.rt.x = e.point.x;
            rect.rt.y = e.downPoint.y;

            rect.rb.x = e.point.x;
            rect.rb.y = e.point.y;

            rect.lb.x = e.downPoint.x;
            rect.lb.y = e.point.y;
        }
        this.editor.render();
    }

    onMouseUp(e) {
        ControlUtil.checkDragPosition(this.rect, e.downPoint, e.point);
        this.rect.updateSelectPosition();
        this.rect.updatePointRatio();
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.rect);
    }
}